---
id: react-components
title: Components
sidebar_position: 2
description: Components
---

# Components

Before we can start working with some of the more interesting features of Next.js, we must first learn some of the basics of React; specifically "Components" and "JSX":

So far, we have seen one important component: "Home" (defined in index.js):

<!-- prettier-ignore-start -->
```jsx
import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";

...

export default function Home() {
  return (
    <>
      <Head>
        ...
      </Head>
      <div className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}>
        <main className={styles.main}>
          ...
        </main>
        <footer className={styles.footer}>
          ...
        </footer>
      </div>
    </>
  );
}
```
<!-- prettier-ignore-end -->

This is known as a "functional component", since it's defined as a "function". The name of the function corresponds to the tag used to render the component, in this case &lt;Home /&gt;. This tag is said to be "self-closing", but we could also write the component in this form: &lt;Home&gt;&lt;/Home&gt;. This is not as common however, and it's unnecessary unless we wish to write a component that acts as a wrapper that renders other components.

Additionally, you will notice that our function is preceded by four import statements. In this case, they provide the following functionality:

- `import Head from 'next/head'` - This is the import statement for the "[&lt;Head&gt;...&lt;/Head&gt;](https://nextjs.org/docs/api-reference/next/head)" component. This is essentially a built-in component that Next.js provides to append elements, such as title and meta tags, to the &lt;head&gt; element in the document.

- `import Image from 'next/image'` - This is the import statement for the "[&lt;Image /&gt;](https://nextjs.org/docs/api-reference/next/image)" component. This component is described as: "an extension of the HTML &lt;img&gt; element, evolved for the modern web. It includes a variety of built-in performance optimizations to help you achieve good [Core Web Vitals](https://nextjs.org/learn/seo/web-performance)".

