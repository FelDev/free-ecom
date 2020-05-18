<style>
	main {
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<main>
	<slot></slot>
</main>

<Footer/>

<script>
	import Footer from '../components/Footer.svelte';
</script>