---
id: web-api-with-authentication
title: Web API With Authentication
sidebar_position: 1
description: Web API With Authentication
---

# Web API With Authentication

Before we can begin learning about JWT and how to secure a Web API, we must first create a simple Node.js server to handle our API requests. To speed this along, we have included a simple Web API in the [Example Code](Introduction-JWT/example-code.md) for this week (See the "simple-API" folder). Currently, the primary function of this Web API is to return a hard-coded, static list of vehicles from its data-service.js module, using the route "/api/vehicles".

Once you have extracted the "simple-API" folder from the example code, open it in Visual Studio Code and execute the following command to fetch the dependencies (currently, only [express](https://www.npmjs.com/package/express) & [cors](https://www.npmjs.com/package/cors)):

```
npm install
```

Once this is complete, execute the command:

```
node server.js
```

This will start the server server and enable you to test the "/api/vehicles" route on localhost:8080. You should see an array of JSON objects, consisting of 5 vehicles.

## Quick note on "CORS"

At this point, you may be asking "What is 'cors' and why do we need this module?". CORS stands for "Cross-Origin Resource Sharing" and it is essentially a way to enable JavaScript to make an AJAX call from one origin (domain) to a server on a **different** domain. This is not permitted by default, as browsers restrict these types of requests for security reasons. If we did not enable CORS, we could not use AJAX to make requests from our localhost to our API, if our API is running online.

In addition to simply allowing all AJAX requests from outside domains, the CORS module also allows you to "whitelist" certain domains, thereby allowing access for specific domains, while restricting access from all others.

More details can be found on MDN under "[Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)" and the ["cors" module on NPM](https://www.npmjs.com/package/cors)

## Account Management & Security

With our extremely simple "vehicles" API in place and producing data, we can now move on to discuss how we might _protect_ this data from unwanted (unauthorized) access. This will include creating routes that allow users to register accounts (persisted in MongoDB with encrypted passwords) as well as logging in to the system.

### MongoDB Atlas & MongoDB

As mentioned above, we will be persisting registered accounts using MongoDB in the cloud database platform: [MongoDB Atlas](https://www.mongodb.com/cloud). If you're not familiar with MongoDB Atlas at this point, you may review the basic setup here:

> [MongoDB Atlas Tutorial](https://www.mongodb.com/basics/mongodb-atlas-tutorial)

Once your cluster is up and running correctly (ie: A "Database User" has been created, IP Access is "Allowed from Anywhere", etc), set up a new "simple-API-users" database with a "users" collection for the simple API. Once this is done, obtain a copy of the connection string - this should look something like:

```
mongodb+srv://user:<password>@cluster0-abc1.mongodb.net/?retryWrites=true&w=majority
```

> **NOTE:** You will have to add the text: **simple-API-users** in the above connection string after the last part of the url before the query parameters, ie: **mongodb.net/simple-API-users**. In addition, you must update the values for **user** and **&lt;password&gt;** to match the credentials that you created for the "Database User".

Be sure to keep track of your connection string, as we will be using it in the next piece:

### Updating the "user-service"

To keep our DB authentication piece clean, we will be making use of the promise-based "user-service" module, defined in the "user-service.js" file. If you open this file, you will see a space for your MongoDB connection string; enter it now before proceeding.

Next, you will notice a definition for a "user" Schema (userSchema). In this case, it consists of 4 simple fields:

- **userName:** A (unique) string representing the user's login/user name

- **password:** The user's password

- **fullName:** Ths user's full name

- **role:** The user's role, ie "administrator", "data-entry", "maintenance", etc. (the user's role will define exactly what in the API the user has access to. For our example we will not be using this field, as every user will have access to all vehicles)

Below this, you should note that there are 3 exported functions:

- **connect():** This function simply ensures that we can connect to the DB and if successful, assign the "User" object as a "User" model, using the "users" collection (specified by userSchema).

- **registerUser(userData):** Ensures that the provided passwords match and that the user name is not already taken. If the userData provided meets this criteria, add the user to the system.

- **checkUser(userData):** This function ensures that the user specified by "userData" is in the system and has the correct password (used for logging in)

Lastly, before we can move on to test the application (below) we must update our "server.js" to "connect" to our user service before we start the server, ie:

<!--prettier-ignore-start -->
```js
userService.connect().then(()=>{
  app.listen(HTTP_PORT, ()=>{console.log("API listening on: " + HTTP_PORT)});
})
.catch((err)=>{
  console.log("unable to start the server: " + err);
  process.exit();
});
```
<!--prettier-ignore-end -->

### Hashed Passwords with bcrypt (bcryptjs)

Up to this point, our user service has been designed to store passwords as plain text. This is a serious security concern as passwords must **always** be encrypted. To achieve this, we will be making use of the password-hashing function: ["bcrypt"](https://en.wikipedia.org/wiki/Bcrypt).

To include _bcrypt_, we must install **bcryptjs** using **npm** and "require" the module at the top of our user-service.js:

```
const bcrypt = require('bcryptjs');
```

Once we have the module, we can use the following logic to **hash** a password using bcrypt's **hash()** method, ie:

```javascript
// Encrypt the plain text: "myPassword123"
bcrypt.hash('myPassword123', 10).then((hash) => {
  // Hash the password using a Salt that was generated using 10 rounds
  // TODO: Store the resulting "hash" value in the DB
});
```

If we apply this process to our "registerUser" function (thereby _hashing_ the provided password when registering the user), our code will look like this:

<!-- prettier-ignore-start -->
```javascript
module.exports.registerUser = function (userData) {
  return new Promise(function (resolve, reject) {

    if (userData.password != userData.password2) {
        reject("Passwords do not match");
    } else {
        bcrypt.hash(userData.password, 10).then(hash=>{ // Hash the password using a Salt that was generated using 10 rounds
          
          userData.password = hash;
          let newUser = new User(userData);

          newUser.save().then(() => {
              resolve("User " + userData.userName + " successfully registered");
          }).catch(err => {
              if (err.code == 11000) {
                  reject("User Name already taken");
              } else {
                  reject("There was an error creating the user: " + err);
              }
          });
        }).catch(err => reject(err));
    }
  });
};
```
<!-- prettier-ignore-end -->

This makes the code a little longer and harder to follow, but we are really only adding the **bcrypt.hash()** method to our existing function.

If we wish to **compare** a plain text password to a **hashed** password, we can use bcrypt's **compare()** method with the following logic:

```javascript
// Pull the password "hash" value from the DB and compare it to "myPassword123" (match)
bcrypt.compare('myPassword123', hash).then((res) => {
  // if res === true, the passwords match
});
```

If we apply this to our "checkUser" function (thereby comparing the DB's _hashed_ password with the provided password), our code will look like this:

<!-- prettier-ignore-start -->
```javascript
module.exports.checkUser = function (userData) {
  return new Promise(function (resolve, reject) {

    User.find({ userName: userData.userName })
    .limit(1)
    .exec()
    .then((users) => {

      if (users.length == 0) {
        reject("Unable to find user " + userData.userName);
      } else {
        bcrypt.compare(userData.password, users[0].password).then((res) => {
          if (res === true) {
            resolve(users[0]);
          } else {
            reject("Incorrect password for user " + userData.userName);
          }
        });
      }
    }).catch((err) => {
      reject("Unable to find user " + userData.userName);
    });
  });
};
```
<!-- prettier-ignore-end -->

Not much has changed here. Instead of simply comparing userData.password with users\[0\].password directly, we use the **bcrypt.compare()** method.

### Adding & Testing Authentication Routes

Now that we have a working "user" service that will handle registering and validating user information, we should add some new "/api/" authentication routes to add the functionality to our API.

Since our new routes will be accepting input (via JSON, posted to the route), we will need to configure our server to correctly parse "JSON" formatted data. This can be accomplished by adding [express.json()](https://expressjs.com/en/api.html) built-in middleware before our route definitions:

```javascript
app.use(express.json());
```

With the middleware correctly configured, we can reliably assume that the "body" property of the request (req) will contain the properties and values of the data sent from the AJAX request.

> **NOTE:** We do not yet have a UI to gather user information for registration and validation, so we must make use of an API testing tool such as the [Thunder Client Extension](https://www.thunderclient.io/) to make requests and provide POST data when testing our new routes.

**New Route: /api/register**

This route simply collects user registration information sent using POST to the API in the form of a JSON-formatted string, ie:

```json
{
  "userName": "bob",
  "password": "myPassword",
  "password2": "myPassword",
  "fullName": "Robert Wiley",
  "role": "administrator"
}
```

Fortunately, our **userService.registerUser()** function is perfectly set up to handle this type of data. It will validate whether password & password2 match and check that the user name "bob" is not taken. If the data meets these requirements, the provided password will be hashed and the user will be entered into the system. Therefore, our new /api/register route is very simple; it must simply pass the posted data to the userService for processing and report back when it has completed, ie:

```javascript
app.post('/api/register', (req, res) => {
  userService
    .registerUser(req.body)
    .then((msg) => {
      res.json({ message: msg });
    })
    .catch((msg) => {
      res.status(422).json({ message: msg });
    });
});
```

**NOTE:** The 422 error code communicates back to the client that the server understands the content type of the request and the syntax is correct but was unable to process the data (see: [422 Unprocessable Entity](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422)).

To test this new route, stop and start your API (server.js) again and proceed to make the following request:

- Make sure **POST** is selected in the request type dropdown
- In the address bar, type: "http://localhost:8080/api/register"
- In the **Headers** tab, ensure that "Content-Type" is selected with a value of "application/json"
- In the **Body** tab, copy and paste our information for user "bob" in the provided text area:

```json
{
  "userName": "bob",
  "password": "myPassword",
  "password2": "myPassword",
  "fullName": "Robert Wiley",
  "role": "administrator"
}
```

Once the request is processed, it should return with a status 200 and the JSON:

```json
{
  "message": "User bob successfully registered"
}
```

**New Route: /api/login**

In addition to **adding** users to the system, we must also be able to **authenticate** users and allow them to "login" before being granted access to the data. In this case, all of the work required for authenticating user data is done in the "dataAuth.checkUser()" method. So (like "/api/register"), our "/api/login" route, will once again pass the posted data to the userService for processing and report back when it has completed, ie:

```javascript
app.post('/api/login', (req, res) => {
  userService
    .checkUser(req.body)
    .then((user) => {
      res.json({ message: 'login successful' });
    })
    .catch((msg) => {
      res.status(422).json({ message: msg });
    });
});
```

To test this new route, once again stop and start your API (server.js) and make another request. We will keep most of the values the same, with the following exceptions:

- In the address bar, type: "http://localhost:8080/api/login"
- In the **Body** tab, copy and paste our information for user "bob" in the provided text area:

```json
{
  "userName": "bob",
  "password": "myPassword"
}
```

Again, when you're sure you've entered everything correctly and your server is running, hit the blue **Send** button to send the POST data to the API.

Once the request is processed, it should return with a status 200 and the JSON:

```json
{
  "message": "login successful"
}
```

You can also try entering incorrect credentials in the request body (ie: a different "userName", or an incorrect "password") to verify that our service is indeed functioning properly and will not send the "login successful" message to unauthorized users.
