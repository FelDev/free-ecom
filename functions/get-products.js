const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = async (event, context) => {
  try {
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET
    })

    let paintings = await client.query(q.Map(
      q.Paginate(q.Match(q.Index('all'))),
      q.Lambda(x => q.Get(x))
    ))

    paintings = paintings.data.map(p => {
      let obj = {}
      obj.sold = p.data.sold
      obj.id = p.ref.id
      return obj
    })

    return {
      statusCode: 200,
      body: JSON.stringify(paintings),
    };

  } catch (err) {
  
    console.log('err', err)
    return {
      statusCode: 400,
      body: JSON.stringify(err)
    }
  }
}
