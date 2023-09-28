---
id: layouts-and-pages
title: 'Layouts & Pages'
sidebar_position: 1
description: 'Layouts & Pages'
---

# Layouts & Pages

Until now, we have only worked with a single "page" in our Next.js app: "Home", defined by the "Home" component, located within the index.js file in the "pages" folder.

Each "route" in our application / site is defined by the name of the file within the "pages" folder. In this case, since we only have one file in the pages folder: **index.js** (not including "\_app.js" which is used to initialize pages - discussed later on), we only have one route "/". If we add another file, ie: "about.js" in the "pages" folder:

```jsx
export default function About() {
  return (
    <>
      <p>About</p>
    </>
  );
}
```

we will be adding another route at "/about" giving us:

- Route: "/" - Renders component from "pages/index.js"
- Route "/about" - Renders component from "pages/about.js"

> **NOTE:** The name of the exported component does _not_ need to match the file name, since it is the file name that defines the route. However, the name of the component **must be capitalized** as usual.

## Nested Routes

It is sometimes necessary to define routes that are "nested" ie: "/dashboard/preferences". To achieve this, we simply need to recreate the nested route as a nested folder structure within the pages folder. Additionally, if we place an **index.js** file nested within another folder, Next.js will automatically serve that component as the default route for that folder. For example, if we wish to expand our current list of routes to add two "dashboard" routes, we can create the components:

**File:** "pages/dashboard/index.js"

```jsx
export default function DashboardHome() {
  return (
    <>
      <p>Dashboard Home</p>
    </>
  );
}
```

**File:** "pages/dashboard/preferences.js"

```jsx
export default function DashboardPreferences() {
  return (
    <>
      <p>Dashboard Preferences</p>
    </>
  );
}
```

Which will give us the updated list of routes:

- Route: "/" - Renders component from "pages/index.js"
- Route "/about" - Renders component from "pages/about.js"
- Route: "/dashboard" - Renders component from "pages/dashboard/index.js"
- Route "/dashboard/preferences" - Renders component from "pages/dashboard/preferences.js"

## Layouts

If we have components that are re-used across multiple pages (ie: a common "navbar" / "footer"), we can place these in a custom "Layout" component, which can then be specified for the whole application. Let's begin by creating a very simple layout without any extra components:

> **NOTE:** Since layouts are not "pages", they _must not_ be placed within the "pages" folder - instead, place them in a "components" folder, as we have previously done.

**File:** "components/layout.js"

<!-- prettier-ignore-start -->
```jsx
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

To include this layout in all our pages, we must open the aforementioned "\_app.js" file located within the "pages" folder and "wrap" the "&lt;Component {...pageProps} /&gt;" with our new layout:

**File:** "pages/\_app.js"

```jsx
import Layout from '@/components/layout';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
```

If we browse the site now, we should see a common navigation bar with links to all our newly created routes.

> **NOTE**: It is also possible to configure layouts on a page-by-page basis. See the [official documentation](https://nextjs.org/docs/basic-features/layouts#per-page-layouts) for more information.

## Client-Side Page Transitions

When browsing the site, you may have noticed that each route takes a moment to load, despite the fact there is little difference between the UI / DOM for each route. This is because the entirety of the app (ie: all .js files) is downloaded each time a new route is accessed - this can be confirmed by viewing the network activity in the dev tools. Fortunately, Next.js provides a mechanism to transition between pages without reloading every .js file for the application. This is known as "client-side routing" / "client-side route transitions".

### Link Component

Client-side routing can be achieved by wrapping any anchor tags (&lt;a:&gt;...&lt;/a&gt;) with a custom ["Link" Component](https://nextjs.org/docs/api-reference/next/link) (&lt;Link&gt;...&lt;/Link&gt;) containing the "href" attribute. Let's test this by refactoring our Layout to use "Link":

<!-- prettier-ignore-start -->
```jsx
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

It is also important to note that the "Link" component accepts the following props (from the [official documentation](https://nextjs.org/docs/api-reference/next/link)):

- **href** - The path or URL to navigate to. This is the only required prop

- **as** - Optional decorator for the path that will be shown in the browser URL bar.

- **legacyBehavior** - Changes behavior so that child must be &lt;a&gt;. Defaults to false.

  > **NOTE**: This is important to use if [the child is a custom component that wraps the &lt;a&gt; tag](https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag)

- **passHref** - Forces Link to send the href property to its child. Defaults to false

- **prefetch** - Prefetch the page in the background. Defaults to true. Any &lt;Link /&gt; that is in the viewport (initially or through scroll) will be preloaded. Prefetch can be disabled by passing prefetch={false}. When prefetch is set to false, prefetching will still occur on hover. Pages using Static Generation will preload JSON files with the data for faster page transitions. Prefetching is only enabled in production.

- **replace** - Replace the current history state instead of adding a new url into the stack. Defaults to false

- **scroll** - Scroll to the top of the page after a navigation. Defaults to true

- **shallow** - Update the path of the current page without rerunning getStaticProps, getServerSideProps or getInitialProps. Defaults to false

- **locale** - The active locale is automatically prepended. locale allows for providing a different locale. When false href has to include the locale as the default behavior is disabled.

### useRouter Hook

If we wish to achieve the same effect from within our component logic (such as in an "onClick" event handler), we must make use of the ["useRouter"](https://nextjs.org/docs/api-reference/next/router#userouter) hook from "next/router":

```jsx
import { useRouter } from 'next/router';
```

This hook will be used to obtain a ["router"](https://nextjs.org/docs/api-reference/next/router#router-object) object from within our component by invoking "useRouter()":

```jsx
const router = useRouter();
```

The [router object](https://nextjs.org/docs/api-reference/next/router#router-object) itself has _many useful properties_, such as:

- **pathname:** The current route - the path of the page in /pages.

- **query:** The query string parsed to an object, including dynamic route parameters. It will be an empty object during prerendering if the page doesn't have data fetching requirements. Defaults to {}

However, at the moment we are most interested in the ["push"](https://nextjs.org/docs/api-reference/next/router#routerpush) method to transition to a new route:

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
