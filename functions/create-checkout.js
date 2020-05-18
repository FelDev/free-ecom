const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = async (event) => {
  
  try {
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET
    }) 

    const { ids } = JSON.parse(event.body);

    const products = await client.query(
      q.Map(ids,
        q.Lambda('id', 
          q.Get(
            q.Ref(q.Collection('paintings'), q.Var('id'))
          )
        ),
      )
    )
    console.log('@products: ', products);
    
    const unavailable = products.some(product => product.data.sold);
    console.log('@unavailable: ', unavailable);
    
    if (unavailable) {
      console.log('@oh no!');
      return {
        statusCode: 204,
        body: JSON.stringify({
          sold: true
        }),
      };
    }

    let lineItems = products.map(product => (
      {
        name: product.data.name,
        description: product.data.description,
        images: [product.data.image],
        amount: product.data.amount,
        currency: "cad",
        quantity: 1
      }
    ))
    let metadata = products.map( product => (
      {
        id: product.ref.id
      }
    ))
    console.log('@metadata: ', metadata);
    

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['CA'],
      },
      success_url: `${process.env.URL}/success`,
      cancel_url: process.env.URL,
      metadata: {ids: JSON.stringify(metadata)},
      line_items: lineItems,
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        sessionId: session.id,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      }),
    };

  } catch (err) {
    
    console.log('@@err create-checkout: ', err);
    
  }

};