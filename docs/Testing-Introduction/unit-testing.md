---
id: unit-testing
title: Unit Testing
sidebar_position: 1
description: Unit Testing
---

# Unit Testing

Software testing is a vital part of any development effort. There are [many strategies](https://www.atlassian.com/continuous-delivery/software-testing/types-of-software-testing), from automated tests with Unit Testing, End to End (E2E) testing, performance tests, etc. to manual tests like Acceptance Testing. Software development practices such as [Continuous Integration](https://www.atlassian.com/continuous-delivery/continuous-integration) rely heavily on testing to help ensure that bugs are not introduced when merging / integrating code from multiple developers. A major piece of this effort takes the form of Unit Testing:

> Unit testing finds problems early in the development cycle. This includes both bugs in the programmer's implementation and flaws or missing parts of the specification for the unit (one or more computer program modules together with associated control data, usage procedures, and operating procedures). The process of writing a thorough set of tests forces the author to think through inputs, outputs, and error conditions, and thus more crisply define the unit's desired behavior. The cost of finding a bug before coding begins or when the code is first written is considerably lower than the cost of detecting, identifying, and correcting the bug later.
>
> [https://en.wikipedia.org/wiki/Unit_testing](https://en.wikipedia.org/wiki/Unit_testing)

## Jest Introduction

When unit testing our Next.js code we will be using the popular ["Jest"](https://jestjs.io) testing framework.

> Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!

### Getting Started

Before we begin learning Jest, we should create a new Next.js app using the familiar command:

```
npx create-next-app my-app --use-npm
```

Once this is complete, we will install Jest as a ["development dependency"](https://nodejs.dev/learn/npm-dependencies-and-devdependencies) using npm, ie:

```
npm install --save-dev jest
```

Next, we should update the "scripts" section of our **package.json** file to create a new "test" script that runs Jest using the ["--watchAll"](https://jestjs.io/docs/cli#--watchall) flag (to run all tests):

```js
"scripts": {

  ...

  "test": "jest --watchAll"
}
```

Finally, create a new folder under "my-app" called "tests" (ie: my-app/tests) and add a new file within this folder called **"practice.test.js"**. This is where we will be practicing writing our first tests using Jest.

### Writing Tests using Jest

Defining tests using Jest typically involves the following functions:

<br />

[**describe(name, fn):**](https://jestjs.io/docs/api#describename-fn) Optional - Creates a block that groups several related tests together:

```js
describe('some tests', () => {
  // test definitions here
});
```

<br />

[**test(name, fn, timeout)**](https://jestjs.io/docs/api#testname-fn-timeout) (also under the alias: `it(name, fn, timeout)`) - This is the function that defines a test, identified by "name"

```js
test('test name', () => {
  // test "expectations" here
});
```

<br />

[**expect:**](https://jestjs.io/docs/expect) This is typically used in the form `expect(value)` and is used to test the value with [matcher functions](https://jestjs.io/docs/using-matchers) such as [".toBe()"](https://jestjs.io/docs/expect#tobevalue):

```js
let x = 5;
expect(x).toBe(5);
```

<br />

Putting these concepts together, we can write our first test in **"practice.test.js"** as follows:

```js
let sum = (num1, num2) => num1 + num2;

describe('Practice Tests', () => {
  test('sum function adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
```

Here, we have defined a function called "sum" and written a test within our "Practice Tests" group to ensure that it functions correctly. To run this test, open the integrated terminal for your app and execute the command:

```
npm run test
```

This should run Jest in "watch" mode and execute your practice.test.js file, showing the following output:

```
 PASS  tests/practice.test.js
  Practice Tests
    ✓ sum function adds 1 + 2 to equal 3 (2 ms)
```

To ensure that this is working correctly, try modifying the test so that it fails, ie: `expect(sum(1, 2)).toBe(4);` and save the file. The test should run again and you will see the output:

```
 FAIL  tests/practice.test.js
  Practice Tests
    ✕ sum function adds 1 + 2 to equal 3 (3 ms)
```

### Introduction to "Matchers"

As stated above, Jest uses matcher functions ("matchers") to define a complete "expectation" for a value. These were designed to be as human-readable as possible and typically feature names like "toBe", "toHaveReturned", "toBeCloseTo", etc. By using matchers with [expect](https://jestjs.io/docs/expect), we can create 1 or more "expectations" for a test. If the test meets all of the expectations, then it passes.

The following is a list of the most common matchers from the official [Jest documentation](https://jestjs.io/docs/using-matchers), placed here for **reference**:

> **NOTE:** For the full list, see the [expect API doc](https://jestjs.io/docs/expect).

#### Truthiness

In tests, you sometimes need to distinguish between undefined, null, and false, but you sometimes do not want to treat these differently. Jest contains helpers that let you be explicit about what you want.

- `toBeNull` matches only `null`
- `toBeUndefined` matches only `undefined`
- `toBeDefined` is the opposite of `toBeUndefined`
- `toBeTruthy` matches anything that an `if` statement treats as true
- `toBeFalsy` matches anything that an `if` statement treats as false

For example:

```js
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});
```

You should use the matcher that most precisely corresponds to what you want your code to be doing.

#### Numbers

Most ways of comparing numbers have matcher equivalents.

```js
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```

For floating point equality, use `toBeCloseTo` instead of `toEqual`, because you don't want a test to depend on a tiny rounding error.

```js
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3); This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});
```

#### Strings

You can check strings against regular expressions with `toMatch`:

```js
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```

#### Arrays and iterables

You can check if an array or iterable contains a particular item using `toContain`:

```js
const shoppingList = ['diapers', 'kleenex', 'trash bags', 'paper towels', 'milk'];

test('the shopping list has milk on it', () => {
  expect(shoppingList).toContain('milk');
  expect(new Set(shoppingList)).toContain('milk');
});
```

#### Exceptions

If you want to test whether a particular function throws an error when it's called, use `toThrow`.

```js
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
  expect(() => compileAndroidCode()).toThrow(/JDK/);
});
```

> **NOTE:** the function that throws an exception needs to be invoked within a wrapping function otherwise the `toThrow` assertion will fail.

## Testing Components and Pages

If we want to use these testing techniques to test more than functions, arrays, strings, etc. within our Next.js app, we will need to install a few additional dependencies, ie:

- **jest-environment-jsdom:** - Used to define our "Test Environment" (Note: This was removed from Jest as of [version 28](https://jestjs.io/blog/2022/04/25/jest-28), however it is still actively maintained)

- [**@testing-library/react:**](https://testing-library.com/docs/react-testing-library/intro/) - A "very light-weight solution for testing React components. It provides light utility functions on top of react-dom and react-dom/test-utils, in a way that encourages better testing practices."

- [**@testing-library/jest-dom:**](https://testing-library.com/docs/ecosystem-jest-dom/) - A "companion library for Testing Library that provides custom DOM element matchers for Jest"

```
npm install --save-dev jest-environment-jsdom @testing-library/react @testing-library/jest-dom
```

Before we can begin writing tests, we must create a **jest.config.mjs** file (from the [official Next.js documentation](https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler)) in "my-app" to configure the testing environment, ie:

**File:** "my-app/jest.config.mjs"

```js
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
```

This should complete the testing set up - now we can begin writing tests for components and pages. For now, we will start with a simple test that will examine the output of the default "index" page, included when an app is created using "create-next-app":

### Test 1: "Vercel" Link in the first child of the "main" element

For this first test, we must ensure that a link to ["https://vercel.com"](https://vercel.com) is rendered within the first child of the "main" element (section). We know this to be true by visually expecting the output, but how can we test this programmatically?

1. First, create a new file called: **index.test.js** in the "tests" folder

2. Add the following dependencies:

```js
import Home from '@/pages/index';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
```

3. Add the "Home Page" group by using the "describe" function:

```js
describe('Home Page', () => {
  // ...
});
```

4. Finally, add the "test" function to define the test:

<!-- prettier-ignore-start -->
```js
test("renders at least one link to https://vercel.com in the first child of 'main' ", () => {
  const {container} = render(<Home />);

  // attempt to fetch the first child element within the "main" element
  const child = container.querySelector('main *');

  // ensure the the child element exists
  expect(child).toBeTruthy();

  // get all "a" elements within the child element
  const childLinks = child.querySelectorAll("a");

  // ensure there is at least 1 "a" element within the child
  expect(childLinks.length).toBeGreaterThan(0); // at least one link

  // count the number of links that include "https://vercel.com"
  let vercelLinks = 0;

  childLinks.forEach(link => {
    if(link.href.includes("https://vercel.com"))
      vercelLinks++;
  });

  // ensure that there is at least one link that includes "https://vercel.com"
  expect(vercelLinks).toBeGreaterThan(0); // at least one vercel link
});
```
<!-- prettier-ignore-end -->

For this test, we have a number of "expectations" for our test to be true:

- Ensure the existence of the first child element of "main"
- The child element must contain one or more links
- One of the links within the child element must contain the text ["https://vercel.com"](https://vercel.com).

To test that this is indeed the case, we must render the component: "&lt;Home /&gt;" using the ["render"](https://testing-library.com/docs/react-testing-library/api/#render) function. We store the [container](https://testing-library.com/docs/react-testing-library/api/#container-1) property of the [result](https://testing-library.com/docs/react-testing-library/api/#render-result), which is the DOM node containing the rendered component. Using this, we can use familiar DOM functions such as [querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) to get the child element.

Once we are sure that there is a child element, we use [querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) to grab all of the "a" elements within it. To determine if there are any links to ["https://vercel.com"](https://vercel.com) in that list, we iterate over all of the links and use the ["includes"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes) function to check for the substring.

### Test 2: Component with User Event(s)

For this next test, we will re-create our familiar "ClickCounter" component and write a test to ensure that when the user clicks the button, the counter increases. To begin, let's first create the component:

1. Create a new "components" folder

2. Inside the "components' folder, create a new file: "clickCounter.js"

3. Add the following code to define the "&lt;ClickCounter /&gt; " component:

<!-- prettier-ignore-start -->
```js
import {useState} from 'react'

export default function ClickCounter(){
  const [count, setCount] = useState(0);
  return <button onClick={()=>{setCount(count + 1)}}>Clicked {count} Times</button>
}
```
<!-- prettier-ignore-end -->

4. (Optional) Place the component somewhere on the "Home" page and confirm that it functions correctly by clicking the button

With the button defined and functioning correctly, we can now proceed to write the corresponding test:

1. Within the "tests" folder, create a new file: **"clickCounter.test.js"**

2. use npm to install "@testing-library/user-event":

```
npm install --save-dev @testing-library/user-event
```

3. Add the following dependencies:

```js
import ClickCounter from '@/components/clickCounter';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
```

4. Add the "ClickCounter Component" group by using the "describe" function:

```js
describe('ClickCounter Component', () => {
  // ...
});
```

5. Add the "test" function to define the test:

```js
test('increase count by 1 when clicked', async () => {
  const user = userEvent.setup();
  const { container } = render(<ClickCounter />);

  // attempt to fetch the "button" element
  const button = container.querySelector('button');

  // ensure there the "button" element exists
  expect(button).toBeTruthy();

  // ensure that the "button" text contains "0" to start
  expect(button.innerHTML).toContain('0');

  // simulate a button click event
  await user.click(button);

  // ensure that the "button" context contains "1" after the event
  expect(button.innerHTML).toContain('1');
});
```

For this test, we have included another external "companion" library for Testing Library: ["user-event"](https://testing-library.com/docs/user-event/intro)

> user-event tries to simulate the real events that would happen in the browser as the user interacts with it. For example userEvent.click(checkbox) would change the state of the checkbox.
>
> [The more your tests resemble the way your software is used, the more confidence they can give you.](https://twitter.com/kentcdodds/status/977018512689455106)

In the code above, we have invoked the ["setup()"](https://testing-library.com/docs/user-event/setup) method _before rendering our component_, as [recommended in the documentation](https://testing-library.com/docs/user-event/intro#writing-tests-with-userevent). We then use the familiar `querySelector()` function to get a reference to the button and ensure that it contains the text "0" before the click event has been triggered.

To trigger the event itself, we use the ["click()"](https://testing-library.com/docs/ecosystem-user-event/#clickelement-eventinit-options) method. It's important that we execute this code using "await" as we cannot immediately execute the final "expect" without the event being triggered and the component updated as a result.

### Test 3: API Route with Route Parameter

For our final test, we will implement an API route for a subset of our familiar "vehicles" static dataset from our ["simple-API" example](Introduction-JWT/example-code.md):

1. Within the "pages/api" folder, create a new folder: **vehicles**

2. Within the newly created "pages/api/vehicles" folder, create a new file: **[id].js**

3. Enter the following code to define our dynamic "vehicles" api route:

```js
let vehicleData = [
  {
    id: 1,
    year: 1994,
    make: 'Suzuki',
    model: 'SJ',
    vin: 'JN8AZ2KR6CT544012',
  },
  {
    id: 2,
    year: 1999,
    make: 'Chrysler',
    model: '300',
    vin: '1B3CC5FB5AN648885',
  },
  {
    id: 3,
    year: 2005,
    make: 'BMW',
    model: 'X3',
    vin: 'JTHBP5C29E5152916',
  },
];

export default function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      let vehicleIndex = vehicleData.findIndex((v) => v.id == id);
      // if a vehicleIndex was found, return the corresponding vehicle, else send a 404 error
      vehicleIndex != -1 ? res.status(200).json(vehicleData[vehicleIndex]) : res.status(404).end();
      break;

    default:
      // send an error message back, indicating that the method is not supported by this route
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
```

The structure of the above should look somewhat familiar, as it was discussed when we [first introduced API routes](/API-Routes-Middleware/api-routes-intro) (please have a quick review if required). Basically, all we are doing here is allowing for a simple "GET" request with a single route parameter "id", ie: "api/vehicles/**3**" should return:

```json
{
  "id": 3,
  "year": 2005,
  "make": "BMW",
  "model": "X3",
  "vin": "JTHBP5C29E5152916"
}
```

This route also sends a **404** status code if the requested "id" is not found, ie: "api/vehicles/**4**" should return an empty body with the status: 404.

To test this functionality, we will be using another 3rd party module to help make the request from within our test: ["node-mocks-http"](https://www.npmjs.com/package/node-mocks-http). Once you have installed it using npm:

```
npm install --save-dev node-mocks-http
```

You can commence writing the test:

1. First, create a new file called: **vehicles.test.js** in the "tests" folder

2. Add the following dependencies:

```js
import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/vehicles/[id]';
```

3. Add the "/api/vehicles/[id] Route" group by using the "describe" function:

```js
describe('/api/vehicles/[id] Route', () => {
  // ...
});
```

4. Add the first (of two) "test" functions to define the test for a known vehicle:

<!-- prettier-ignore-start -->

```js
test('returns a vehicle for a specified ID', async () => {
  const { req, res } = createMocks({
    method: 'GET',
    query: {
      id: '1',
    },
  });

  await handler(req, res);

  expect(res._getStatusCode()).toBe(200);
  expect(JSON.parse(res._getData())).toEqual(
    expect.objectContaining({
      id: 1,
    })
  );
});
```

5. Add the second (of two) "test" functions to define the test for an unknown vehicle:

```js
test('returns 404 when vehicle id not found', async () => {
  const { req, res } = createMocks({
    method: 'GET',
    query: {
      id: 'abc',
    },
  });

  await handler(req, res);
  expect(res._getStatusCode()).toBe(404);
});
```

If we examine the first test ("returns a vehicle for a specified ID"), we can see that we use "createMocks" to create a mock "GET" request / response with the **"id"** route parameter value: **1**. We then provide the mocked req and res objects to the asynchronous API "handler" function. After this has completed, we can use the **\_getStatusCode()** function to pull the resultant status code from the response and examine it in our test:

```js
expect(res._getStatusCode()).toBe(200);
```

Similarly, we use the **\_getData()** function to get the returned data from the response. However, rather than testing every value in the returned object, we **only** make sure that the id value matches route parameter (in this case, **1**):

```js
expect(JSON.parse(res._getData())).toEqual(
  expect.objectContaining({
    id: 1,
  })
);
```

To achieve this, we use the [expect.objectContaining(object)](https://jestjs.io/docs/expect#expectobjectcontainingobject) function with the "toEqual()" matcher.

The second test ("returns 404 when vehicle id not found") functions in almost exactly the same way as the first test, however instead of passing the route parameter: **1**, we pass **abc**. We also only test for the status code "404" as no object is returned.
