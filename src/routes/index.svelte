<style>
	h1, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		font-weight: 700;
		margin: 1em 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	a {
		padding: 0.2em;
		margin: 0.2em;
	}

	#loadingScreen {
		position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    background: #98888885;
		font-size: 12vw;
		backdrop-filter: blur(5px);
		z-index: 10;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

	.products {
		display: grid;
		gap: 2rem;
		grid-template-columns: repeat(2, 1fr);
		margin-top: 3rem;
	}

	@media (max-width: 800px) {
		.products {
			grid-template-columns: repeat(1, 1fr);
		}
	}

</style>

<Nav/>

{#if $goingToCheckout}
	<div 
		id="loadingScreen"
		in:fade="{{delay: 0, duration: 2000, easing: quadInOut}}"
	>
		<Spinner/>
	</div>
{/if}

<h1>The Ham Paintings <br> Finally Available </h1>

<p>This is a demo of an e-commerce store built on the Jamstack.</p>
<a href="https://github.com/FelDev/free-ecom">👉Source code</a>
<a href="#TODO">👉Explanatory Article</a>
<a href="https://boutique.felixparadis.com">👉Real implementation</a>

<div class="products">
	{#each $products as product }
		<Product
			info="{product}"
		/>
	{/each}
</div>

<script>
	import Nav from '../components/Nav.svelte';
	import Product from '../components/Product.svelte';
	import Spinner from "../components/Spinner.svelte";
	import { goingToCheckout, products } from "../stores.js";
	import { fade } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';

	let recursionSafety = 0;
	loadProducts()
	async function loadProducts() {
		console.log('@loadProducts called');
		try {
			// Only gets the id and sold status, the rest is statically served
			const res = await fetch('/.netlify/functions/get-products');
			const data = await res.json();
			console.log('@data: ', data);
			
			$products = $products.map( p => {
				let serverSoldStatus = data.filter(d => d.id === p.id)
				p.sold = serverSoldStatus[0].sold
				return p
			});
			
		} catch (err) {
			console.log('@err', err);
			recursionSafety++
			if (recusionSafety < 2) {
				loadProducts() // Probably won't ever be needed
			}
		}
		
	}

</script>




<!-- 
<button
	on:click="{changeLoading}"
	style="position:fixed; top: 50%;"
>change loading</button>
	function changeLoading() {
		console.log('@change loading please');
		
		products = products.map(p => {
			console.log('@p: ', p);
			if (p.sold === "loading") {
				p.sold = true
			} else {
				p.sold = "loading"
			}
			return p
		})
	} -->