- `import { Geist, Geist_Mono } from "next/font/google"` - This is the import statement used to set up the Next.js [font optimization feature](https://nextjs.org/docs/basic-features/font-optimization) for the ["Geist"](https://fonts.google.com/specimen/Geist) and ["Geist Mono"](https://fonts.google.com/specimen/Geist+Mono) Google Fonts. For more information on font optimization in Next.js and how to use Google fonts, see ["Google Fonts"](https://nextjs.org/docs/basic-features/font-optimization#google-fonts) in the official documentation.

- `import styles from '@/styles/Home.module.css'` - This loads the "Home" CSS Module from our "styles" directory. If you inspect elements for this component in the browser, you will notice that may of the values in the "class" attributes have extra text, ie: "Home\_" followed by some random characters. This is the "CSS Module" functionality mentioned earlier, which is achieved by including the classes in the CSS Module using the following syntax:

  className=&#123;styles.**someClass**&#125;

  instead of simply:

  className="**someClass**"

Finally, you will notice the "export" statement: `export default` is stated before the function definition. This is required because our Home component exists in its own file (module).

## Creating our own Component

Now that we have seen what a basic component consists of, let's create our own component using the same pattern to explore the unique syntax and functionality that can be achieved using functional components.

Start by creating a new folder called "components" in the "my-app" directory. Next, within this folder, create a file called "Hello.js" (Our component will be named "Hello"). Inside the component, we will add everything required for a basic component that outputs (you guessed it: "Hello World"), ie:

<!-- prettier-ignore-start -->
```jsx
export default function Hello() {
  return <p>Hello World!</p>
}
```
<!-- prettier-ignore-end -->

To actually see this component working, we need to render it on the page somewhere. Since we really only have one route / page at the moment (ie: "Home", defined in "index.js"), let's place it there.

Before we do so however, we should first _wipe out_ most of the code for our "Home" component, leaving a "blank slate" for us to start fresh. Go ahead and wipe out all of the code within the "return" statement, as well as the "include" statements, leaving only:

```jsx
export default function Home() {
  return (

  )
}
```

Next, at the top of the file, add the following "import" statement:

```js
import Hello from '@/components/Hello';
```

Once that is complete, include the "Hello" component as the only item in the return statement:

```jsx
<Hello />
```

This should cause your index.js file to look like the following;

<!-- prettier-ignore-start -->
```jsx
import Hello from '@/components/Hello';

export default function Home() {
  return (
    <Hello />    
  )
}
```
<!-- prettier-ignore-end -->

Once you have saved everything, head back to your browser to see the changes - "Hello World!"

## Introducing JSX

With our &lt;Hello /&gt; component now displaying correctly within our "Home", let's discuss the strange syntax within the return value of "Home" and other components. It is responsible for how the component is rendered and looks like a String or HTML, but it is in fact, neither:

"It is called JSX, and it is a syntax extension to JavaScript. We recommend using it with React to describe what the UI should look like. JSX may remind you of a template language, but it comes with the full power of JavaScript".

### Returning a Single Element

Whenever we use JSX, we must ensure that whatever we return is wrapped in a _single element_. This is because part of the build process for our Next.js apps involves [Babel](https://babeljs.io/) transforming **JSX** into **function calls** using utilities from react/jsx-runtime. These functions take the component type, props, and children as arguments, ie:

<!-- prettier-ignore-start -->
```jsx
const element = <p className="greeting">Hello, world!</p>
```
<!-- prettier-ignore-end -->

becomes:

```js
import { jsx as _jsx } from 'react/jsx-runtime';
const element = _jsx('p', { className: 'greeting', children: 'Hello, world!' });
```

:::info
If you _do not_ wish to include a "wrapper" component (ie: a &lt;div&gt;...&lt;/div&gt;, &lt;span&gt;...&lt;/span&gt;, etc) you may instead use a "[JSX Fragment](https://react.dev/reference/react/Fragment)" (ie: &lt;&gt;...&lt;/&gt;), which will not create an extra node in the DOM.
:::

### Empty Elements

Also, When using JSX, there is no notion of an "[empty element](https://developer.mozilla.org/en-US/docs/Glossary/Empty_element)", so be careful when using tags like:

<!-- prettier-ignore-start -->
```html
<br>
```
<!-- prettier-ignore-end -->

as this will actually cause a problem and your component will not compile, due to the error **"JSX fragment has no corresponding closing tag."**. Instead, you must use the "self-closing" syntax, ie:

```html
<br />
```

### Embedding Expressions in JSX

In the example below, we declare a variable called name and then use it inside JSX by wrapping it in curly braces:

<!-- prettier-ignore-start -->
```jsx
export default function Hello() {
  const name = 'Josh Perez';
  return <p>Hello {name}!</p>
}
```
<!-- prettier-ignore-end -->

You can put any valid [JavaScript expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) inside the curly braces in JSX. For example, 2 + 2, user.firstName, or formatName(user) are all valid JavaScript expressions.

In the example below, we embed the result of calling a JavaScript function, formatName(user), into a &lt;p&gt; element.

<!-- prettier-ignore-start -->
```jsx
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

export default function Hello() {
  const user = {
    firstName: 'Harper',
    lastName: 'Perez',
  };

  return (
    <p>
      Hello, {formatName(user)}!
    </p>
  );
}
```
<!-- prettier-ignore-end -->

We often split JSX over multiple lines for readability (as above). While it isn’t required, when doing this, we also recommend wrapping it in parentheses to avoid the pitfalls of [automatic semicolon insertion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#automatic_semicolon_insertion).

### JSX is an Expression Too

After compilation, JSX expressions become regular JavaScript function calls and evaluate to JavaScript objects.

This means that you can use JSX inside of if statements and for loops, assign it to variables, accept it as arguments, and return it from functions:

<!-- prettier-ignore-start -->
```jsx
function getGreeting(user) {
  if (user) {
    return <p>Hello, {formatName(user)}!</p>
  }
  return <p>Hello, Stranger.</p>
}
```
<!-- prettier-ignore-end -->

### Specifying Attributes with JSX

You may use quotes to specify string literals as attributes:

<!-- prettier-ignore-start -->
```jsx
const element = <div tabIndex="0"></div>
```
<!-- prettier-ignore-end -->

You may also use curly braces to embed a JavaScript expression in an attribute:

<!-- prettier-ignore-start -->
```jsx
const element = <img src={user.avatarUrl} />
```
<!-- prettier-ignore-end -->

Don’t put quotes around curly braces when embedding a JavaScript expression in an attribute. You should either use quotes (for string values) or curly braces (for expressions), but _not both_ in the same attribute.

**Warning**:

Since JSX is closer to JavaScript than to HTML, React DOM uses camelCase property naming convention instead of HTML attribute names.

For example, class becomes [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) in JSX, and tabindex becomes [tabIndex](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex).

## Accepting "Props"

Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.

For example, we can extend our "Hello" component to accept one or more "props" by including the "props" parameter to our function definition and accessing each named "prop" as an attribute using the same name, ie:

```jsx
export default function Hello(props) {
  return (
    <p>
      Hello {props.fName} {props.lName}!
    </p>
  );
}
```

will allow us to provide "fName" and "lName" values to the component using the straightforward syntax:

```jsx
<Hello fName="Jason" lName="Perez" />
```

> **NOTE**: If we wish to have _default_ values for props (in this case: **fName** and **lName**), we can update the function definition to use object destructuring with [default values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#default_value):

```jsx
export default function Hello({ fName = 'First Name', lName = 'Last Name' }) {
  // NOTE: props will be accessed using fName and lName instead of props.fName and props.lName
}
```

## Introducing "Hooks".

As of version 16.8, React has introduced a feature known as "hooks". Using this syntax will open up some new, interesting possibilities to our functional components, including working with the "[state](https://react.dev/learn/state-a-components-memory#adding-a-state-variable)" as well as performing "[side effects](https://react.dev/learn/synchronizing-with-effects)" during the lifetime of the component (ie: "Data fetching, setting up a subscription, and manually changing the DOM in React components").

Basically, by using certain built-in "hooks" (functions), React components are able to store and manage data internally to the component (ie, its "state" values). When this data changes, a refresh (render) of the component will occur and the user interface will be updated. This allows us to create components that work with data internally that changes over time.

To actually see this in action, let's create a new component called **Clock**:

First, create a new file in "components" called "Clock.js". Once this is done, add the following code:

```jsx
import { useState, useEffect } from 'react';

export default function Clock(props) {
  return (
    <p>
      Locale: {props.locale}: <mark>TODO: Render Locale-Dependant Clock Here</mark>
    </p>
  );
}
```

So far, this looks very similar to our "Hello" component above; it is defined as a function that accepts props and it returns some JSX to be rendered. However, there is one key difference: we have imported both the **[useState](https://react.dev/reference/react/useState)** and the **[useEffect](https://react.dev/reference/react/useEffect)** hooks from 'react'. Soon, we will use these functions within our component.

For now, let's just add the Clock component to our Home so that we can see what it outputs:

Open the **index.js** file and add the following "import" statement:

```js
import Clock from '@/components/Clock';
```

Next, include the "Clock" component _beneath_ the &lt;Hello /&gt; tag using its associated "self-closing" tag, as well as some code to include the locale as its only "prop":

```jsx
<Clock locale="en-CA" />
```

Currently, we should see the locale next to some highlighted text stating "TODO: Render Locale-Dependant Clock Here".

### Adding "state"

As mentioned above, the "state" of a component is a way to store data within the component (ie: the "date" data for our clock) that is synchronized with the UI of the component. This is a very powerful concept and one of the core ideas behind designing apps using components.

For our example, let's add a "state" value to our &lt;Clock /&gt; component, so that we can keep the UI of the component in sync with the current time. In this way, we can say that each &lt;Clock /&gt; component keeps track of its own internal Date value. It will also be responsible for updating its UI every second to reflect changes in this data.

Here is where we will use our first hook: **useState()**. In the first line of your "Clock" function, add the line:

```jsx
const [date, setDate] = useState(null); // Note: Never set this to unknown data obtained at run time (ie: new Date(), a random number, etc.) - see: https://nextjs.org/docs/messages/react-hydration-error
```

Here, we can see that "useState" is a function, which:

- Accepts a parameter that allows us to set the _initial value_ of a "state" variable
- Returns an array consisting two values: the "state" variable itself and a **function to update it**. We use a _[destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)_ to assign each of those values to a pair of constant variables - in this case: "date" and "setDate". In the above case, this is _shorthand_ for:

  ```jsx
  const dateState = useState(null);
  const date = dateState[0];
  const setDate = dateState[1];
  ```

  We use the "const" keyword here since we **must** use the "setDate" function to modify the state value "date" - we cannot modify "date" directly. By invoking the "setDate" method (ie: "setDate(**_New Date Value_**)"), we not only update the value of "date", but also trigger our component to re-render!

Now, let's add some code to attempt to render the "date" value within our component. Here, we will be using the [toLocaleTimeString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString) function, ie:

<!-- prettier-ignore-start -->
```jsx
return (
  <p>Locale: {props.locale}: {date.toLocaleTimeString(props.locale)} </p>
);
```
<!-- prettier-ignore-end -->

However, if we refresh the page now, we should see an error since at this point since "date" is currently **null**, ie:

```js
TypeError: Cannot read properties of null (reading 'toLocaleTimeString')
```

For the mean time (until we have a real date object that we can use), we can avoid this error by using the [Optional Chaining Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) on our date object, ie:

<!-- prettier-ignore-start -->
```jsx
{date?.toLocaleTimeString(props.locale)}
```
<!-- prettier-ignore-end -->

### Quick Note: "state" vs. "props"

While "state" &amp; "props" both hold information that can be used to influence the output of the rendered component, they are different in one important way: props get _passed to_ the component whereas state is managed _within_ the component.

One interesting thing to note about "props" is that we can pass anything as a property, including functions! This can be very helpful if we wish to send a message from a "child" component to a "parent" component. For example, if we define a function (ie: handleMessage(msg)) in the "Parent" component, we can pass it in to the "Child" component using a custom property, ie "sendMessage"). Whenever the child wishes to send a message back to the parent, it can invoke the callback function from "props" and pass the data:

**Parent Component**

<!-- prettier-ignore-start -->
```jsx
function handleMessage(msg) {
  console.log(`Child Says: ${msg}`);
}
return <Child sendMessage={handleMessage} />
```
<!-- prettier-ignore-end -->

**Child Component**

```js
props.sendMessage('Hello');
```

### Updating the &lt;Clock /&gt; Component using the "useEffect" Hook

At the moment, our &lt;Clock /&gt; component has a "date" value in the state, but it's currently set to "null" so we are unable to see any values output in the browser. If we cannot set a new date value as the the _initial value_ of the "state" variable (potentially causing a "[Hydration Error](https://nextjs.org/docs/messages/react-hydration-error)" in this case), where do we initialize it?

This is where the **[useEffect](https://react.dev/reference/react/useEffect)** Hook comes into play. This hook allows us to provide a function that _only executes_ under certain conditions, for example when the component is "first rendered". To see this in action, place the following code above your return statement in the "Clock" function:

```jsx
useEffect(() => {
  setDate(new Date());
}, []);
```

Here, you will notice that the **useEffect** hook actually accepts two parameters: a callback function and an array of "dependencies". The callback function is simply the code to be executed once the component is first "mounted" and rendered, while the dependency array is a list of variables that, when changed, will cause the effect to execute again. Since we only want this effect to execute **once**, we can provide an empty array.

Now if we refresh the page, we should see a clock value showing the current time!

However, if we wish our &lt;Clock /&gt; component to function as a proper clock and update the UI every second, we must add some additional logic. As expected, this will involve the [setInterval()](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals#setInterval) function to update the date value every second. To achieve this functionality, update the code in your useEffect hook to set a new date once every second, ie:

```jsx
useEffect(() => {
  setDate(new Date());
  // update the date once every second
  const timerID = setInterval(() => {
    setDate(new Date());
  }, 1000);
}, []);
```

:::caution
If the new value of your state variable depends on the previous value, consider using an "updater function". For more information, see: [Updating state based on the previous state](https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state) / [Is using an updater always preferred?](https://react.dev/reference/react/useState#is-using-an-updater-always-preferred)
:::

<br />

**When / How to Stop the interval?**

At the moment, our code has no mechanism to **stop** the interval using [clearInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval) when it is no longer needed. This would be part of a clean-up process and should execute when the component is "unmounted" or removed from the DOM.

Fortunately, we can handle this situation within the **return value** of the callback function provided to **useEffect**, ie:

```jsx
useEffect(() => {
  setDate(new Date());
  // update the date once every second
  const timerID = setInterval(() => {
    setDate(new Date());
  }, 1000);
  return () => {
    // clean up the effect
    clearInterval(timerID);
  };
}, []);
```
