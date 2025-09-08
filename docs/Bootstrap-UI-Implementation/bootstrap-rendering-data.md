---
id: bootstrap-rendering-data
title: Rendering Data
sidebar_position: 2
description: Rendering Data
---

# Rendering Data

Now that we have seen a sampling of what Bootstrap has to offer, let's use what we have learned to build a user interface to explore the data from a popular test API: [&#123;JSON&#125; Placeholder](https://jsonplaceholder.typicode.com/). This will involve utilizing the ["Fetch" API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to make AJAX requests, using native DOM methods to wire up user events and ES6 techniques such as [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) to format the data and generate HTML.

## Dependencies

Before we obtain the data and attempt to render it in the browser, we should first include any dependencies that are required. To begin, we will start with an HTML5 skeleton that includes Bootstrap 5.1

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Bootstrap 5.1 CSS-->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />

    <!-- Bootstrap 5.1 JS Bundle -->
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
      crossorigin="anonymous"
    ></script>

    <title>Bootstrap Practice</title>
  </head>

  <body></body>
</html>
```

## The Data

Next, it is a good idea to examine the data that we will be rendering on the page before using any other boilerplate code. For our purposes we will use the [posts collection](https://jsonplaceholder.typicode.com/posts). This dataset provides the following functionality that we can use in our user interface:

- [https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts) - This is a full list of "Posts" using the format:

```json
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
```

- [https://jsonplaceholder.typicode.com/posts?userId=3](https://jsonplaceholder.typicode.com/posts?userId=3) - This is the same list filtered by "userID" (in this case userId=3)

- [https://jsonplaceholder.typicode.com/posts/1](https://jsonplaceholder.typicode.com/posts/1) - This is the same list, filtered by "id" (in this case id=1)

- [https://jsonplaceholder.typicode.com/comments?postId=1](https://jsonplaceholder.typicode.com/comments?postId=1) - Here, we have all the comments for a given post (in this case postId=1) using the format:

```json
{
  "postId": 1,
  "id": 1,
  "name": "id labore ex et quam laborum",
  "email": "Eliseo@gardner.biz",
  "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
}
```

## UI Elements

With the dependencies in place and the structure ("shape") of the data known, we can begin to create the UI elements for our application.

### Navbar

The best place to begin is with the navigation bar (navbar). Since it is possible to filter our data by "userId" let's create a navbar that also has a "search" bar:

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Posts Dataset</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      <form class="d-flex" id="searchForm">
        <input
          class="form-control me-2"
          type="search"
          placeholder="User ID (Number)"
          id="userId"
          aria-label="Search"
        />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
```

