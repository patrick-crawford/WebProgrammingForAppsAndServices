---
id: shared-state-props-context
title: Shared State with Props and Context
sidebar_position: 1
description: Shared State with Props and Context
---

# Shared State with Props & Context

So far, we have discussed ["Component State"](https://react.dev/learn/state-a-components-memory), ie: managing data / values that are associated with a specific _component_. These values can change over time and when this happens, the component is re-rendered to reflect the updated "state" data. It is this feature that allows us to crate dynamic components that change over time, such as our original "clock" example.

However, there are many circumstances in which the notion of "state" extends beyond an individual component. Consider a typical e-commerce site that allows users to pick and choose products to add to a "cart". Once the user is ready, they can modify the cart and / or purchase the items. In this situation, the concept of the "cart" and the items it contains must be shared by more than one component. This is because the navbar may show how many items are in the cart, or specific products may show an "added to cart" message. Additionally, the button to actually add an item to a cart would exist in a separate component from the list of items in the cart.

Essentially, what we would like to do is have the notion of an "application level" state to for the "cart" that may be used by one or more components in the "component tree" (the components used in your application / site, leading all the way back to a single component).

## Prop Drilling

Using what we know so far, there is a way to implement the concept of an application level state in our application / site. What we must do, is declare the state in a top-level component and pass it down from component to component via "props", so that it may be accessed by the nested component that requires it. This is informally known as "prop drilling", since we're "drilling" through multiple components via "props" to deliver the state to the nested component. For example, consider the following tree of components:
<br />

![Component Tree](/img/component-tree.png)

<br />

In this case, both "ComponentA" and "Component1" are rendered by the "Home" component. "ComponentA" renders "ComponentB", which renders "ComponentC" and likewise, "Component1" renders "Component2", which renders "Component3".

Now, say there's a button on "ComponentC" that increments a counter value by 1. We have seen this before when introducing "user events" with "onClick". However, the difference here is that the component _responsible for displaying_ the counter value as it increases is actually "Component3", **not** "ComponentC", where the button is rendered.

To solve this, we do not declare the "count" state in "ComponentC" with the button, but instead declare it in a _top level_ component.

You will recall from the discussion on "Layouts & Pages" that Next.js actually has a [high-level component](https://nextjs.org/docs/advanced-features/custom-app) declared in "pages/\_app.js" - this is where we placed our &lt;layout&gt;...&lt;/layout&gt; component so that it will be available on all pages. This is also where we will declare our counter state and pass it to page components via props, ie:

**File:** "/pages/\_app.js"

<!-- prettier-ignore-start -->
```jsx
import '@/styles/globals.css';
import { useState } from 'react';

export default function App({ Component, pageProps }) {
  const [count, setCount] = useState(0); // declare high-level "count" state
  return <Component {...pageProps} count={count} setCount={setCount} /> // pass it as props to the page components
}
```
<!-- prettier-ignore-end -->

Here, we declare the state in "App" and ensure that it can be accessed by passing the values as props "count" and "setCount", respectfully.

Now, in the "Home" component when we render "ComponentA" and "Component1", we will continue to pass the props so that "ComponentB" and "Component2" have access, and so on. We are passing ("drilling") the state through every component via "props" until it reaches a component that requires it.

**File:** "/pages/index.js"

```jsx
<Component1 count={props.count} />
<ComponentA setCount={props.setCount} />
```

The "Home" component (declared in "index.js") simply passes the "count" and "setCount" properties to the appropriate components, so that in addition to rendering "Component2", "Component1" takes the "count" prop and passes it on, until it can be used by "Component3". The same is true for "ComponentA", however it takes the "setCount" prop and passes it on, until it can be used by "ComponentC".

Let's skip ahead and look at the final components; "ComponentC" and "Component3" to see how they make use of the "count" and "setCount" props that have been passed down to them:

**File:** "/components/Component3.js"

<!-- prettier-ignore-start -->
```jsx
export default function Component3(props) {
  return <>Value: {props.count}</>
}
```
<!-- prettier-ignore-end -->

**File:** "/components/ComponentC.js"

<!-- prettier-ignore-start -->
```jsx
export default function ComponentC(props) {
  return <button onClick={(e) => props.setCount(n => n + 1)}>Increase Value</button>
}
```
<!-- prettier-ignore-end -->

> **NOTE**: If the new state is computed using the previous state, you can [pass a function to setState](https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state), which receives the previous value.

As you can see, "count" and "setCount" can be accessed directly from the "props" object, since it has been passed down from component to component.

### Problems with Prop Drilling

Depending on the complexity of the layout / application, "prop drilling" can add extra properties to components that do not actually need them; the only reason they were passed the props, is to hand them off to their child components. This makes components harder to reuse and adds an extra dependency between components that we would like to avoid. This can also get very cumbersome if we have many application level state values to manage.

Additionally, there is an impact on performance when using this method of passing state from component to component. Every time the state is accessed / changed in a child component, **every** parent component in the "prop" chain (ie: "Home", "Component1", "Component2", "Component3", "ComponentA", "ComponentB", "ComponentC") **also** gets rendered.

## Context

As we have seen, our first approach to solving "application level" state works, but causes organizational and performance problems with our application / site. It is for these reasons that as of React 16, ["Context"](https://react.dev/learn/passing-data-deeply-with-context) was introduced:

> "In a typical React application, data is passed top-down (parent to child) via props, but such usage can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree."

This is certainly an improvement to "prop drilling", so let's implement it in our scenario above. As before, we will declare a "count" state in App, but instead of passing various "props" we will instead create ["Context"](https://react.dev/learn/passing-data-deeply-with-context#step-1-create-the-context) objects and wrap our `<Component {...pageProps} />` with ["Provider"](https://react.dev/learn/passing-data-deeply-with-context#step-3-provide-the-context) components:

**File:** "/pages/\_app.js"

```jsx
import '@/styles/globals.css';
import { useState, createContext } from 'react';

export const CountContext = createContext();
export const SetCountContext = createContext();

export default function App({ Component, pageProps }) {
  const [count, setCount] = useState(0);

  return (
    <>
      <CountContext.Provider value={count}>
        <SetCountContext.Provider value={setCount}>
          <Component {...pageProps} />
        </SetCountContext.Provider>
      </CountContext.Provider>
    </>
  );
}
```

Notice how we create and export a new "Context" object for every value that we wish to make "global" to our application (ie: accessible by deeply nested components, such as "Component3" and "ComponentC"). We then wrap our `<Component {...pageProps} />` with the associated "Provider" components with a "value" prop, to make the context values available to child components (pages).

This eliminates the need for "prop drilling", so we do not need to update any components _except_ the components that must make use of the context, ie: "Component3" and "ComponentC":

**File:** "/components/Component3.js"

<!-- prettier-ignore-start -->
```jsx
import { useContext } from 'react';
import { CountContext } from '@/pages/_app';

export default function Component3() {
  const count = useContext(CountContext);
  return <>Value: {count}</>
}
```
<!-- prettier-ignore-end -->

**File:** "/components/ComponentC.js"

<!-- prettier-ignore-start -->
```jsx
import { useContext } from 'react';
import { SetCountContext } from '@/pages/_app';

export default function ComponentC() {
  const setCount = useContext(SetCountContext);
  return <button onClick={(e) => setCount(n => n + 1)}>Increase Value</button>;
}
```
<!-- prettier-ignore-end -->

For both functions, we must import "useContext" from 'react', as well as the specific "Context" object that is required by the component, ie: "CountContext" or "SetCountContext". We invoke the "useContext" function with a specific "Context" object to retrieve the value from the "Provider" component (included in "App"), which can then be used within our component.

### Problems with Context

Unfortunately, while this does avoid the need to pass props through unrelated components ("prop drilling"), it still suffers from some organizational and performance issues. For example, what happens when the "application state" gets complicated, causing the providers to build up? This can result in what is known as "provider hell", ie:

```jsx
<AContext.Provider value={"A"}>
  <BContext.Provider value={"B"}>
    <CContext.Provider value={"C"}>
      <DContext.Provider value={"D"}>
        <EContext.Provider value={"E"}>
          <Component {...pageProps} />
        </AContext.Provider>
      </BContext.Provider>
    </CContext.Provider>
  </DContext.Provider>
</EContext.Provider>
```

Additionally, the same performance problem exists, ie: every time the state is accessed / changed in a child component using context, **every** parent component back to the "Provider" (ie: "Home", "Component1", "Component2", "Component3", "ComponentA", "ComponentB", "ComponentC") **also** gets rendered.

## Alternatives

If neither of the above built-in strategies work for your specific application, don't worry; there exist **many** 3rd party alternatives. Some of the more popular state management libraries include:

- **[Redux](https://redux.js.org/) / [Redux Toolkit](https://redux-toolkit.js.org/):** "The official, opinionated, batteries-included toolset for efficient Redux development. Includes utilities to simplify common use cases like store setup, creating reducers, immutable update logic, and more."

- **[Recoil](https://recoiljs.org/):** "A state management library for React. Recoil works and thinks like React. Add some to your app and get fast and flexible shared state."

- **[Jotai](https://jotai.org/):** "Jotai takes a bottom-up approach to React state management with an atomic model inspired by Recoil. One can build state by combining atoms and renders are optimized based on atom dependency. This solves the extra re-render issue of React context and eliminates the need for the memoization technique."

- **[Zustand](https://docs.pmnd.rs/zustand):** "A small, fast and scalable bearbones state-management solution. Has a comfy api based on hooks, isn't boilerplatey or opinionated, but still just enough to be explicit and flux-like."

- **[MobX](https://mobx.js.org/):** "MobX is a battle tested library that makes state management simple and scalable by transparently applying functional reactive programming (TFRP)."

- **[HookState](https://hookstate.js.org/):** "The most straightforward, extensible and incredibly fast state management that is based on React state hook"
