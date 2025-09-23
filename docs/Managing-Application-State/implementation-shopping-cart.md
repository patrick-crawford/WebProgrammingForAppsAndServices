---
id: implementation-shopping-cart
title: 'Implementation: Shopping Cart'
sidebar_position: 3
description: 'Implementation: Shopping Cart'
---

# Implementation: Shopping Cart

As we have seen, Jotai greatly improves and simplifies working with "application level" state, as compared to built in methods such as "Prop Drilling" and "Context".

When the need for "application level" state was first discussed, one possible use case was an e-commerce site that implements a shopping cart. As an extended example for Jotai, let's use it to implement a simplified shopping cart for a site that pulls a list of products from [DummyJSON](https://dummyjson.com).

## Getting Started

To begin, we will use the "shopping-state-missing" example from the sample code: [Managing-Application-State](Managing-Application-State/example-code.md) as a starting point.

Once you have the source code downloaded:

1. Open the "shopping-state-missing" folder in your code editor (ie: "Visual Studio Code")
1. Open the "my-app" folder in the integrated terminal
1. Run the command "npm install" (alternatively: "npm i") to install the dependencies
1. Build / Run the site with the usual command: "npm run dev"
1. Browse the site

### File Structure

The project currently contains the following "components" / "pages" structure:

- **components/Layout.js:** The main / shared layout for the site. This contains the navbar as well as the headline "Online Shopping".

- **components/ProductBox.js:** This is the component responsible for rendering a specific product on the "/products" page. It takes a product as a property and renders the details (image, description, price, etc.) in a &lt;div&gt;...&lt;/div&gt; element with a maximum width of "300px". Additionally, it contains buttons that either link to the specific product details page ("/products/[id]"), or invoke an "addToCart()" function with the current product object. Currently, "addToCart()" simply outputs the product to the console with the message: "TODO: Add to Cart".

- **pages/Products/[id].js:** This page renders additional details for a specific product (brand, rating, stock, etc.), based on the "id" parameter. Like "ProductBox", it contains an "addToCart" function that has not yet been implemented as well as a button that links back to the product list ("/products"). Additionally, it makes use of ["getStaticPaths()"](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) and ["getStaticProps()"](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props) in order to pre-render the 30 potential products available.

- **pages/Products/index.js:** This is the page that renders a single "ProductBox" for all 30 available products in a grid using [Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). Like the "Products/[id]" page, it makes use of ["getStaticProps()"](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props) in order to pre-render the 30 products to be displayed.

- **pages/\_app.js:** Contains the boilerplate code for a Next.js app, with the addition of the &lt;Layout&gt;...&lt;/Layout&gt; component.

- **pages/cart.js:** Currently only shows the text "Cart" - this is where we will eventually render the products currently contained within the "cart"

- **pages/index.js:** Simply renders the "Home" component on the default route "/" - currently contains a short description of the demo.

## Adding "Cart" state with Jotai

Before we begin, we must install Jotai using the command:

```
npm i jotai
```

Next, if would like to make our "cart" (ie: a list of "products" that the user wishes to purchase) available anywhere within the site, we should create an "atom" to store the values. Additionally, let's also include Product 1 (iPhone 9) and Product 2 (iPhone X) as default values for the cart:

**File:** "/my-app/store.js"

```js
import { atom } from 'jotai';

async function defaultValues() {
  const results = [];

  // Fetch Product 1

  const prod1Result = await fetch('https://dummyjson.com/products/1');
  const prod1 = await prod1Result.json();

  results.push(prod1);

  // Fetch Product 2

  const prod2Result = await fetch('https://dummyjson.com/products/2');
  const prod2 = await prod2Result.json();

  results.push(prod2);

  return results;
}

export const cartListAtom = atom(defaultValues());
```

As before, we have created a "store.js" file, imported the "atom" function from 'jotai' and defined and exported an atom ("cartListAtom"). The default value for the atom is an array of products, obtained by invoking the asynchronous "defaultValues()" function.

### Updating "Layout"

The first component that we would like to update to use the newly created "cartListAtom" is "Layout". Here, we will show how many products have been added to the cart in parentheses next to the "Shopping Cart" link:

**File:** "/components/Layout.js"

<!-- prettier-ignore-start -->
```jsx
import Link from 'next/link';
import { useAtom } from 'jotai';
import { cartListAtom } from '@/store';

export default function Layout(props) {

  const [cartList, setCartList] = useAtom(cartListAtom);

  return (
    <>
      <div style={{ padding: "10px" }}>
        <h2>Online Shopping</h2>
        <Link href="/">Home</Link> | <Link href="/products">Products</Link> | <Link href="/cart">Shopping Cart <span>({cartList.length})</span></Link>
        <hr />
        {props.children}
      </div>
    </>
  )
}
```
<!-- prettier-ignore-end -->

Notice how we updated the component to use both "useAtom" from 'jotai' and "cartListAtom" from '@/store' (our store.js file containing the atom definition). In the component, we use "useAtom" in the same way that we use "useState" only the "default value" is the atom "cartListAtom". This gives us full read/write access to the atom, shared by the rest of the site.

If we refresh the site after making this change, we should see that the "Shopping Cart" link has been updated to read "Shopping Cart (2)".

### Updating "addToCart()" Functions

The next piece that we should update is the "addToCart()" functions that exist in both "/pages/products/[id].js" and "/components/ProductBox.js" files.

In both cases, we must add the cartListAtom from the correct "store" location, as well as the useAtom function:

```js
import { useAtom } from 'jotai';
import { cartListAtom } from '@/store';
```

One we have the atom, we must reference it in the component using the syntax:

```js
const [cartList, setCartList] = useAtom(cartListAtom);
```

Finally, we can update the "addToCart()" function to add the product to the cart:

```js
function addToCart(product) {
  setCartList([...cartList, product]);
}
```

Since we are modifying the current list of items, we must use ["spread syntax"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) to include all of the previous products in the list, in addition to the product to specify the state.

If we refresh the site now, we should be able to click any "Add to Cart" button, and see the "Shopping Cart" number increase in the navigation bar.

### Updating the "cart" Page

The final piece of functionality that we must add is to show all of the products currently within the cart on the "cart" page, as well as a total cost for all of the products within the cart.

Once again, to gain access to the products in the cart, we must add the cartListAtom from the "store" as well as the useAtom function:

```js
import { useAtom } from 'jotai';
import { cartListAtom } from '@/store';
```

Followed by the code to reference it in the component:

```js
const [cartList, setCartList] = useAtom(cartListAtom);
```

With this in place, the following JSX code can be added to render the products in a list:

<!-- prettier-ignore-start -->
```jsx
return (
  <>
    <br />
    <ul>
      {cartList.map((product, index) =>(
        <li key={index}>
          <strong>{product.title}</strong>: {product.description}<br />
          <strong>${product.price.toFixed(2)}</strong>
          <br /><br />
        </li>
      ))}
    </ul>
    <hr />
    <ul>
      <li>
        <strong>Total: ${cartList.reduce((total, prod) => total + prod.price, 0).toFixed(2)}</strong>
      </li>
    </ul>
  </>
)
```
<!-- prettier-ignore-end -->

With this complete, we can now browse the site and add products to the cart. To view all of the items in the cart the "cart" page should now show an updated list with a total cost.
