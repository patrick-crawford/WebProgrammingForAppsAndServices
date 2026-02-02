---
id: layouts-and-pages
title: 'Layouts & Pages'
sidebar_position: 1
description: 'Layouts & Pages'
---

# Layouts & Pages

Until now, we have only worked with a single "page" in our Next.js app: "Home", defined by the "Home" component, located within the index.js file in the "pages" folder. In this section, we explore how to add additional routes (pages) to the application.

## Adding a Route

Each "route" in our application / site is defined by the name of the file within the "pages" folder. In this case, we only have one route "/" because there is only one file in the "pages" folder: **index.js** (not including "\_app.js" which is used to initialize pages - discussed later on).

We will be adding another route at "/about". When complete, our application will have two routes:

- Route: "/" - Renders component from "pages/index.js"
- Route "/about" - Renders component from "pages/about.js"

Here's how to add the /about route:

1. In the project's `pages` folder, add a file called: **`about.js`**

```text title="Pages folder structure"
📂 pages
 ┣ 📂 api
 ┃ _app.js
 ┣ _document.js
 ┣ about.js      <-- added this file
 ┗ index.js
```

2. In the `about.js` file, add this code:

```jsx title="/pages/about.js"
export default function About() {
  return (
    <>
      <p>About</p>
    </>
  );
}
```

:::caution

The name of the exported component does _not_ need to match the file name, since it is the file name that defines the route. However, the name of the component **must be capitalized** as usual.

:::

3. In the browser, visit the /about route. The page contents will appear.

## Nested Routes

It is sometimes necessary to define routes that are "nested" ie: "/dashboard/preferences". To achieve this, we simply need to recreate the nested route as a nested folder structure within the pages folder. Additionally, if we place an **index.js** file nested within another folder, Next.js will automatically serve that component as the default route for that folder.

Let's expand our current list of routes to add two "dashboard" routes:

- Route: "**/dashboard**" - Renders component from "pages/dashboard/index.js"
- Route "**/dashboard/preferences**" - Renders component from "pages/dashboard/preferences.js"

1. In the `pages` folder, add a folder called `dashboard`

```text
📂 pages
┣ 📂 api
┣ 📂 dashboard <-- create this folder
┣ _app.js
┗ ... etc

```

2. Within the `pages/dashboard` folder, add two new components:

- **File:** "pages/dashboard/index.js"
- **File:** "pages/dashboard/preferences.js"

```text
📂 pages
 ┣ 📂 api
 ┣ 📂 dashboard
 ┃ ┣ index.js         <-- add this file
 ┃ ┗ preferences.js   <-- add this file
 ┣ _app.js
 ┗ ... etc
```

3. In each file, add the code for a new endpoint:

- Code snippet for the `dashboard/index.js` page:

```jsx title="pages/dashboard/index.js"
export default function DashboardHome() {
  return (
    <>
      <p>Dashboard Home</p>
    </>
  );
}
```

- Code for the `dashboard/preferences` page:

```jsx title="pages/dashboard/preferences.js"
export default function DashboardPreferences() {
  return (
    <>
      <p>Dashboard Preferences</p>
    </>
  );
}
```

3. When complete, the application has this updated list of routes:

- Route: "/" - Renders component from "pages/index.js"
- Route "/about" - Renders component from "pages/about.js"
- Route: "/dashboard" - Renders component from "pages/dashboard/index.js"
- Route "/dashboard/preferences" - Renders component from "pages/dashboard/preferences.js"

## Layouts

If we have components that are re-used across multiple pages (ie: a common "navbar" / "footer"), we can place these in a custom "Layout" component, which can then be specified for the whole application. Let's begin by creating a very simple layout without any extra components.

1. In the project's `components` folder, add a new file called `layout.js`:

```
📦 my-app
 ┣ 📂 components
 ┃ ┗ layout.js        <-- add this file
 ┣ 📂pages
 ┣ 📂public
 ┣ 📂styles
 ┣ README.md
 ┣ package-lock.json
 ┗ ... etc
```

:::caution

Since layouts are not "pages", they **must not** be placed within the "pages" folder - instead, place them in a "components" folder, as we have previously done.

:::

2. In the `components/layout.js` file, add this code:

<!-- prettier-ignore-start -->
```jsx title="components/layout.js"
export default function Layout(props) {
  return (
    <>
      <h1>Pages / Routing in Next.js</h1>
      <a href="/">Home</a> | <a href="/about">About</a> | <a href="/dashboard">Dashboard</a> | <a href="/dashboard/preferences">Dashboard Preferences</a>
      <hr />
      <br />
      {props.children}
      <br />
    </>
  );
}
```
<!-- prettier-ignore-end -->

You will notice that this looks exactly like any other custom component that we have created before, except instead of rendering specific data passed to props (or within the "state" of the component), it renders ["props.children"](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children). This is essentially a placeholder that renders the children of the component at a specific point in the layout. When using "props.children", we will be including the component using the form "&lt;Layout&gt;&lt;/Layout&gt;" instead of the "self-closing" notation (ie: &lt;Layout /&gt;) that we have used so far.

