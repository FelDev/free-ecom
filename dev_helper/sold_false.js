
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// * copy/paste in get-products to mark all paintings as sold:false 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *


let paintings = await client.query(q.Map(
      q.Paginate(q.Match(q.Index('all'))),
      q.Lambda(x => q.Get(x))
    ))

    console.log('@paintings: ', paintings);
    
    const ids=paintings.data.map(p => p.ref.id)
    console.log('@ids: ', ids);
    
    let a = await client.query(
      q.Map(ids,
        q.Lambda('id', 
          q.Update(
            q.Ref(q.Collection('paintings'), q.Var('id')),
            { data: { sold: false } },
          )
        ),
      )
    )
    console.log('@a: ', a);
    
return {prout:"pet"}