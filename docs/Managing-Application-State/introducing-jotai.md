---
id: introducing-jotai
title: Introducing Jotai
sidebar_position: 2
description: Introducing Jotai
---

# Introducing Jotai

As we have seen, there are a number of popular 3rd party state management solutions for React. However, for our purposes we will be going with the relatively new "Jotai", for its simplicity, efficiency and support for Next.js. It also makes use of Typescript, which is excellent, but not currently necessary for our implementations going forward.

From the [Jotai Documentation](https://jotai.org/docs/basics/concepts):

> Jotai was born to solve extra re-render issues in React. An extra re-render is when the render process produces the same UI result, where users won't see any differences.
>
> To tackle this issue with React context (useContext + useState), one would require many contexts and face some issues.
>
> - Provider hell: It's likely that your root component has many context providers, which is technically okay, and sometimes desirable to provide context in different subtree.
> - Dynamic addition/deletion: Adding a new context at runtime is not very nice, because you need to add a new provider and its children will be re-mounted.
>   Traditionally, a top-down solution to this is to use a selector interface. The [use-context-selector](https://github.com/dai-shi/use-context-selector) library is one example. The issue with this approach is the selector function needs to return referentially equal values to prevent re-renders, and this often requires a memoization technique.
>
> Jotai takes a bottom-up approach with the atomic model, inspired by [Recoil](https://recoiljs.org/). One can build state combining atoms, and optimize renders based on atom dependency. This avoids the need for memoization.
>
> Jotai has two principles.
>
> - Primitive: Its basic interface is simple, like useState.
> - Flexible: Derived atoms can combine other atoms and enable useReducer style with side effects.
>   Jotai's core API is minimalistic and makes it easy to build utilities based upon it.

As you can see from the main concepts outlined above, Jotai was inspired by [Recoil](https://recoiljs.org/) (an experimental library created by Dave McCabe, a Software Engineer at Facebook) and was designed to solve some of the problems such as "provider hell" and unnecessary re-renders that we discussed when reviewing "Prop Drilling" and "Context" in the previous section. This makes it a perfect alternative for us to use.

## Getting Started

To begin working with Jotai, all we need to do is install it using npm, ie:

```
npm i jotai
```

## Defining Application Level State

In Jotai, state values are defined as "atoms", essentially units of state that are both updatable and subscribable. When an atom is updated, any subscribed component will be re-rendered with the new value. This makes working with atoms very familiar, as the syntax and behaviour very closely resembles working with local state in components using the ["useState"](https://react.dev/reference/react/useState) hook.

To define atoms in Next.js, we will place them in a separate file, ie: "store.js". Since each atom represents a different unit of state, we can define as many as we wish in this file, ie:

**File:** "my-app/store.js"

<!-- prettier-ignore-start -->
```jsx
import { atom } from 'jotai';

export const countAtom = atom(0);
export const countryAtom = atom('Japan');
export const citiesAtom = atom(['Tokyo', 'Kyoto', 'Osaka']);
export const mangaAtom = atom({ 'Dragon Ball': 1984, 'One Piece': 1997, 'Naruto': 1999 });
```
<!-- prettier-ignore-end -->

Here, we have defined 4 atoms with varying default values from numbers, strings, arrays and objects. Each of these atoms can be directly referenced from any component in the tree and may be used just like "useState" (see below).

### Async Default Values

There may be situations where you cannot hard-code default values into your atoms and instead must fetch them from an API, file, etc. To accommodate this, Jotai allows atoms to be defined using an ["async function"](https://jotai.org/docs/guides/async), ie:

<!-- prettier-ignore-start -->
```js
export const postAtom = atom((async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const data = await res.json();

  return data;
})());
```
<!-- prettier-ignore-end -->

## Reading / Writing State

To use any of the atoms defined in our "store.js" file, we must import both the ["useAtom"](https://jotai.org/docs/basics/primitives#use-atom) function (from 'jotai') as well as the specific atom that we wish to read from / write to. For example, if we wish to reference the "countryAtom" (defined above with a default value of "Japan"), we can use the following code:

<!-- prettier-ignore-start -->
```jsx
import { useAtom } from 'jotai';
import { countryAtom } from '@/store';

export default function Country() {
  const [country, setCountry] = useAtom(countryAtom);

  return <>Country: {country}</>
}
```
<!-- prettier-ignore-end -->

Notice how ["useAtom"](https://jotai.org/docs/basics/primitives#use-atom) functions in a very similar way to ["useState"](https://react.dev/reference/react/useState). We can access the state directly from the atom and when it's updated (using "setCountry", in this case) any other components rendering the value from the countryAtom will also get updated.

## "Component Tree" Example

Now that we understand how state management works in Jotai, let's update our "Component Tree" example from the previous section to use it.

> **NOTE:** we do _not_ need to modify the file "/pages/\_app.js" as in previous examples. Instead we will create a new file: "store.js".

**File:** "my-app/store.js"

```jsx
import { atom } from 'jotai';

export const countAtom = atom(0);
```

**File:** "/components/Component3.js"

<!-- prettier-ignore-start -->
```jsx
import { useAtom } from 'jotai';
import { countAtom } from '@/store';

export default function Component3() {
  const [count, setCount] = useAtom(countAtom);
  return <>Value: {count}</>
}
```
<!-- prettier-ignore-end -->

**File:** "/components/ComponentC.js"

<!-- prettier-ignore-start -->
```jsx
import { useAtom } from 'jotai';
import { countAtom } from '@/store';

export default function ComponentC() {
  const [count, setCount] = useAtom(countAtom);
  return <button onClick={(e) => setCount(count + 1)}>Increase Value</button>
}
```
<!-- prettier-ignore-end -->

As you can see, we only had to create / modify 3 files:

- **store.js**: Defines our atoms (global state with optional default values)
- **component3.js**: The component using the atom to display its value
- **componentC.js**: The component using the atom to modify its value

This is much cleaner than our previous approaches, with the added bonus of having the syntax feel very familiar. Additionally, our application / site no longer suffers from the performance hit caused by re-rendering all of the components in the tree; only "Component3" and "ComponentC" are re-rendered when the state changes.

For more information including handling special cases, etc. please reference the ["official Jotai documentation"](https://jotai.org/).
