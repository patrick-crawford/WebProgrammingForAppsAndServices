---
id: adding-API-data
title: 'Adding API Data'
sidebar_position: 2
description: 'Adding API Data'
---

# Adding API Data

If you inspect the source code that is returned from the development server for a given page in Next.js, you will notice that in addition to the &lt;script&gt; tags that provide the functionality for the application / site, we also have parts of our components _already rendered_ in the &lt;body&gt;. This is in stark contrast to other toolchains / frameworks such as "Create React App" which only contain a **single** element in the &lt;body&gt;, ie:

```html
<div id="root"></div>
```

The bulk of the content (ie: your Components) would then be dynamically added to the body using JavaScript and the full page would be rendered. Unfortunately, this method of rendering content means that it is more difficult for search engines to index your pages and [SEO (Search Engine Optimization)](https://en.wikipedia.org/wiki/Search_engine_optimization) suffers as a result. Fortunately, since we are using Next.js, this is less of a problem:

From the [official Next.js documentation](https://nextjs.org/docs/basic-features/pages#pre-rendering)

> By default, Next.js pre-renders every page. This means that Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript. Pre-rendering can result in better performance and SEO.
>
> Each generated HTML is associated with minimal JavaScript code necessary for that page. When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called hydration.)

## Hydration

Notice how the documentation mentioned "hydration" in its description of what occurs when a page is loaded by the browser. This is not the first time that we have seen this mentioned in these notes - recall the code to initialize the "date" state for our &lt;Clock /&gt; component :

```jsx
const [date, setDate] = useState(null); // Note: Never set this to unknown data obtained at run time (ie: new Date(), a random number, etc.) - see: https://nextjs.org/docs/messages/react-hydration-error
```

We were forced to set the initial value of "date" to "null" to avoid a potential [hydration error](https://nextjs.org/docs/messages/react-hydration-error). This is because the pre-rendered HTML is actually generated when the app does a new "build" (in "dev" mode, this is every time a change is made to your code). If we initialize the state to a dynamic value (ie: "new Date()"), then the page will be pre-rendered with a value that will be instantly out-of-date. When the page is then loaded at a different time, a hydration error occurs:

```
Unhandled Runtime Error
Error: Text content does not match server-rendered HTML.
```

This is because the pre-rendered body of the page looks something like this:

<!-- prettier-ignore-start -->
```html
<p>
  Locale: <!-- -->: <!-- -->1:43:08 PM<!-- --> <!-- -->
</p>
```
<!-- prettier-ignore-end -->

which instantly disagrees with the code generated on the first render, ie after "hydration" sometime later.

You will recall that to fix this issue, we placed our code to initialize the date value within the body of the ["useEffect"](https://react.dev/reference/react/useEffect) hook's callback function:

```js
useEffect(() => {
  setDate(new Date());
}, []);
```

The reason that this worked to solve the hydration error was because code in the callback defined in the useEffect hook only gets executed once the component is first "mounted" (ie: added to the DOM) after "hydration". It is not executed when the pre-rendered HTML is being generated. This causes the pre-rendered body of the page to look like the following:

<!-- prettier-ignore-start -->
```html
<p>
  Locale: <!-- -->: <!-- --> <!-- -->
</p>
```
<!-- prettier-ignore-end -->

which avoids the content mis-match when the component is rendered after "hydration".

## Fetching API Data after Hydration

Now that we are familiar with the concepts of "pre-rendering" and "hydration", it follows that a request for API data that must occur _after_ hydration should be done within the "useEffect" hook as well. For example, consider the following "Post" component which fetches data from our familiar [{JSON} Placeholder](https://jsonplaceholder.typicode.com/) dataset:

<!-- prettier-ignore-start -->
```jsx
import { useState, useEffect } from "react";

export default function Post() {

  const [post, setPost] = useState();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/1`).then(res => res.json()).then(data => {
      setPost(data);
    })
  }, []);

  return (
    <>
      <strong>User ID:</strong> {post?.userId}<br />
      <strong>Title:</strong> {post?.title}<br />
      <strong>Body:</strong> {post?.body}<br />
    </>
  )
}
```
<!-- prettier-ignore-end -->

This component does not set any value for "post" in the state (leaving it 'undefined') and instead relies upon the callback function defined within "useEffect" to pull in the data and update the "post" value. This results in the pre-rendered HTML looking like the following:

<!-- prettier-ignore-start -->
```html
<strong>User ID:</strong> <!-- --><br>
<strong>Title:</strong> <!-- --><br>
<strong>Body:</strong> <!-- --><br>
```
<!-- prettier-ignore-end -->

Once "hydration" occurs, the effect is executed and the "post" value is set (causing a render). This gives us:

<!-- prettier-ignore-start -->
```html
<strong>User ID:</strong> <!-- -->1<!-- --><br>
<strong>Title:</strong> <!-- -->sunt aut facere repellat provident occaecati excepturi optio reprehenderit<!-- --><br>
<strong>Body:</strong> <!-- -->quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto<!-- --><br>

