---
id: UI-considerations
title: UI Considerations
sidebar_position: 2
description: UI Considerations
---

# UI Considerations

Continuing with the example for this topic ("simple-UI"); we have seen that our "vehicles" page is finally capable of rendering the data after acquiring the JWT from our "simple-API-complete" server. However, there still remain a few usability concerns that must be addressed. For example, the user should not be permitted to access the “vehicles” page without being authenticated. What if there is sensitive static information visible on this page? Also, does it make sense to allow an unauthenticated user to visit a view, if they’re guaranteed to not see any data? if It would be better for usability and security, if we did not enable the user to navigate to that route, unless they are authenticated.

Additionally, it's common practice for the UI to show some indication that the user has logged in. This may include showing their user name / avatar somewhere prominent on the site (ie: the navbar) as well as allowing them to "log out".

## Creating a "Route Guard" Component

To address the first issue (unauthorized access to the "vehicles" page), we will create a component that functions in a similar way to "Layout", in that it will be placed in App (\_app.js) and "wrap" `<Component {...pageProps} />`. The purpose of this component is to only render "props.children" if the user has been authenticated and is allowed to view the requested route.

To begin, create a new component in the "components" folder called: "RouteGuard" and add it to \_app.js

**File:** "/components/RouteGuard.js"

<!-- prettier-ignore-start -->
```jsx
export default function RouteGuard(props) {
  return <>{props.children}</>
}
```
<!-- prettier-ignore-end -->

**File:** "/pages/\_app.js"

<!-- prettier-ignore-start -->
```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '@/components/Layout';
import RouteGuard from '@/components/RouteGuard';

export default function App({ Component, pageProps }) {
  return <RouteGuard><Layout><Component {...pageProps} /></Layout></RouteGuard>
}
```
<!-- prettier-ignore-end -->

At the moment, this will not have any effect. However, with the component correctly positioned within our app, we can discuss how we can correctly add the desired functionality to the guard.

### Redirecting to "/login" if unauthenticated

If we wish to send the user to the "/login" route if they try to access a route without being authenticated first, we need to ensure that the following logic is in place for our route guard:

- Maintains a list of "public" routes, ie: "/login", "/" and "/\_error" (Next.js uses the path "/\_error" internally when rendering the "404 | This page could not be found" error).

- Ability to check the url of the current (requested) route and compare it against the above list

- Check to see if the user is currently authenticated

- Redirect to "/login" if unauthenticated / render props.children if the user is authenticated

#### authCheck() Function

To implement these requirements, we should first construct a function called "authCheck" that checks the requested route and compares it against the "public" routes.

```jsx
const PUBLIC_PATHS = ['/login', '/', '/_error'];

// ...

function authCheck(url) {
  const path = url.split('?')[0];
  if (!PUBLIC_PATHS.includes(path)) {
    console.log(`trying to request a secure path: ${path}`);
  }
}
```

Here, we define constant list of "PUBLIC_PATHS" as '/login', '/' and '/\_error'. We also remove any query parameters from the url by [splitting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) the string at "?" and taking the first half.

If the PUBLIC_PATHS array does not [include](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) the requested route, output a message to the console indicating that a secure path is being accessed.

#### invoking authCheck()

To correctly invoke authCheck() we must execute it:

- When the component is first mounted: using the useEffect() hook

