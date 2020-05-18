let products = [
  {
    ref: {id: "264072764380414483"},
    ts: 1588638344455000,
    data: {
      sku: 'JAM_pre',
      name: 'Jambon Prévoyant',
      description: "Le ciel se noircit et le parapluie est déjà sorti. Une oeuvre qui nous rapelle l'importance de penser aux générations futures.",
      image: 'https://res.cloudinary.com/felixparadis-com/image/upload/q_auto,f_auto,w_0.2/v1587750855/artsy-hams/Jambon_Prevoyant_jz5p3l.jpg',
      amount: 1555,
      currency: 'CAD',
      sold: false
    }
  },
  {
    ref: {id: "263997598432494100"},
    ts: 1588638344455000,
    data: {
      sku: 'JAM_pec',
      name: 'Le Jambon Pêcheur',
      description: "Cette toile est une preuve que l'artiste maîtrise son médium à la perfection. Un alliage parfait de plusieurs techniques rendent la scène captivante. Parfait pour une salle de bain luxueuse.",
      image: 'https://res.cloudinary.com/felixparadis-com/image/upload/q_auto,f_auto,w_0.2/v1587750854/artsy-hams/Jambon_Pecheur_lu9prd.jpg',
      amount: 2289,
      currency: 'CAD',
      sold: false
    }
  }
]

let ids = [ { id: '264073072275882516' }, { id: '264072764380414483' } ];
ids = ids.map(id => id.id)
console.log('@ids: ', ids);


const items = [
  {
    amount: 2020,
    currency: 'cad',
    custom: {
      description: 'En hommage',
      images: [Array],
      name: 'Le Jambon Skater'
    },
    quantity: 1,
    type: 'custom'
  },
  {
    amount: 1555,
    currency: 'cad',
    custom: {
      description: "Le ciel se noircit et le parapluie est déjà sorti. Une oeuvre qui nous rapelle l'importance de penser aux générations futures.",
      images: [Array],
      name: 'Jambon Prévoyant'
    },
    quantity: 1,
    type: 'custom'
  }

]

const itemNames = items.reduce((acc,cur) => acc += cur.custom.name + '<br>','');

console.log('@itemNames: ', itemNames);





