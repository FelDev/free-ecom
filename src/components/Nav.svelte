<style>
	nav {
		background: #fff9;
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 500;
		padding: 0 1em;
		position: fixed;
		top: 0;
    left: 0;
		width: 100vw;
		display: flex;
    align-items: center;
		justify-content: space-around;
		z-index: 1;
	}

	p {
		margin: 0;
		width: 3rem; /*to avoid weird little movements on cart value change*/
	}

	button {
		border: none;
		border-radius: 0.25rem;
		color: white;
		cursor: pointer;
		font-size: 1.25rem;
		font-weight: 800;
		line-height: 1.25rem;
		padding: 0.5rem;
		background: teal;
		margin: 0.4em;
		transition: 0.5s;
	}

	.inactive {
		background: #80808033;
		cursor: not-allowed;
	}
	
	.shakeIt {
		animation: shakeIt 0.5s ease-in-out 1 alternate;
	}
	
	@keyframes shakeIt{	
		0% { transform: translate(1px, 1px) rotate(0deg); }
		10% { transform: translate(-1px, -2px) rotate(-1deg); }
		20% { transform: translate(-3px, 0px) rotate(1deg); }
		30% { transform: translate(3px, 2px) rotate(0deg); }
		40% { transform: translate(1px, -1px) rotate(1deg); }
		50% { transform: translate(-1px, 2px) rotate(-1deg); }
		60% { transform: translate(-3px, 1px) rotate(0deg); }
		70% { transform: translate(3px, 1px) rotate(-1deg); }
		80% { transform: translate(-1px, -1px) rotate(1deg); }
		90% { transform: translate(1px, 2px) rotate(0deg); }
		100% { transform: translate(1px, -2px) rotate(-1deg); }
	}
</style>

<nav>

	<p
		class="{shakeIt ? 'shakeIt' : ''}"
	>
		🛒 {$cart.size}
	</p>
	
	<form 
		action=""
		method="post" 
		on:submit|preventDefault="{handleFormSubmission}"
	>
		<button 
			class="{$cart.size < 1 ? 'inactive' : ''}"
		>
			Go to checkout
		</button>
	</form>
</nav>

<script>
	import { goingToCheckout, cart } from "../stores.js";

	let shakeIt = false;

	async function handleFormSubmission(event) {
		event.preventDefault();
		if($cart.size < 1) {
			setTimeout(() => {
				shakeIt = false;
			}, 1000);
			return shakeIt = true;
		}
		
		$goingToCheckout = true;
		console.log('@$goingToCheckout: ', $goingToCheckout);
		
		const data = {
			ids: Array.from($cart)
		};

		const response = await fetch('/.netlify/functions/create-checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		.then((res) => res.json())
		.catch(err => {
      console.log('@err: ', err)
      alert("weird... On dirais que quelqu'un vient d'acheter ce tableau :|")
      location.reload();
    });
    console.log('@response: ', response);
    
		const stripe = Stripe(response.publishableKey);
		const { error } = await stripe.redirectToCheckout({
			sessionId: response.sessionId,
		});

		if (error) {
			console.error(error);
		}
	}
</script>