- When a client-side route change has completed: using the 'routeChangeComplete' [router event](https://nextjs.org/docs/api-reference/next/router#routerevents)

  > **NOTE:** [Router Events](https://nextjs.org/docs/api-reference/next/router#routerevents) in Next.js can be "subscribed" to by using the "events.on" properties of the "router" object (obtained from the useRouter() hook), for example:
  >
  > ```jsx
  > router.events.on('routeChangeComplete', (url) => {
  >   console.log(`route change to ${url} complete!`);
  > });
  > ```
  >
  > When no longer needed, the event can be "unsubscribed" to by using: `router.evnts.off()`

To ensure that authCheck() is correctly invoked in both of the above scenarios, we can update our RouteGuard component to use the following code:

<!-- prettier-ignore-start -->
```jsx
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const PUBLIC_PATHS = ['/login', '/', '/_error'];

export default function RouteGuard(props) {
  const router = useRouter();

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.pathname);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  function authCheck(url) {
    const path = url.split('?')[0];
    if (!PUBLIC_PATHS.includes(path)) {
      console.log(`trying to request a secure path: ${path}`);
    }
  }

  return <>{props.children}</>
}
```
<!-- prettier-ignore-end -->

With this code in place for RouteGuard, we should see "trying to request a secure path /vehicles" if we try to refresh the "/vehicles" page **or** navigate to it using the navigation bar.

#### Adding Authentication & Redirection

To complete the RouteGuard functionality, we must implement logic to check whether or not the user is logged in. We can use this to either alow access to the requested route (by rendering "props.children"), or redirect the user back to "/login" (using `router.push("/login");`).

First, we should add a value in the state to store whether or not the user has been authorized to view the protected routes. We can use this to conditionally render "props.children", as described above:

<!-- prettier-ignore-start -->
```jsx
const [authorized, setAuthorized] = useState(false);

// ...

return <>{authorized && props.children}</>
```
<!-- prettier-ignore-end -->

Next, we must add the ability to check if a user has been authenticated and if so, set "authorized" to true, so that the route may be rendered. However, if the user has not been authenticated, we can set "authorized" to false and redirect the user back to "/login". This can be achieved by importing the "isAuthenticated()" function from our "authenticate" lib, as well as updating our "authCheck" function:

```jsx
import { isAuthenticated } from '@/lib/authenticate';

// ...

function authCheck(url) {
  // redirect to login page if accessing a private page and not logged in
  const path = url.split('?')[0];
  if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
    setAuthorized(false);
    router.push('/login');
  } else {
    setAuthorized(true);
  }
}
```

Here, we make sure to only redirect to "/login" if the user has not been authenticated **and** they are trying to access a restricted route. If they are not authenticated and try to access an unrestricted route (ie: a route defined in "PUBLIC_PATHS"), then they should be allowed to proceed.

## Updating the Navigation Component

With our Route Guard in place and successfully preventing unauthorized users from viewing the "/vehicles" page, we an concentrate on the last piece of our UI: Updating the "Navigation" Component. Here, we will show a welcome message, ie "Welcome **userName**" as well as only show the "Vehicles" link if the user has logged in. Additionally, we will replace the "login" link with a "logout" link.

The first thing we must do is add the "readToken" and "removeToken" functions from our "authenticate" lib as well as "useRouter" from "next/router":

```jsx
import { readToken, removeToken } from '@/lib/authenticate';
import { useRouter } from 'next/router';
```

We will use this within the component to:

- Store the current value of the token:

```jsx
let token = readToken();
```

- Implement a "logout" function that removes the token and redirects the user back to "/":

```jsx
const router = useRouter();

function logout() {
  removeToken();
  router.push('/');
}
```

### Updating the JSX

Finally, with our token in place and our logout function implemented, we can make the following changes to our JSX code for the component to conditionally render text / elements using the "token" value:

<!-- prettier-ignore-start -->
```jsx
return (
  <Navbar bg="light" expand="lg">
    <Container>
      <Link href="/" passHref legacyBehavior><Navbar.Brand >Vehicles UI {token && <>- Welcome {token.userName}</>}</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link href="/" passHref legacyBehavior ><Nav.Link>Home</Nav.Link></Link>
          {token && <Link href="/vehicles" passHref legacyBehavior><Nav.Link>Vehicles</Nav.Link></Link>}
        </Nav>
        <Nav className="ml-auto">
          {!token && <Link href="/login" passHref legacyBehavior><Nav.Link>Login</Nav.Link></Link>}
          {token && <Nav.Link onClick={logout}>Logout</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
```
<!-- prettier-ignore-end -->

Using the above code, we can ensure that once the user is logged in, they will see their user name as well as the "vehicles" and "logout" links in the navigation bar!
