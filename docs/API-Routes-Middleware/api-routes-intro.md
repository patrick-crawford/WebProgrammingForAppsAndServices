---
id: api-routes-intro
title: API Routes Introduction
sidebar_position: 1
description: API Routes Introduction
---

# "API" Routes Introduction

One of the more interesting features of Next.js is the ability specify routes for a Web API to be executed on the same server serving your site. This extends the functionality of the server, in that it not only pre-renders and serves your files but also can act as a back end API for your application!

Recall, when we first created a boilerplate Next.js app, we were we given an "index.js" file within the "pages" folder that rendered the exported "Home" component at the default route ("/"). We were also provided with an "api" folder, containing a single "hello.js" file. Therefore, if we follow the structure of the "pages" folder, we should be able to access a "hello" route from the "api" folder, ie: "http://localhost:3000/api/hello". This is indeed the case, and the server will respond with:

<!-- prettier-ignore-start -->
```json
{ "name": "John Doe" }
```
<!-- prettier-ignore-end -->

## Route Definitions

If you open the "hello.js" file, you will see some code that looks very similar to how [routes are defined in "Express"](https://expressjs.com/en/guide/routing.html), ie:

**File:** "pages/api/hello.js"

```js
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' });
}
```

### 'req' and 'res'

You will see that both ["req"](https://nodejs.org/api/http.html#class-httpincomingmessage) and ["res"](https://nodejs.org/api/http.html#class-httpserverresponse) objects are available to the exported callback function in order to give us access to the HTTP request / response. However, it is important to note that these are **not** the same as the ["Request"](https://expressjs.com/en/api.html#req) and ["Response"](https://expressjs.com/en/api.html#res) objects provided by ["Express"](https://expressjs.com/en/guide/routing.html), though they serve the same purpose.

Additionally, "middleware" functions have been built in to parse the incoming request, which gives the **"req"** object the following _additional_ properties:

- **req.cookies** - An object containing the cookies sent by the request. Defaults to {}

- **req.query** - An object containing the query string. Defaults to {}" - Note: route parameter values also included.

- **req.body** - An object containing the body parsed by content-type, or null if no body was sent

Similarly, some "helper functions" have been made available on the **"res"** object to provide _additional_ functionality. These are similar to what is offered by "Express":

- **res.status(code)** - A function to set the status code. code must be a valid HTTP status code

- **res.json(body)** - Sends a JSON response. body must be a serializable object

- **res.send(body)** - Sends the HTTP response. body can be a string, an object or a Buffer

- **res.redirect([status,] path)** - Redirects to a specified path or URL. status must be a valid HTTP status code. If not specified, status defaults to "307" "Temporary redirect".

- **res.revalidate(urlPath)** - [Revalidate a page on demand](https://nextjs.org/docs/pages/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation-beta) using getStaticProps. urlPath must be a string.

### HTTP Methods

At the moment, the "hello" API route responds to "GET" requests only. If we wish to extend this to match other HTTP methods (ie: "POST"), we can leverage the ["method"](https://nodejs.org/api/http.html#messagemethod) property of the "req" object:

```js
export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json({ name: 'John Doe' });
      break;
    case 'POST':
      // return the 'name' value provided in the body of the rquest
      res.status(200).json({ name: req.body.name });
      break;
    default:
      // send an error message back, indicating that the method is not supported by this route
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
```

### Dynamic Routes

As with regular routing, API routes may also contain "route parameters". These must be defined in a similar way, in that they must exist in their own .js file with the desired route parameter as the file name. For example, if we wish to match the route "/api/users/**_id_**" (where **_id_** is the unknown parameter), we would crate the following file:

**File:** "/pages/api/users/[id].js"

```js
export default function handler(req, res) {
  const { id } = req.query; // "id" route parameter
  res.status(200).json({ name: `user ${id}` });
}
```

If we wish to reference the route parameter in the route definition, it can be accessed using **req.query**.

## Web API Structure

Using the above techniques, it is possible to create routes that match that of a typical Web API. For example, consider the following files:

**File:** "/pages/api/users/index.js"

```js
export default function handler(req, res) {
  const { name } = req.body;
  const { method } = req;

  switch (method) {
    case 'GET':
      // Read data from your database
      res.status(200).json({ message: `TODO: Get All Users` });
      break;
    case 'POST':
      // Create data in your database
      res.status(200).json({ message: `TODO: Create User with Name: ${name}` });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
```

**File:** "/pages/api/users/[id].js"

```js
export default function handler(req, res) {
  const { id } = req.query;
  const { name } = req.body;
  const { method } = req;

  switch (method) {
    case 'GET':
      // Read data from your database
      res.status(200).json({ message: `TODO: Get User with id: ${id} ` });
      break;
    case 'PUT':
      // Update data in your database
      res.status(200).json({ message: `TODO: Update User with id: ${id} - Set Name: ${name}` });
      break;
    case 'DELETE':
      // Delete data in your database
      res.status(200).json({ message: `TODO: Delete User with id: ${id}` });
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
```

Here, we have accounted for each of the major operations, ie:

| Route          | HTTP Method | Description                        |
| -------------- | ----------- | ---------------------------------- |
| /api/users     | GET         | Get all the users                  |
| /api/users     | POST        | Create a user                      |
| /api/users/:id | GET         | Get a single user                  |
| /api/users/:id | PUT         | Update a user with new information |
| /api/users/:id | DELETE      | Delete a user                      |

## Using MongoDB (Mongoose)

If we wish to extend the API structure to work with real data (ie: using MongoDB Atlas), we can use the familiar ["Mongoose" ODM](https://mongoosejs.com/).

To get started, install it as a dependency:

```bash
npm install mongoose
```

Next, since the database connection will be shared in multiple files (ie: "/pages/api/users/[id].js" and "/pages/api/users/index.js"), we should place the database **model** and **connection** logic in a separate file (or files) somewhere within our project folder. Since this code is not responsible for rendering a specific route or component, we will create a new **"lib"** folder and place it there:

**File:** lib/dbUtils.js

```js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

mongoose.models = {};
export const UserModel = mongoose.model('users', userSchema);

export async function mongooseConnect() {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    await mongoose.connect(`Your MongoDB Connection String Here`);
    return true;
  } catch (err) {
    throw new Error(err);
  }
}
```

You can see from the above code, that we are exporting both the **UserModel** and the **mongooseConnect()** function to be used in our API routes. You will also notice that we have created our ["Schema"](https://mongoosejs.com/docs/guide.html) and reset the ["models"](https://mongoosejs.com/docs/api/connection.html#Connection.prototype.models) before defining the "UserModel" (failing to do so may result in an "OverwriteModelError", ie: "Cannot overwrite 'users' model once compiled.").

Additionally, you will notice that our "mongooseConnect()" function checks to see if our connection is in a ["ready" state](https://mongoosejs.com/docs/api/connection.html#Connection.prototype.readyState). If this property is _falsy_ ie: **0**, then our connection is **disconnected** and we must create a new connection using "mongoose.connect()". If the ".readystate" property is _truthy_, then this function does not need to create a new connection and simply returns true.

With our "dbUtils.js" file complete, we can focus on adding the remainder of the [CRUD Operations](https://webprogrammingtoolsandframeworks.sdds.ca/NoSQL-Database-MongoDB/operations-crud-reference) to our API routes, specifically:

**File:** "/pages/api/users/index.js"

```js
import { UserModel, mongooseConnect } from '@/lib/dbUtils';

export default async function handler(req, res) {
  const { name } = req.body;
  const { method } = req;

  try {
    await mongooseConnect();

    switch (method) {
      case 'GET':
        let users = await UserModel.find().exec();
        res.status(200).json(users);
        break;
      case 'POST':
        const newUser = new UserModel({ name: name });
        await newUser.save();
        res.status(200).json({ message: `User: ${name} Created` });
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
```

**File:** "/pages/api/users/[id].js"

```js
import { UserModel, mongooseConnect } from '@/lib/dbUtils';

export default async function handler(req, res) {
  const { id } = req.query;
  const { name } = req.body;
  const { method } = req;

  try {
    await mongooseConnect();

    switch (method) {
      case 'GET':
        let users = await UserModel.find({ _id: id }).exec();
        res.status(200).json(users[0]);
        break;
      case 'PUT':
        await UserModel.updateOne({ _id: id }, { $set: { name: name } }).exec();
        res.status(200).json({ message: `User with id: ${id} updated` });
        break;
      case 'DELETE':
        await UserModel.deleteOne({ _id: id }).exec();
        res.status(200).json({ message: `Deleted User with id: ${id}` });
        break;
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
```

In both files, we wait for mongooseConnect() to complete (either creating a connection, or reusing the current one) before we use the "UserModel" to perform our operations.
