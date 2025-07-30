---
id: handling-user-events
title: Handling User Events
sidebar_position: 1
description: Handling User Events
---

# Handling User Events

:::info
Some of the below code examples and explanations have been reproduced from sections of the [official online documentation](https://react.dev/) for React.
:::

Handling events in React is very similar to handling events on DOM elements using properties like [onclick](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick). However, there are some differences, ie:

- React events are named using camelCase, rather than lowercase.
- With JSX you pass a function as the event handler, rather than a string.

For example, the HTML:

```html
<button onclick="processClick()">Click Me!</button>
```

is slightly different in React:

```jsx
<button onClick={processClick}>Click me!</button>
```

To see this in action, let's code a simple "click counter" component that renders a single button that shows a number that increases by one (1) every time it's clicked. To achieve this, we'll create a new component called "ClickCounter":

<!-- prettier-ignore-start -->
```jsx
import { useState } from 'react';

export default function ClickCounter(props) {
  const [numClicks, setNumClicks] = useState(0);

  function increaseNumClicks(e) { // 'e' is the current event object
    setNumClicks(numClicks + 1);
  }

  return <button onClick={increaseNumClicks}>Clicks: {numClicks}</button>
}
```
<!-- prettier-ignore-end -->

> **NOTE**: Be careful when updating state based on a previous value (ie: numClicks + 1 in the example above), as it may not always work as expected on types that are not [primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive), ie: "string", "number", "boolean", etc. For example, if we use the same logic to add an element to a state value holding an _array_, we may be tempted to use the following code:
>
> ```js
> setMyArray(myArray.push('new element'));
> ```
>
> However, updating state in this manner **will not** cause the component to re-render. Instead, we must provide a **new array**, ie:
>
> ```js
> setMyArray([...myArray, 'new element']);
> ```
>
> For more information see: [Updating arrays in state](https://react.dev/learn/adding-interactivity#updating-arrays-in-state) and [Updating objects in state](https://react.dev/learn/adding-interactivity#updating-objects-in-state)

Here, you will notice that we have added a couple new concepts to the construction and rendering of a typical functional component, ie:

- We have declared a function to handle the event. It receives a single parameter 'e' which is a "[synthetic event](https://react.dev/reference/react-dom/components/common#react-event-object)" - "a cross-browser wrapper around the browser’s native event. It has the same interface as the browser’s native event, including _stopPropagation()_ and _preventDefault()_, except the events work identically across all browsers."

- On our button element, we use "onClick" (instead of "onclick") to reference the event handler and "wire up" the event.

:::info
For a full list events please refer to the official documentation for [supported events](https://react.dev/reference/react-dom/components/common).
:::

## Adding Parameters

As you can see from the above example, our callback function "increaseNumClicks" is registered to the onClick event by _passing the function only_ - the function is not actually _invoked_ anywhere in our JSX. This works fine, but what if we wish to pass one or more parameters to the function, in addition to the SyntheticEvent (above)?

This can actually be achieved by registering the event as an anonymous function declared within the JSX, which _invokes_ the callback function. For example:

<!-- prettier-ignore-start -->
```jsx
function increaseNumClicks(e, message) { // 'e' is the current event object
  console.log(message);
  setNumClicks(numClicks + 1);
}

return <button onClick={(e) => { increaseNumClicks(e, "Hello") }}>Clicks: {numClicks}</button>
```
<!-- prettier-ignore-end -->

Here, we declare the callback function in place. It accepts a single parameter "e" as before, but the body of the function _invokes_ the callback function. This allows us to continue to pass the SyntheticEvent (e) to our event handler "increaseNumClicks" as well as add any other parameter values.