```
<!-- prettier-ignore-end -->

> **NOTE**: When fetching data on the client-side (as above, in the "useEffect" hook), Next.js recommends that [**SWR**](https://swr.vercel.app/) be used instead, as it handles "caching, revalidation, focus tracking, refetching on intervals, and more".
>
> Using SWR, the above component would look like:

<!-- prettier-ignore-start -->
>
> ```jsx
> import useSWR from 'swr';
>
> // define the "fetcher" function.  This Can also be defined globally using SWRConfig (https://swr.vercel.app/docs/global-configuration)
> const fetcher = (url) => fetch(url).then((res) => res.json()); 
>
> export default function Post() {
>   const { data, error } = useSWR('https://jsonplaceholder.typicode.com/posts/1', fetcher);
>
>   return (
>     <>
>       <strong>User ID:</strong> {data?.userId}<br />
>       <strong>Title:</strong> {data?.title}<br />
>       <strong>Body:</strong> {data?.body}<br />
>     </>
>   );
> }
> ```
>
<!-- prettier-ignore-end -->

> For more information on using SWR, refer to the [official SWR documentation](https://swr.vercel.app/docs/getting-started).

## Fetching API Data for Pre-Rendered HTML

If the data that is coming back from the API is not likely to change, we may wish to include it in the pre-rendered HTML to speed up load times and provide greater SEO.

Next.js provides this functionality via a mechanism called [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching/get-static-props). This is essentially a function that Next.js runs on the server when the app is built in order to obtain data required to pre-render your pages. From our point of view, it is a function that we can export from any "page" component to provide data to any components on that page via "props".

> **Warning:** This will _not work_ with custom components defined within the "components" folder.

At the moment, we really only have one "page" component - the &lt;Home /&gt; component declared in **index.html**. It should contain the &lt;Post /&gt; component, ie:

```jsx
import Post from '@/components/Post';

export default function Home() {
  return (
    <>
      <Post />
    </>
  );
}
```

if we wish to have the data for the &lt;Post /&gt; component fetched at build time, we must make use of the "asynchronous" getStaticProps() function in this file, ie:

<!-- prettier-ignore-start -->
```jsx
import Post from '@/components/Post';

// This function gets called at build time
export function getStaticProps() {
  // Call an external API endpoint to get posts
  return new Promise((resolve,reject)=>{
    fetch('https://jsonplaceholder.typicode.com/posts/1').then(res=>res.json()).then(data=>{
      resolve({ props: { staticPost: data } })
    })
  })
}

export default function Home(props) {
  console.log(props); // props.staticPost should contain our data
  return (
    <>
      <Post />
    </>
  );
}
```
<!-- prettier-ignore-end -->

Here, we have exported an extra function above our "Home" component definition. The purpose of this function is to provide the exported page component (ie: **"Home"**, in this case) with additional props that contain data to be pre-rendered by the component and/or the child components. The function always returns a promise which resolves with an object that contains one of the following properties:

- [**props**](https://nextjs.org/docs/api-reference/data-fetching/get-static-props#props): "a key-value pair, where each value is received by the page component. It should be a serializable object so that any props passed, could be serialized with JSON.stringify."

- [**redirect**](https://nextjs.org/docs/api-reference/data-fetching/get-static-props#redirect): "The redirect object allows redirecting to internal or external resources. It should match the shape of { destination: string, permanent: boolean }."

- [**notfound**](https://nextjs.org/docs/api-reference/data-fetching/get-static-props#notfound): "allows the page to return a 404 status and 404 Page. With notFound: true, the page will return a 404 even if there was a successfully generated page before. This is meant to support use cases like user-generated content getting removed by its author."

> **NOTE**: an optional "[revalidate](https://nextjs.org/docs/api-reference/data-fetching/get-static-props#revalidate)" is also available, which allows you to update static pages after you’ve built your site. See: [Incremental Static Regeneration (ISR)](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) for more information

Finally, since this function always returns a promise is often written using the [async / await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) syntax, ie:

```jsx
// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const data = await res.json();

  return { props: { staticPost: data } };
}
```

### Passing the staticPost prop to "Post"

Now that we know we can fetch data at build time for "page" components, the final step is to refactor any components contained on the page that use that data to accept it as a property (props). In our case, this is the &lt;Post /&gt; component. At the moment, it is in charge of fetching its own data on demand at runtime (per request) by placing the "fetch" code within the "useEffect" callback:

<!-- prettier-ignore-start -->
```jsx
import { useState, useEffect } from "react";

export default function Post() {

  const [post, setPost] = useState();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/1`).then(res => res.json()).then(data => {
      setPost(data);
    })
  }, []);

  return (
    <>
      <strong>User ID:</strong> {post?.userId}<br />
      <strong>Title:</strong> {post?.title}<br />
      <strong>Body:</strong> {post?.body}<br />
    </>
  )
}
```
<!-- prettier-ignore-end -->

since we know that the same data is available in the parent component, we can refactor this code to use "props" instead:

<!-- prettier-ignore-start -->
```jsx
export default function Post(props) {
  return (
    <>
      <strong>User ID:</strong> {props.post?.userId}<br />
      <strong>Title:</strong> {props.post?.title}<br />
      <strong>Body:</strong> {props.post?.body}<br />
    </>
  )
}
```
<!-- prettier-ignore-end -->

Finally, we must ensure that the &lt;Post /&gt; component actually receives the props from the parent "page" component:

<!-- prettier-ignore-start -->
```jsx
export default function Home(props) {
  return (
    <>
      <Post post={props.staticPost} />
    </>
  );
}
```
<!-- prettier-ignore-end -->

Now, if you try viewing the component again you should see the data as before, however now the pre-rendered content of the page contains the data:

<!-- prettier-ignore-start -->
```html
<strong>User ID:</strong> <!-- -->1<!-- --><br>
<strong>Title:</strong> <!-- -->sunt aut facere repellat provident occaecati excepturi optio reprehenderit<!-- --><br>
<strong>Body:</strong> <!-- -->quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto<!-- --><br>
```
<!-- prettier-ignore-end -->
