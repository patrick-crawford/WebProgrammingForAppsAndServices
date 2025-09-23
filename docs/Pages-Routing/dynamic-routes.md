---
id: dynamic-routes
title: Dynamic Routes
sidebar_position: 2
description: Dynamic Routes
---

# Dynamic Routes

For certain applications, using predefined paths (such as "/", "/about", "/dashboard", etc.) may not be enough. We may also wish to have paths that support "route" parameters, as well as "query" parameters, such as:

- "/product/**_id_**" - where **_id_** can be any value, ie: 5
- "/products?**_query_**" - where **_query_** can be an optional query string, ie: "page=1&category=stationary"

While there is no change to our filenames to support optional query strings, we do have to use a special convention if we wish to accommodate "route" parameters. For example the file:

```
"pages/product/[id].js"
```

can be used to create a "product" page that accepts an "id" route parameter.

## Reading Route Parameters

In order to actually read and display a route parameter (product "id" in the above case), the ["router"](https://nextjs.org/docs/pages/api-reference/functions/use-router#router-object) object once must again be obtained using the ["useRouter"](https://nextjs.org/docs/pages/api-reference/functions/use-router#userouter) hook from "next/router":

**File:** "pages/product/[id].js"

<!-- prettier-ignore-start -->
```jsx
import { useRouter } from 'next/router';

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  return <p>Product: {id}</p>
}
```
<!-- prettier-ignore-start -->

Here, we have made use of the "query" property of router to obtain an object containing a property: "id" that matches the filename: [id].js"

## Reading Query Parameters

Reading query parameters follows the exact same procedure. Let's see how we go about reading the "page" and "category" query parameters as specified above:

<!-- prettier-ignore-start -->
```jsx
import { useRouter } from 'next/router'

export default function Products() {
  const router = useRouter()
  const { page } = router.query;
  const { category } = router.query;

  if (page && category) {
    return <p>Products for page: {page} &amp; category: {category}</p>
  } else {
    return <p>Page and/or Category Parameters Missing</p>
  }
}
```
<!-- prettier-ignore-end -->

Once again we have made use of the "query" property of router to obtain an object containing properties that match each query parameter. However, since these are technically optional parameters (it is possible to navigate to the route without them), we should check to make sure they exist before we render any data related to them.

:::info
If there are duplicate values for a query parameter, ie: "category=stationary&category=office", then the "category" property will contain an array containing the values: `["stationary", "office"]`
:::

## Dynamic Routes with 'getStaticProps'

If you wish to use 'getStaticProps' with dynamic routes, things become slightly more complicated. In a route that always fetches data from the same API endpoint, having the data available for pre-rendering is straightforward since the "fetch" statement always pulls data from the same location. However, if the route is dynamic, it becomes more difficult to pull the data ahead of time using 'getStaticProps'. To solve this problem, Next.js has an asynchronous ["getStaticPaths"](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) function that must be used in _addition_ to "getStaticProps". To see how this works, consider the following example:

**File:** "pages/post/[id].js"

<!-- prettier-ignore-start -->
```jsx
export async function getStaticPaths() {
  // pre-render and support post/1 through post/5 only
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
      { params: { id: "4" } },
      { params: { id: "5" } }
    ], fallback: false // any pages not identified above, will result in a 404 error, ie post/6
  }
}

export async function getStaticProps(context) {

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`)
  const data = await res.json()

  return { props: { post: data } }
}

export default function Post(props) {
  return <>
    <p><strong>User ID:</strong> {props.post.userId}</p>
    <p><strong>ID:</strong> {props.post.id}</p>
    <p><strong>Title:</strong> {props.post.title}</p>
    <p><strong>Body:</strong> {props.post.body}</p>
  </>
}
```
<!-- prettier-ignore-end -->

Here, we have a component "Post" that is located within the "pages" directory at "pages/post/[id].js". We also have "getStaticProps" as we have seen it before, except in this case it accepts a "context" parameter that provides the function with one of the id's in the list of paths returned from the "getStaticPaths" function (ie: context.params.id).

All of the supported route parameters are included in the "paths" property of the return value for the "getStaticPaths" function - if the user tries to access a route containing a parameter that is not listed in "paths", a 404 error will be returned. This is because an additional "fallback" property has explicitly been set to false. If this functionality is not desired, then fallback can be set to true (see: [the official documentation for "fallback: true"](https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-true) for more information).

Finally, you will notice that in our "Post" component, we do not have to explicitly read the route parameter using the ["useRouter"](https://nextjs.org/docs/pages/api-reference/functions/use-router#userouter) hook (as above). The "post" property in "props" will automatically contain the data for the correct "id" parameter.

## Custom Error Pages

Finally, you may have noticed by now that Next.js provides its own **404** and **500** error pages. However, it is possible to create your own as well. In this case all that is required is that you create a "404.js" or "500.js" file in the "pages" directory, ie:

**File:** "pages/404.js"

<!-- prettier-ignore-start -->
```jsx
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>
}
```
<!-- prettier-ignore-end -->

**File:** "pages/500.js"

<!-- prettier-ignore-start -->
```jsx
export default function Custom500() {
  return <h1>500 - Server-side error occurred</h1>
}
```
<!-- prettier-ignore-end -->
