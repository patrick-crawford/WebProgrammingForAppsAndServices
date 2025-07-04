---
id: conditionally-displaying-data
title: Conditionally Displaying Data
sidebar_position: 3
description: Conditionally Displaying Data
---

# Conditionally Displaying Data

So far, we have seen how we can render a value in JSX by placing an expression within curly braces `{...}`. This expression is then evaluated and used in place within our JSX, either to:

- render the data in place, ie:

<!-- prettier-ignore-start -->
```jsx
{date.toLocaleTimeString()}
```
<!-- prettier-ignore-end -->

- provide a value to a property, ie:

```jsx
<img src={user.avatarUrl} />
```

However, we actually have a great deal of control over how the data is displayed using this syntax. Since the content between the curly braces `{...}` is an _expression_, we can use well known JavaScript syntax and functions to control our output.

Before we move on to the examples, let's assume that we have the following static collection of data hardcoded in the state of a component:

```js
const [users, setUsers] = useState([
  { user: 'fred', active: false, age: 40 },
  { user: 'pebbles', active: false, age: 1 },
  { user: 'barney', active: true, age: 36 },
]);
```

## Logical && Operator (If)

First, let's take a look at a situation where we may only want to render some data under a specific condition. For example, say we only want to show the 'user' name if the user is "active". To accomplish this, we can leverage the [&& Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND).

<!-- prettier-ignore-start -->
```jsx
return <div>{users[0].active && <p>{users[0].user} is Active!</p>}</div>
```
<!-- prettier-ignore-end -->

## Ternary Operator (If-Else)

Next, let's look at how we can use the [ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator), ie: `(age > 18) ? "adult" : "minor"` to render a different &lt;p&gt; element depending on whether or not the user is "active".

```jsx
return (
  <div>
    {users[0].active ? <p>{users[0].user} is Active!</p> : <p>{users[0].user} is Inactive!</p>}
  </div>
);
```

## Array.map() (Iteration)

One extremely common task is iterating over a collection and outputting each element using a consistent format. This could be rows in a table, items in a list, other components, etc. To achieve this within our JSX code, we can use the [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method, ie:

```jsx
return (
  <table>
    <thead>
      <tr>
        <th>User</th>
        <th>Active</th>
        <th>Age</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr>
          <td>{user.user}</td>
          <td>{user.active ? 'yes' : 'no'}</td>
          <td>{user.age}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
```

While this does work to render each user in its own &lt;tr&gt; element, we actually have one small problem. If you open the console in the browser, you will see an error: "Warning: Each child in a list should have a unique "key" prop." According to the documentation:

> Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity.

Normally, we would have a unique id to work with (ie "\_id" from MongoDB), however with our list we don't have any "stable" id's to work with. In this case, we can make use of the 2nd parameter to the "map()" method - the "index". This requires us to change our JSX to use the following code:

<!-- prettier-ignore-start -->
```jsx
{users.map((user, index) => (
  <tr key={index}>
    <td>{user.user}</td>
    <td>{user.active ? 'yes' : 'no'}</td>
    <td>{user.age}</td>
  </tr>
))}
```
<!-- prettier-ignore-end -->

## Returning Null

Finally, we can actually choose not to render anything by returning **_null_**, for example:

<!-- prettier-ignore-start -->
```jsx
if (!loading) {
  return <p>Done Loading! - TODO: Show the data here</p>
} else {
  return null; // don't render anything - still loading
}
```
<!-- prettier-ignore-end -->
