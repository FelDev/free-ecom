const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = async ({body, headers}) => {
  
  try {
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // * MARK ITEMS AS SOLD HERE 🚨
    // * (Commented out so that the demo always has available items)
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // const client = new faunadb.Client({
      // secret: process.env.FAUNADB_SERVER_SECRET
    // })

    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    if (stripeEvent.type !== 'checkout.session.completed') {
      return {
        statusCode: 200,
        body: ""
      };
    }
    console.log('@stripeEvent: ', stripeEvent);
    const eventObject = stripeEvent.data.object;
    const items = eventObject.display_items;
    const shippingDetails = eventObject.shipping;
    let ids = JSON.parse(eventObject.metadata.ids);
    ids = ids.map(obj => obj.id)
    
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // * MARK ITEMS AS SOLD HERE 🚨
    // * (Commented out so that the demo always has available items)
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Update the DB first...
    // client.query(
    //   q.Map(ids,
    //     q.Lambda('id', 
    //       q.Update(
    //         q.Ref(q.Collection('paintings'), q.Var('id')),
    //         { data: { sold: true } },
    //       )
    //     ),
    //   )
    // )
    // .then((ret) => console.log("@OUIIII: ", ret))
    // .catch(e => console.log('@e, esti: ', e));
    
    // Then email the customer...
    const cus = await stripe.customers.retrieve(eventObject.customer);
    console.log('@cus: ', cus);

    const itemNames = items.reduce((acc,cur) => acc += cur.custom.name + '<br>','');
    const pluralException1 = items.length > 1 ? "paintings" : "painting";
    const itemsHeader = items.length > 1 ? "Your paintings" : "Your painting";
    const emailHTML = `
      You really bought a ham ${pluralException1}...<br>
      Great move!<br>
      <br>
      ${itemsHeader}:<br>
      ${itemNames}
      <br>
      Your address:<br>
      ${shippingDetails.address.line1}<br>
      ${shippingDetails.address.city}<br>
      ${shippingDetails.address.postal_code}<br>
      <br>
      I'll ship it soon.<br>
      -Félix
      `
      
    const emailString = `You really bought a ham ${pluralException1}...\nGreat move!\n`
      +`${itemsHeader}:\n${items}`
      +'\nYour address:\n'
      +shippingDetails.address.line1
      +'\n'+shippingDetails.address.city+'\n'
      +shippingDetails.address.postal_code
      +"\nI'll ship it soon\n -Félix";

    const msg = {
      to: cus.email,
      from: 'hello@felixparadis.com',
      subject: "Your hammy order",
      text: emailString,
      html: emailHTML,
    };

    await sgMail.send(msg);
        
    return {
      statusCode: 200,
      body: "{'mark sold':'complete'}"
    };
  } catch (err) {
    console.log('@err mark-sold: ', err);
    return {
      statusCode: 500,
      body: JSON.stringify(err,null,2)
    };
    // Email self?
  }
};