3. To include this layout in all our pages, we must open the aforementioned "\_app.js" file located within the "pages" folder and "wrap" the `<Component {...pageProps} />` with our new layout:

```jsx title="pages/_app.js"
import Layout from '@/components/layout';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```

4. Navigate to the website. You will see a common navigation bar with links to all our newly created routes.

:::info
It is also possible to configure layouts on a page-by-page basis. See the [official documentation](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#per-page-layouts) for more information.
:::

## Client-Side Page Transitions

When browsing the site, you may have noticed that each route takes a moment to load, despite the fact there is little difference between the UI / DOM for each route. This is because the entirety of the app (ie: all .js files) is downloaded each time a new route is accessed - this can be confirmed by viewing the network activity in the dev tools. Fortunately, Next.js provides a mechanism to transition between pages without reloading every .js file for the application. This is known as "client-side routing" / "client-side route transitions".

### Link Component

Client-side routing can be achieved by replacing anchor tags (&lt;a&gt;...&lt;/a&gt;) with custom ["Link" Components](https://nextjs.org/docs/pages/api-reference/components/link) (&lt;Link&gt;...&lt;/Link&gt;) containing the "href" attribute. Let's test this by refactoring our Layout to use "Link":

<!-- prettier-ignore-start -->
```jsx title="components/layout.js"
import Link from 'next/link';

export default function Layout(props) {
  return (
    <>
      <h1>Pages / Routing in Next.js</h1>
      <Link href="/">Home</Link> | <Link href="/about">About</Link> | <Link href="/dashboard">Dashboard</Link> | <Link href="/dashboard/preferences">Dashboard Preferences</Link>
      <hr />
      <br />
      {props.children}
      <br />
    </>
  );
}
```
<!-- prettier-ignore-end -->

You will find that the page transitions are much faster and that only the relevant .js is loaded when each route is first accessed. Once that route is accessed for a second time, nothing is download from the server - loading the required .js files on demand is known as ["Lazy Loading"](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading).

It is also important to note that the "Link" component accepts the following props (from the [official documentation](https://nextjs.org/docs/pages/api-reference/components/link)):

- **href** - The path or URL to navigate to. This is the only required prop

- **replace** - Replace the current history state instead of adding a new url into the stack. Defaults to false

- **scroll** - Scroll to the top of the page after a navigation. Defaults to true

- **prefetch** - Prefetch the page in the background. Defaults to true. Any &lt;Link /&gt; that is in the viewport (initially or through scroll) will be preloaded. Prefetch can be disabled by passing `prefetch={false}`. When prefetch is set to false, prefetching will still occur on hover. Pages using Static Generation will preload JSON files with the data for faster page transitions. Prefetching is only enabled in production.

- **shallow** - Update the path of the current page without rerunning getStaticProps, getServerSideProps or getInitialProps. Defaults to false

- **locale** - The active locale is automatically prepended. locale allows for providing a different locale. When false href has to include the locale as the default behavior is disabled.

- **onNavigate** - An event handler called during client-side navigation. The handler receives an event object that includes a preventDefault() method, allowing you to cancel the navigation if needed.

### useRouter Hook

If we wish to achieve the same effect from within our component logic (such as in an "onClick" event handler), we must make use of the ["useRouter"](https://nextjs.org/docs/pages/api-reference/functions/use-router#userouter) hook from "next/router":

```jsx
import { useRouter } from 'next/router';
```

This hook will be used to obtain a ["router"](https://nextjs.org/docs/pages/api-reference/functions/use-router#router-object) object from within our component by invoking "useRouter()":

```jsx
const router = useRouter();
```

The [router object](https://nextjs.org/docs/pages/api-reference/functions/use-router#router-object) itself has _many useful properties_, such as:

- **pathname:** The current route - the path of the page in /pages.

- **query:** The query string parsed to an object, including dynamic route parameters. It will be an empty object during prerendering if the page doesn't have data fetching requirements. Defaults to `{}`

However, at the moment we are most interested in the ["push"](https://nextjs.org/docs/pages/api-reference/functions/use-router#routerpush) method to transition to a new route:

```jsx
router.push('/'); // navigate to the home route "/"
```

This method accepts three arguments, ie:

- **url**: The URL to navigate to (either as a string or [urlObject](https://nodejs.org/api/url.html#legacy-urlobject))

- **as**: Optional decorator for the path that will be shown in the browser URL bar.

- **options**: Optional object with the following configuration options:

  - **scroll**: Optional boolean, controls scrolling to the top of the page after navigation. Defaults to true

  - **shallow**: Update the path of the current page without rerunning getStaticProps, getServerSideProps or getInitialProps. Defaults to false

  - **locale**: Optional string, indicates locale of the new page
