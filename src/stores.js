import { writable } from 'svelte/store';

export const goingToCheckout = writable(false);
export const cart = writable(new Set())
export const products = writable([
  {
			"id": "263992373539766802",
			"name": "Jambon Studieux",
			"description": "When your motivation levels dip. Look at this champ and revive.",
			"image": "https://res.cloudinary.com/felixparadis-com/image/upload/q_auto,f_auto,w_0.2/v1587750857/artsy-hams/Jambon_Success_h6k5vl.jpg",
			"width" : 3690,
			"height" :3720,
			"amount": 1702,
			"sold": "loading"
		},
		{
			"id": "263997598432494100",
			"name": "Le Jambon Pêcheur",
			"description": "This one's my favorite.",
			"image": "https://res.cloudinary.com/felixparadis-com/image/upload/q_auto,f_auto,w_0.2/v1587750854/artsy-hams/Jambon_Pecheur_lu9prd.jpg",
			"aspectRatio" : 84.14,
			"width" : 4150,
			"height" : 3492,
			"amount": 2289,
			"sold": "loading"
		},
		{
			"id": "264072764380414483",
			"name": "Jambon Prévoyant",
			"description": "The sky is getting scary, but this ham already is ready.",
			"image": "https://res.cloudinary.com/felixparadis-com/image/upload/q_auto,f_auto,w_0.2/v1587750855/artsy-hams/Jambon_Prevoyant_jz5p3l.jpg",
			"width" : 4253,
			"height" : 3362,
			"amount": 1555,
			"sold": "loading"
		},
		{
			"id": "264073072275882516",
			"name": "Le Jambon Skater",
			"description": "For all you extreme sports enthusiasts.",
			"image": "https://res.cloudinary.com/felixparadis-com/image/upload/q_auto,f_auto,w_0.2/v1587750851/artsy-hams/Jambon_Skater_x3oiip.jpg",
			"width" : 3646,
			"height" : 2990,
			"amount": 2020,
			"sold": "loading"
		},
		{
			"id": "264076987259159058",
			"name": "Le Jambon Volant",
			"description": "A friendly reminder that sky is the limit.",
			"image": "https://res.cloudinary.com/felixparadis-com/image/upload/q_auto,f_auto,w_0.2/v1587750849/artsy-hams/Jambon_Volant_ywe8ij.jpg",
			"width" : 3605,
			"height" : 2962,
			"amount": 1742,
			"sold": "loading"
		},
		{
			"id": "264077009068491282",
			"name": "Le Jambon Scientifique",
			"description": "This science-inclined ham seems to be heading for a bit of time-travelling! Where will it land?",
			"image": "https://res.cloudinary.com/felixparadis-com/image/upload/q_auto,f_auto,w_0.2/v1587750861/artsy-hams/Jambon_scientifique_ewfcxc.jpg",
			"width" : 4250,
			"height" : 3033,
			"amount": 1187,
			"sold": "loading"
		},
		{
			"id": "264077025854095890",
			"name": "La Belle et le Jambon",
			"description": "Could this be the time-traveling ham? The gaze of this lady has mesmerized art critics for years.",
			"image": "https://res.cloudinary.com/felixparadis-com/image/upload/q_auto,f_auto,w_0.2/v1587750859/artsy-hams/Jambon_Avec_Madame_vixz7k.jpg",
			"width" : 523,
			"height" :616,
			"amount": 966,
			"sold": "loading"
		},
		{
			"id": "264077035358388754",
			"name": "Le Jambon Chic",
			"description": "That sure looks like a delicious Martini.",
			"image": "https://res.cloudinary.com/felixparadis-com/image/upload/q_auto,f_auto,w_0.2/v1587750838/artsy-hams/Jambon_Chic_t70tjx.jpg",
			"width" : 287,
			"height" :426,
			"amount": 1233,
			"sold": "loading"
		}
  ]
)