<style>
	figure {
		margin: 0 0 1em 0;
	}

	.product {
		display: flex;
    flex-direction: column;
    justify-content: space-around;
	}

	.product img {
		max-width: 100%;
		height: auto;
	}

	.product .info {
		margin-top: auto;
	}

	.ta-center {
		text-align: center;
	}

	.product .description {
		text-align: left;
	}
	.product .price {
		font-weight: bold;
		
	}

	.product form {
		text-align: center;
		position: relative;
		height: 2.5rem;
	}

	.product input {
		border: 1px solid teal;
		border-radius: 0.25rem;
		font-size: 1.125rem;
		line-height: 1.25rem;
		padding: 0.25rem;
	}

	.product button {
		border: none;
		border-radius: 0.25rem;
		color: white;
		cursor: pointer;
		font-size: 1.25rem;
		font-weight: 800;
		line-height: 1.25rem;
		padding: 0.5rem;
		width: 95%;
		max-width: 30rem;
	}

	.product .add-to-cart {
		background: teal;
	}
	
	.product .remove-from-cart {
		background: #11101b;
	}

  .product button.sold {
    background: darkred;
    cursor: not-allowed;
  }

	@keyframes bang {
		from {
			transform: translate3d(0,0,0);
			opacity: 1;
		}
	}

	button {
		cursor: pointer;
		position: relative;
		color: #333;
		height: 2.5rem;
	}

	/* Confettis are in <i>s */
	:global(i) {
    animation: bang 750ms ease-out forwards;
    position: absolute;
    display: block;
    left: 50%;
    top: 0;
    width: 4px;
    height: 10px;
    opacity: 0;
		outline: 0 !important;
  }

	button:focus :global(i) {
		outline: 0 !important;
	}

	.loading-balls {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
</style>

<div class="product ta-center">
	<figure class="ta-center">
		<img 
			src="{info.image}" 
			width="{info.width}"
			height="{info.height}"
			alt="Photo de la toile '{info.name}'. (Elle est vraiment belle)" 
		/>
	</figure>
  
  <div class="info">
    <h2 class="ta-center">{info.name}</h2>
    <p class="description">{info.description}</p>
    <p class="price ta-center">{formatPrice(info.amount)}</p>
		<form action="" method="post" on:submit|preventDefault>
    {#if info.sold === 'loading'}
			<div 
				class="ta-center loading-balls"
				out:fly="{{delay: 0, duration: 1000, easing: quadInOut}}"
			>
				<Spinner/>
			</div>
		{:else if info.sold}
			<button 
				type="button"
				class="sold"
				in:fly="{{delay: 600, duration: 1500, easing: quadInOut}}"
			>
				Already sold!
			</button>
    {:else}
        <input type="hidden" name="id" value="{info.id}" />
				{#if inCart}
					<button 
						class="remove-from-cart"
						type="button" 
						on:click="{removeFromCart}"
						in:fly="{{delay: 100, duration: 1500, easing: quadInOut}}"
						out:fly="{{delay: 0, duration: 200, easing: quadInOut}}"
					>
					Remove from cart
					</button>
				{:else}
					<button
						class="add-to-cart"
						type="button" 
						on:click="{throwConfetti}"
						in:fly="{{delay: 100, duration: 1500, easing: quadInOut}}"
						out:fly="{{delay: 0, duration: 50, easing: quadInOut}}"
					>
						Add to cart
					</button>
				{/if}
    {/if}
		</form>
  </div>
</div>

<script>
	import Spinner from "../components/Spinner.svelte";
	import { goingToCheckout, cart } from "../stores.js";
	import { fly } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
  export let info;
	
	let inCart = false;

	function addToCart() {
		inCart = true;
		$cart = $cart.add(info.id)
		console.log('@$cart: ', $cart);
		
	}
	function removeFromCart() {
		inCart = false;
		$cart.delete(info.id)
		$cart = $cart
		console.log('@$cart: ', $cart);	
	}

  function throwConfetti(event) {
    // eurf... Somewhat fragile, assumes that the parent is as big as the button
    // Chrome did this weird thing where every confetti had a big blue outline.
		addToCart()
		let btn = event.composedPath()[0];
		let df = document.createDocumentFragment();
    
    for (let i=0; i<100; i++) {
			let c = document.createElement("i");
			c.style.cssText = `
				transform: translate3d(${(random(500) - 250)}px, ${(random(225) - 150)}px, 0)
				rotate(${ random(360) }deg); 
				background: hsla(${random(360)},100%,50%,1);
      `;
			df.appendChild(c);
			setTimeout(()=> {
				c.remove();
			}, 1000)  
    } 
    event.composedPath()[1].appendChild(df);
	}

	function random(max){
		return Math.random() * (max - 0) + 0;
	}

  function formatPrice(price) {
    return new Intl.NumberFormat('fr-CA', {
			style: 'currency',
			currency: "CAD",
		}).format((price / 100).toFixed(2))
  }

  
</script>