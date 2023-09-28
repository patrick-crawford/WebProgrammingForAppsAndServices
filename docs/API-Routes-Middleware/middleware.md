---
id: middleware
title: Middeware
sidebar_position: 2
description: Middleware
---

# Middleware

If you are familiar with the popular ["Express.js"](https://expressjs.com/) web framework for Node.js, you will be familiar with the concept of "Middleware"

> Middleware functions are functions that have access to the request object (req), the response object (res), and the next() function in the application’s request-response cycle. The next() function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.
>
> [http://expressjs.com/en/guide/writing-middleware.html](http://expressjs.com/en/guide/writing-middleware.html).

Essentially, middleware allows us to execute functions in the ‘middle’ of a request/response cycle typically before a matching route (api / page) handler function is executed.

Next.js has a similar concept, although it is implemented differently:

> [In Next.js] middleware allows you to run code before a request is completed. Then, based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.
>
> Middleware runs before cached content and routes are matched.
>
> [https://nextjs.org/docs/pages/building-your-application/routing/middleware](https://nextjs.org/docs/pages/building-your-application/routing/middleware)

Here, we have a function is automatically executed as part of the request / response cycle in Next.js. It can be configured to apply logic to a specific route, or conditionally with multiple routes.

## Getting Started

To see how middleware in Next.js is implemented, create a **"middleware.js"** file within the root of your application folder (ie: "my-app/middleware.js"):

**File:** /middleware.js

```js
export function middleware(request) {
  console.log('requested: ', request.url);
}
```

If you test the server now and navigate to the default route "/", you will see that the middleware function has been executed once for every resource sent from our local server (`http://localhost:3000`) for the "/" page:

```bash
requested:  http://localhost:3000/vercel.svg
requested:  http://localhost:3000/next.svg
requested:  http://localhost:3000/_next/static/media/2aaf0723e720e8b9-s.p.woff2
requested:  http://localhost:3000/_next/static/chunks/react-refresh.js?ts=1693361554048
requested:  http://localhost:3000/_next/static/chunks/main.js?ts=1693361554048
requested:  http://localhost:3000/_next/static/chunks/webpack.js?ts=1693361554048
requested:  http://localhost:3000/_next/static/chunks/pages/_app.js?ts=1693361554048
requested:  http://localhost:3000/_next/static/development/_buildManifest.js?ts=1693361554048
requested:  http://localhost:3000/_next/static/chunks/pages/index.js?ts=1693361554048
requested:  http://localhost:3000/_next/static/development/_ssgManifest.js?ts=1693361554048
requested:  http://localhost:3000/_next/static/development/_devMiddlewareManifest.json
requested:  http://localhost:3000/_next/static/development/_devPagesManifest.json
requested:  http://localhost:3000/favicon.ico
requested:  http://localhost:3000/vercel.svg
requested:  http://localhost:3000/next.svg
```

We are able to access the "url" property on the "request" object, because request is technically an instance of ["NextRequest"](https://nextjs.org/docs/pages/api-reference/functions/next-server#nextrequest), which itself, is an extension of the native ["Request"](https://developer.mozilla.org/en-US/docs/Web/API/Request) object.

## Matching Paths

Now that we know that the "middleware" function is behaving correctly (ie: invoked as a part of the request / response cycle - before the request is completed), we should consider only applying it to certain paths, such as pages or api routes. To achieve this, we must update our "middleware.js" file to also export a "config" object with a "matcher" property:

```js
export const config = {
  matcher: '/',
};
```

In the above cae, having a matcher value of "/" will restrict the middleware function to _only_ run on the "/" route. If we open the console with the current configuration, we will only see:

```bash
requested:  http://localhost:3000/
```

### Multiple Paths

Say we have a second route: "/about" that we would also like to match. This can be done by passing an **array of matchers** to the "matcher" property:

```js
export const config = {
  matcher: ['/', '/about'],
};
```

### Nested Paths (Wildcard)

There are many cases where we have nested paths, such as "/api/users". In addition to matching "/api/users", we may want to match all "/api/users" routes, such as "/api/users/123". This can be done using the `:path*` (which will also match routes such as "/api/users/a/b/c"):

```js
export const config = {
  matcher: ['/api/users/:path*'],
};
```

> **NOTE:** The matcher config allows full regex so matching like negative lookaheads or character matching is supported. For example: `'/((?!api|_next/static|_next/image|favicon.ico).*)'` will match all request paths except for the ones starting with:
>
> - api (API routes)
> - \_next/static (static files)
> - \_next/image (image optimization files)
> - favicon.ico (favicon file)
>
> [Next.js Docs - "matcher config"](https://nextjs.org/docs/pages/building-your-application/routing/middleware#matcher)

### Conditionally

Finally, we may wish to perform different actions depending on which path is matched. In this case, we do not include the "matcher" config, and instead rely on the "request" parameter. Recall: this is an instance of ["NextRequest"](https://nextjs.org/docs/pages/api-reference/functions/next-server#nextrequest), which gives us access to the "nextUrl" property, which itself includes "an extended, parsed, URL object that gives you access to Next.js specific properties such as pathname, basePath, trailingSlash and i18n". This appears to be exactly what we need (i.e. manually examine the _pathname_ and respond with the intended logic):

```js
export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/about')) {
    console.log('Visiting About');
  }

  if (request.nextUrl.pathname.startsWith('/api/users')) {
    console.log('Visiting the Users API');
  }
}
```

## Practical Examples

Now that we are able to add middleware functionality to a certain route / set of routes, let's see what kind of practical benefits this provides.

> **NOTE:** When using middleware, we have access to a ["NextResponse"](https://nextjs.org/docs/pages/building-your-application/routing/middleware#nextresponse) object from "next/server" (ie: `import { NextResponse } from 'next/server';`). Using this object, we can perform some useful actions from our middleware, such as:
>
> - redirect the incoming request to a different URL
> - rewrite the response by displaying a given URL
> - Set request headers for API Routes, getServerSideProps, and rewrite destinations
> - Set response cookies
> - Set response headers

### Using Cookies

As we know, a "cookie" is a small chunk of data that is sent by a server and stored in the client's web browser using the header ["Set-Cookie"](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie). Similarly, the data is automatically sent from the client back to the server, using the ["Cookie"](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cookie) header, often used to manage session information. In Next.js we can implement this functionality in our middleware functions by using the "cookies" property on both the request ("NextRequest") and response ("NextResponse") objects.

In the below example, we have two routes: "/setCookie" (which is expecting a query parameter: "message") and "/getCookie". When the middleware matches the "/setCookie" route, it reads the query parameter "message" and adds it to the "Set-Cookie" response header. If the middleware matches the "/getCookie" route, it simply outputs the "message" cookie value to the console. It uses the ["next()"](https://nextjs.org/docs/app/api-reference/functions/next-response#next) function to continue routing:

```js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith('/setCookie')) {
    let cookieMessage = request.nextUrl.searchParams.get('message');
    response.cookies.set('message', cookieMessage);
  }

  if (request.nextUrl.pathname.startsWith('/getCookie')) {
    let cookie = request.cookies.get('message');
    console.log(cookie);
  }

  return response;
}
```

> **NOTE:** We can also manually set headers using `response.headers.set()`, ie:
>
> ```js
> response.headers.set('x-hello-from-middleware', 'hello');
> ```

### URL Rewrites

It may also be beneficial to map a specific path in Next.js to a different one, either temporarily (ie: during testing or development of a new bug fix / feature) or permanently depending on a condition such as the users language preference. This is possible using URL ["rewrites"](https://nextjs.org/docs/pages/api-reference/next-config-js/rewrites):

> Rewrites allow you to map an incoming request path to a different destination path.
>
> Rewrites act as a URL proxy and mask the destination path, making it appear the user hasn't changed their location on the site. In contrast, redirects will reroute to a new page and show the URL changes.

For example, the following code will check the "Accept-Language" header value for the existence of "fr". If it is found, the url will be "rewritten" to the "/fr/about" route. To the user, they will still be at "/about", but the page rendered will be from "/fr/about"

```js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  const language = requestHeaders.get('Accept-Language');

  if (language.includes('fr')) {
    return NextResponse.rewrite(new URL('/fr/about', request.url));
  }
}

export const config = {
  matcher: ['/about'],
};
```