Here, we have only included the "navbar-brand", "navbar-toggler" / "collapse" and "form" elements. The form has been given an id of "searchForm" and the "collapse" &lt;div&gt; has been given an additional class ["justify-content-end"](https://getbootstrap.com/docs/5.1/utilities/flex/#justify-content) to ensure that the search bar appears on the right of the navigation bar.

### Main Container & Data Table

The primary display for our data will be in a table format. This will display all "posts" by including their "userId", "title" and "body" attributes, ie:

```html
<div class="container">
  <div class="row">
    <div class="col">
      <table class="table table-hover" id="postsTable">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  </div>
</div>
```

Notice how we have included a regular table with the classes "table" and "table-hover" as well as the id "postsTable". This is where we will eventually render all of our "Posts" data from the API.

### Modal Window

Finally, we will include a "modal" window to show a specific post as well as the related comments. This window will be shown once a user clicks on a specific row of the table. For now, we will simply include the "skeleton" and update the contents on demand later:

```html
<div class="modal fade" tabindex="-1" id="commentsModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Comments</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body"></div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
```

Here, we have given the "modal" an id of "commentsModal" as well as omitted the "modal-body" content. Lastly, since the user will not be entering any data, we have also omitted the "Save Changes" button

## The JavaScript

The next step in the development effort is to start working with JavaScript to obtain and render the data to the table as well as make the table searchable and interactive. For this example, we will place our JavaScript logic within a &lt;script&gt; element on the same HTML page as the rest of the example, rather than using an external .js file:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Bootstrap 5.1 CSS-->
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossorigin="anonymous"
  />

  <!-- Bootstrap 5.1 JS Bundle -->
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
    crossorigin="anonymous"
  ></script>

  <script>
    // Custom JS - included beneath Bootstrap
  </script>

  <title>Bootstrap Practice</title>
</head>
```

### Fetching and Rendering the Data

The first step here is to write a function that will actually pull the data from the API. This will be done using ["fetch()"](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), in it's simplest form, ie:

```js
function populatePostsTable(userId = null) {
  let url = +userId // attempt to convert userId to a number
    ? `https://jsonplaceholder.typicode.com/posts?userId=${+userId}`
    : `https://jsonplaceholder.typicode.com/posts`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
```

For this function we have included a single parameter "userId", which is set to a default value of _null_. This is because the URL that we fetch our data from will change depending on whether or not we have a numeric "userId" value. Also, we are not yet generating any HTML or updating the DOM - this is purely a test to ensure that the function works as expected.

Next, since we wish the table to show the data once the page is first loaded, we must execute this function when the "DOM is Ready" - if you are familiar with jQuery, this would be the `$(function(){ ... })` function. However, since we have removed the dependency on jQuery, we can use the following code instead:

```js
// Execute when the DOM is 'ready'
document.addEventListener('DOMContentLoaded', function () {
  populatePostsTable();
  populatePostsTable(4); // test with User ID 4 (to be removed after testing)
});
```

:::info
When loading an external JavaScript file (only), the ["defer"](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script#defer) attribute may be used on the &lt;script&gt; element to achieve the same result, ie:

```html
<script src="script.js" defer></script>
```

:::

#### Generating HTML

Once we are confident that our "populatePostsTable" is functioning as expected, the next step is to take the returned data, ie:

```json
[
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  }
]
```

and transform it into HTML to be included in the DOM, ie:

```html
<tr data-id="1">
  <td>1</td>
  <td>"sunt aut facere repellat provident occaecati excepturi optio reprehenderit"</td>
  <td>
    "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut
    ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  </td>
</tr>
<tr data-id="2">
  <td>2</td>
  <td>"qui est esse"</td>
  <td>
    "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat
    blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus
    qui neque nisi nulla"
  </td>
</tr>
```

This is where knowledge of [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) will come in handy.

You will recall (from examples above / online) that the syntax for Template literals is the following:

```js
`string text ${expression} string text`;
```

where "expression" is a valid JavaScript [expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#expressions), ie: "any valid unit of code that resolves to a value". Therefore, if our task is to loop through our array of results and generate HTML, we can use the [map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method of an array within our "expression" to process the post objects one at a time and generate html.

To see this strategy in action, let's first try a simple example, where we take an array of strings and convert them to a single string showing the html for an unordered-list:

```js
let numbers = ['one', 'two', 'three'];

let numberList = `<ul>${numbers.map((num) => `<li>${num}</li>`)}</ul>`;

console.log(numberList);
```

Ths should show the following in the console:

```
<ul><li>one</li>,<li>two</li>,<li>three</li></ul>
```

This is very close, however you will notice that we have unnecessary commas (",") in our string output. This is because the [map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method always returns an array and when that array is implicitly [converted to a string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString), commas (',') are inserted. To overcome this, we must make one small change to our template literal, ie:

```js
let numberList = `<ul>${numbers.map((num) => `<li>${num}</li>`).join('')}</ul>`;
```

By chaining the [join('')](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) method at end of the "map" operation, we can ensure that the array is joined using empty strings ('') instead of commas (',').

With this in mind, let's attempt to write a template string that will solve our problem, by converting the data from jsonplaceholder into a series of rows (&lt;tr&gt; elements) to be used in our "postsTable":

<!-- prettier-ignore-start -->
```js
let postRows = `
  ${data.map(post => (
    `<tr data-id=${post.id}>
        <td>${post.userId}</td>
        <td>${post.title}</td>
        <td>${post.body}</td>
    </tr>`
  )).join('')}
`;
```
<!-- prettier-ignore-end -->

#### Updating the DOM

With our postRows showing valid HTML, our next step is to add it to the DOM. Fortunately, all that needs to be done is for the correct DOM element to be [selected](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) and it's [.innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) property set to our newly generated postRows HTML string:

```js
document.querySelector('#postsTable tbody').innerHTML = postRows;
```

#### Click Events

Once the elements are added to the DOM, the last thing that we must do is to associate each row with a "click" event (we will be using this later). This involves selecting the newly created &lt;tr&gt; elements, looping through each one and (using the familiar "addEventListener" function) registering a "click" event. For the time being, we will test this by outputting "clicked" to the console:

```js
// add the "click" event listener to the newly created rows
document.querySelectorAll('#postsTable tbody tr').forEach((row) => {
  row.addEventListener('click', (e) => {
    console.log('clicked');
  });
});
```

### Filtering the Table

Our next major task is to give the user the ability to search for a user ID using our search form in the navigation bar. To achieve this, we must first register an event to trigger when the "searchForm" is submitted:

:::caution
Make sure this code is executed only when the "DOM is Ready".
:::

```js
document.querySelector('#searchForm').addEventListener('submit', (event) => {
  // prevent the form from from 'officially' submitting
  event.preventDefault();
});
```

Here, we use the [event.preventDefault();](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) function to ensure that the event's default action is not taken - ie: submitting the form by attempting to send a request back to the server.

What we actually want to do is to get the value of the only &lt;input&gt; field (id: "userId"). In this case, we can obtain its "value" by simply using the [value](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text#value) attribute of the form field element. Once we have this, we can
invoke the "populatePostsTable()" method with the value, which will refresh the table:

```js
document.querySelector('#searchForm').addEventListener('submit', (event) => {
  // prevent the form from from 'officially' submitting
  event.preventDefault();
  // populate the posts table with the userId value
  populatePostsTable(document.querySelector('#userId').value);
});
```

### Populating / Showing the Modal Window

The final piece of interactivity that we will add to the table is to enable the user to click on a specific _row_ to obtain additional information for a given post - in this case we will show all of the "comments" for a given post.

#### Getting the Data on "Click"

To begin, we will be placing our code within the "click" eventListener callback for the "row", which currently displays the text "clicked" in the console. However, instead of displaying "clicked", we will instead display the "data-id" value of the row that was clicked. This can be accomplished by using the [getAttribute()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute) method of the element (row):

```js
// add the "click" event listener to the newly created rows
document.querySelectorAll('#postsTable tbody tr').forEach((row) => {
  row.addEventListener('click', (e) => {
    let clickedId = row.getAttribute('data-id');
    console.log(clickedId);
  });
});
```

Once we have confirmed this works and the correct "clickedId" is displayed in the console, we can use this value to get all of the comments for a current post using:

```
https://jsonplaceholder.typicode.com/comments?postId=ID
```

To test this functionality, add the following "fetch()" call to the above logic and confirm that the correct comments are indeed output to the console:

```js
fetch(`https://jsonplaceholder.typicode.com/comments?postId=${clickedId}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
```

You should see that comments for "postId" 1 are shown for the first row, comments for "postId" 5 are shown for the fifth row, etc.

#### Generating the List

Next, we must convert this data into an HTML representation and add it to the DOM - specifically the "modal-body" &lt;div&gt; element of our "commentsModal". A similar operation was required above when first [converting the initial post data](#generating-html) to valid &lt;tr&gt; elements and we will use the same logic here. However, instead of generating &lt;tr&gt; elements, we will instead generate an unordered list using Bootstrap's [_list-group_ and _list-group-item_ classes](https://getbootstrap.com/docs/5.1/components/list-group/#basic-example):

<!-- prettier-ignore-start -->
```js
let commentsList = `
  <ul class="list-group">
    ${data.map(comment => (`
      <li class="list-group-item">
        ${comment.body}<br /><br />
        <strong>Name:</strong> ${comment.name}<br />
        <strong>Email:</strong> ${comment.email}<br />
      </li>
    `)).join('')}
  </ul>
`;
```
<!-- prettier-ignore-end -->

#### Populating the Modal

Finally, with the commentsList containing the correct HTML, we can populate the modal window and show it to the user. This will involve adding the commentsList to the "modal-body":

```js
document.querySelector('#commentsModal .modal-body').innerHTML = commentsList;
```

and using using the [bootstrap.modal()](https://getbootstrap.com/docs/5.1/components/modal/#via-javascript) function; open the modal window:

```js
let modal = new bootstrap.Modal(document.getElementById('commentsModal'), {
  backdrop: 'static',
  keyboard: false,
});

modal.show();
```
