---
id: pre-built-libraries-solutions
title: Pre-Built Libraries / Solutions
sidebar_position: 3
description: Pre-Built Libraries / Solutions
---

# Pre-Built Libraries / Solutions

Before moving on to the next topic, we should quickly introduce two of the 3rd party ["authentication providers"](https://nextjs.org/docs/authentication#authentication-providers) suggested in the Next.js documentation:

## Iron-Session

From the ["Iron-Session" Documentation](https://github.com/vvo/iron-session#readme), this package is described as:

> Node.js stateless session utility using signed and encrypted cookies to store data. Works with Next.js, Express, NestJs, Fastify, and any Node.js HTTP framework.
>
> The session data is stored in encrypted cookies ("seals"). And only your server can decode the session data. There are no session ids, making iron sessions "stateless" from the server point of view.
>
> This strategy of storing session data is the same technique used by frameworks like **[Ruby On Rails](https://guides.rubyonrails.org/security.html#session-storage)** (their default strategy).
>
> The underlying cryptography library is [iron](https://hapi.dev/module/iron) which was [created by the lead developer of OAuth 2.0.](https://hueniversedotcom.wordpress.com/2015/09/19/auth-to-see-the-wizard-or-i-wrote-an-oauth-replacement/)

To get started using iron-session, you can use the next.js example from their [GitHub repository](https://github.com/vvo/iron-session/tree/main/examples).

### Example Code

If we open the "next.js" folder from within the "examples" folder from the above repository, we should see the code for a typical Next.js app including a "components" folder containing reusable components such as "Header", "Layout", etc., as well as a number of "page" and "API" routes under the "pages" folder. Additionally, you will find a "lib" folder containing files that help to define session options as well as [custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) used fetch user information, etc.

To get this example running, execute `npm install` to obtain the dependencies / rebuild the "node_modules" folder. You are then free to start the app using the familiar `npm run dev` command.

You will notice that this is a complete example and does not require any configuration. A "SECRET_COOKIE_PASSWORD" value has been placed in ".env.development" as well as ".env.production". However, it is stated:

> The SECRET_COOKIE_PASSWORD should never be inside your repository directly, it's here only to ease the example deployment. For local development, you should store it inside a `.env.local` gitignored file. See [https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables](https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables)

To "Login" all that is required is that you enter a _valid_ github username.

#### Exercise: Add a Protected Route

We will not go into detail about how to configure and/or modify this example. However, it would be valuable to see what is involved in creating an additional page that is "protected" (only accessible after logging in) and has access to the logged in user:

1. Create a new Page, ie "/pages/protectedTest.js"

2. Add the following Component Logic (used to display the user's login and avatar image)

<!-- prettier-ignore-start -->
```jsx
import Layout from "components/Layout";
import useUser from "lib/useUser";

export default function ProtectedTest() {
  const { user } = useUser({
    redirectTo: "/login",
  });

  return (
    <Layout>
      <h1>Protected Test</h1>
      {user && (
        <>
          <p><strong>User: </strong> {user.login}</p>
          <img src={user.avatarUrl || ""} alt="avatar" />
        </>
      )}
    </Layout>
  );
}
```
<!-- prettier-ignore-end -->

3. Add A link in the Header (components/Header.js)

<!--prettier-ignore-start -->
```jsx
{user?.isLoggedIn === true && (
  <li>
    <Link href="/protectedTest" legacyBehavior>
      <a>Protected Test</a>
    </Link>
  </li>
)}
```
<!-- prettier-ignore-end -->

Once you have added the above code, refresh the app to see the changes; "Protected Test" should only be accessible / visible in the Header once the user has logged in!

## NextAuth.js

The second example that we will discuss is "NextAuth.js", described by Next.js as "a full-featured authentication system with built-in providers (Google, Facebook, GitHub…), JWT, JWE, email/password, magic links and more". It has [extensive documentation](https://next-auth.js.org/), including video tutorials.

To begin working with NextAuth, you can once again use the Example Code from their [GitHub repository](https://github.com/nextauthjs/next-auth-example).

### Example Code

Once you have obtained the example code, you must once again execute the command `npm install` to rebuild the "node_modules" folder. Once this is complete, you can run the app with `npm run dev`.

Again, this is a complete example with a ton of code including 8 pages, API routes, custom components and configurations. It also makes use of the (now stable) [Middleware](https://nextjs.org/docs/advanced-features/middleware) functionality, as seen in the "middleware.ts" file.

You will also notice that there is a .tsconfig file, and the file extensions of components and other files containing code use the extensions ".tsx" and ".ts". This is because this particular Next.js app has been created using [the --ts flag](https://nextjs.org/docs/api-reference/create-next-app), ie: `npx create-next-app my-app --ts --use-npm` and uses [TypeScript](https://www.typescriptlang.org/).

If you attempt to run the app at this point, you will notice a page with a large heading reading **"NextAuth.js Example"** as well as links to various public and private routes such as "/client", "/server", "/protected", "/admin" etc. Most notably however, is a section at the top that states: "You are not signed in" next to a large blue button with the text "Sign in". If you click this button, you will be directed to "/api/auth/signin" and presented with various sign in options. Unfortunately, at the moment, none of them are functioning and will result in a warning: "Try signing in with a different account."

#### Enabling Authentication

As we have seen, there is currently no way of logging into the app, since none of the providers ("Facebook", "GitHub", "Google", etc.) have been configured.

To remedy this, let's create a GitHub Authentication Provider. This will allow users to log in using their GitHub credentials without having to explicitly create an account with our app:

- To begin, login to [GitHub](https://github.com/)

- Next, navigate to the ["Developer Settings"](https://github.com/settings/developers) - available under the user menu / settings / "Developer Settings"

- Click "OAuth Apps" in the sidebar

- Click the green "Register a new application" button

- At the next screen, fill in the available fields as:

  - **Application name:** Your application name - This can be anything you like.

  - **Homepage URL:** This is the full URL to the homepage of our app. Since we are still in development, we are going to use the full URL for our server running locally, ie: **http://localhost:3000**

  - **Authorization callback URL:** This is the URL that GitHub will redirect our users to after they have successfully logged in. It must be your homepage URL plus /api/auth/callback, ie: **http://localhost:3000/api/auth/callback**

- Once this is complete, click on "Register application"

- At the next page, copy your **"Client ID"** value (we will need this later) and click **"Generate a new client secret"** and **copy it immediately** (you won't be able to see it again)

  > **NOTE**: For more information on using OAuth with GitHub, see the [official GitHub documentation on "Building OAuth Apps"](https://docs.github.com/en/developers/apps/building-oauth-apps)

With your application registered, we can now add the client ID / Secret values to the configuration of our NextAuth demo app:

- Rename the file "env.local.example" to "env.local"

- Remove all environment variables except:

  - NEXTAUTH_URL
  - NEXTAUTH_SECRET
  - GITHUB_ID
  - GITHUB_SECRET

- Fill in the values of:

  - "GITHUB_ID" using your "Client ID" (from above)
  - "GITHUB_SECRET" using your "client secret" (from above)
  - "NEXTAUTH_SECRET" can be obtained by either using the command `openssl rand -hex 32` or visiting [https://generate-secret.now.sh/32](https://generate-secret.now.sh/32)

Once you have completed updating the environment variables in your new "env.local" file, you may try restarting the app and attempting to log in using your GitHub account (**NOTE:** If you are still logged in to GitHub in another tab, log out first, and try logging in using just the app)

#### Exercise: Add a Protected Route

With our NextAuth demo now functioning correctly using our GitHub OAuth provider, we can see what is involved in creating a "Protected" route:

1. Create a new Page, ie "/pages/protectedTest.tsx"

2. Add the following Component Logic (used to display the user's name and avatar image)

<!-- prettier-ignore-start -->
```jsx
import { useSession } from "next-auth/react"
import Layout from "../components/layout"
import AccessDenied from "../components/access-denied"

export default function ProtectedPage() {
  const { data: session, status } = useSession()
  
  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  // If session exists, display content
  return (
  <Layout>
      <h1>Protected Test</h1>
      {session.user && (
        <>
          <p><strong>User: </strong> {session.user.name}</p>
          <img src={session.user.image || ""} alt="avatar" />
        </>
      )}
    </Layout>
  );
}
```
<!-- prettier-ignore-end -->

3. Add a link in the Header (components/header.tsx)

```jsx
<li className={styles.navItem}>
  <Link href="/protectedTest" legacyBehavior>
    <a>Protected Test</a>
  </Link>
</li>
```

Once you have added the above code, refresh the app to see the changes; "Protected Test" should only be accessible once the user has logged in.
