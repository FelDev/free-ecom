# A free e-commerce solution based on the Jamstack

## [Explanatory article](https://www.felixparadis.com)
## [Live demo](https://free-ecommerce.netlify.app/)

This is based on the [sapper-template](https://github.com/sveltejs/sapper-template).

# Technologies/services used:
- FaunaDB (to keep track of inventory)
- Netlify
- Stripe 
- SendGrid (to send email confirmations to customers)
- Cloudinary (optional, you could simply use the static folder)

# How to use this?
Afther you clone and run this locally, you'll need to create a `.env` file containing the following values:
```
STRIPE_PUBLISHABLE_KEY=<your-secrets>
STRIPE_SECRET_KEY=<your-secrets>
STRIPE_WEBHOOK_SECRET=<your-secrets>
SENDGRID_API_KEY=<your-secrets>
```
## Setup the Stripe Webhook
You'll need to send the checkout.session.completed webhook to `<yourURL>/.netlify/functions/mark-sold`.
Use the Stripe-cli to test webhooks locally.
[Stripe doc on webhooks](https://stripe.com/docs/webhooks)

## If you want to make use of a database
You'll need to follow [faunaDB official documentation](https://docs.fauna.com/fauna/current/integrations/netlify.html) to hook it up with Netlify.
Create a new database, a new collection (mine is called "paintings"), documents in the collection and a new index (mine is called "all").
You'll also need to update the `src/stores.js` file so that the `products` array matches your databases entries. You could remove the `products` array and load everything from the DB, but there is a performance trade-off for that. 
 ## If you don't need a database
 You can remove `functions/get-products.js` entirely and the `loadProducts()` funcion in `src/routes/index.svelte`. Also, update the `products` array in `src/stores.js` so that the `"sold"` property of products is set to `true` or `false` rather than "loading".

 ## Running on localhost
 The easiest way to run this on localhost is with the [netlify-cli](https://www.npmjs.com/package/netlify-cli).
 
 `npm install netlify-cli -g`
 
 `cd` into your project folder and run `ntl dev`
