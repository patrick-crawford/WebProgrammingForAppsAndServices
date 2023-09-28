---
id: react-forms
title: React Forms
sidebar_position: 1
description: React Forms
---

# React Forms

A common workflow for working with web forms has typically involved correctly setting the "action", "method", and optionally "enctype" attributes of a &lt;form&gt; element to reference a specific route on a server using "POST". Upon form submission, the browser would generate a HTTP "POST" request, with the body of the request containing the "urlencoded" data for the form, ie: "the keys and values are encoded in key-value tuples separated by '>', with a '=' between the key and the value." It would be the responsibility of the server to decode / parse this data into an object, such that the form data can be persisted to a data store, etc.

When the back-end is a Web API however, this process has to change slightly to accommodate both the client-side requirements (likely submitting the form via an AJAX request) and server requirements (typically requiring the data to be encoded using JSON). In this scenario, certain things must happen on the client-side, ie:

- Explicitly handling the "submit" event for the form and preventing the default action of automatically sending a HTTP "POST" request
- Obtaining updated form values and generating JSON formatted data to reflect the current values of the form fields.

## Controlled Components

React has identified this need for greater control over form components and has introduced the term ["Controlled Components"](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable):

> "In HTML, form elements such as &lt;input&gt;, &lt;textarea&gt;, and &lt;select&gt; typically maintain their own state and update it based on user input. In React, mutable state is typically kept in the state property of components, and only updated with setState().
>
> We can combine the two by making the React state be the 'single source of truth'. Then the React component that renders a form also controls what happens in that form on subsequent user input. An input form element whose value is controlled by React in this way is called a 'controlled component'".

A very simple example of a controlled component can be seen in the below example. Here, we have included a single "input" control that not only obtains its initial value from the state ("userName"), but also updates the state with any changes via the "onChange" event:

```jsx
import { useState } from 'react';

export default function SimpleForm() {
  const [userName, setUserName] = useState('Homer Simpson');

  function submitForm(e) {
    e.preventDefault(); // prevent the browser from automatically submitting the form
    console.log(`form submitted - userName: ${userName}`);
  }

  return (
    <form onSubmit={submitForm}>
      User Name: <input value={userName} onChange={(e) => setUserName(e.target.value)} />
      <br />
      <br />
      <button type="submit">Update User Name</button>
    </form>
  );
}
```

By ensuring that the initial value of the form control is set to the value _currently in the state_, as well as updating the state with the current value of the form field whenever it is _changed_, we can say that the state is the "single source of truth". If the state always holds an "up-to-date" representation of the form, it can be used in the form submission handler to send the correct information to a Web API via an AJAX "POST" / "PUT", etc. request.

While this certainly works for smaller forms, it does not necessarily scale well and adding common features such as validation, keeping track of visited fields, handling varied types of input fields / select-multiple, etc. adds extra complexity to the code.

It is for these reasons that complete, third-party solutions have been created as an alternative to working directly with "Controlled Components" in React. Some popular solutions include:

- **Formik**: [https://formik.org](https://formik.org)

- **React Hook Form**: [https://react-hook-form.com](https://react-hook-form.com)

## React Hook Form

For our purposes, we will be working with ["React Hook Form"](https://react-hook-form.com), as it provides excellent performance, greatly simplifies working with forms and has great support for schema / HTML standard validation and handling errors.

### Getting Started

To get started working with React Hook Form, we first must install it as a dependency from [npm](https://www.npmjs.com/package/react-hook-form):

```
npm i react-hook-form
```

After this, we simply have to import the ["useForm" hook](https://react-hook-form.com/api/useform) and we can get started writing forms:

```js
import { useForm } from 'react-hook-form';
```

As a simple example, let's begin by re-writing the above "Controlled Component" code, to use "react-hook-form" and the "useForm" hook:

```jsx
import { useForm } from 'react-hook-form';

export default function UserForm() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userName: 'Homer Simpson',
    },
  });

  function submitForm(data) {
    console.log(`form submitted - userName: ${data.userName}`);
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      User Name: <input {...register('userName')} />
      <br />
      <br />
      <button type="submit">Update User Name</button>
    </form>
  );
}
```

At first, you will notice one important difference - we did not import, nor use the "useState" hook at all in our solution. This is because React Hook Form manages its own internal state and if we wish to set an initial value for a form field, it can be done using either the "defaultValue" property on a specific form element, or by using the "defaultValues" property in the argument passed to the ["useForm"](https://react-hook-form.com/api/useform) hook (as above).

> **NOTE**: While React Hook Form encourages the use of default values, it is also very likely that any initial form data will not be available until it has been obtained from a Web API. In this case it would be common practice to update the form from within the "useEffect()" hook, once the data has materialized. If this is the case, ["setValue"](https://react-hook-form.com/api/useform/setvalue) may be used with a default value of "" for userName:
>
> ```jsx
> const { register, handleSubmit, setValue } = useForm({
>   defaultValues: {
>     userName: '', // the documentation encourages default values
>   },
> });
>
> useEffect(() => {
>   // set the userName value
>   setValue('userName', 'Homer Simpson');
> }, []);
> ```

You will also notice that our "submitForm" function has changed, as it no longer accepts the submit event "e". With React Hook Form, the submit function is instead invoked by ["handleSubmit"](https://react-hook-form.com/api/useform/handlesubmit), which automatically passes the form data to the callback function (ie: "submitForm").

> **NOTE:** It is still possible to obtain the submit event, by referencing a 2nd parameter "e", in the "submitForm" function, ie:
>
> ```js
> function submitForm(data, e) {}
> ```

Finally, we made use of the ["register"](https://react-hook-form.com/api/useform/register) method to associate this control with React Hook Form. By "registering" a control with React Hook Form, we're essentially registering the onBlur and onChange callbacks, as well as setting the name property for the form control and assigning a ["ref"](https://react.dev/learn/manipulating-the-dom-with-refs). From the React Hook Form documentation:

> ```jsx
> const { onChange, onBlur, name, ref } = register('firstName');
>
> <input
>  onChange={onChange} // assign onChange event
>  onBlur={onBlur} // assign onBlur event
>  name={name} // assign name prop
>  ref={ref} // assign ref prop
> />
>
> // same as above
> <input {...register('firstName')} />
> ```

### Registering Multiple Form Controls

As a more complete example, let's use the above methods to show a form containing all of the basic form controls (&lt;input /&gt;, &lt;select&gt;...&lt;/select&gt;, &lt;textarea&gt;...&lt;/textarea&gt;). We will also set the initial values of the form controls from an object defined in the "useEffect" hook:

<!-- prettier-ignore-start -->
```jsx
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function UserForm() {

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      userName: "",
      address: "",
      campus: "",
      program: [],
      parking: "",
      active: false
    }
  });

  useEffect(() => {
    let data = {
      userName: "Homer Simpson",
      address: "123 Main St, Springfield U.S.A",
      campus: "newnham",
      program: ['CPA', 'CPP'],
      parking: "semester",
      active: true
    }

    // set the values of each form field to match "data"
    for (const prop in data) {
      setValue(prop, data[prop]);
    }
  }, [])

  function submitForm(data) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      User Name: <br />
      <input {...register("userName")} /><br /><br />

      Address: <br />
      <textarea {...register("address")}></textarea><br /><br />

      Campus: <br />
      <select {...register("campus")}>
        <option value="king">King</option>
        <option value="SatY">Seneca at York</option>
        <option value="newnham">Newnham</option>
        <option value="markham">Markham</option>
      </select><br /><br />

      Program: <br />
      <select multiple {...register("program")}>
        <option value="DAD">Database Application Developer</option>
        <option value="CPA">Computer Programming &amp; Analysis</option>
        <option value="CPP">Computer Programming</option>
        <option value="DSA">Honours Bachelor of Data Science and Analytics</option>
      </select><br /><br />

      Parking: <br />
      <input type="radio" value="daily" {...register("parking")} /> Daily<br />
      <input type="radio" value="semester" {...register("parking")} /> Semester<br />
      <input type="radio" value="year" {...register("parking")} /> Academic Year<br /><br />

      <input type="checkbox" {...register("active")} />Currently Active<br /><br />

      <button type="submit">Update User</button>
    </form>
  );
}
```
<!-- prettier-ignore-end -->

As you can see from the above code, there is no special syntax for registering one type of form control over another. All that is required is that the code:

```js
{...register(fieldName)}
```

is placed on the form control, where "fieldName" is the name of the field that references the control.

Additionally, you will notice a small addition to the code in the "useEffect" hook:

```js
// set the values of each form field to match "data"
for (const prop in data) {
  setValue(prop, data[prop]);
}
```

Here, we are looping through every property in the "data" object (using a ["for...in" loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)) and explicitly setting the value for every field in our form with the value of the matching property. This works, since the registered "fieldname" values in the form match the property names in the data object.

### "Watching" Form Values

If you need to obtain the value of a form field as it's updated, it is possible to ["watch"](https://react-hook-form.com/api/useform/watch) it and be updated with any changes. For example, if we wish to "watch" the "userName" field, such that we can show it to the user or use it to hide / show other fields in the form, all that is required is that we include "watch" and create a variable to hold the value, ie:

```jsx
const { watch } = useForm();
```

```jsx
const watchUserName = watch('userName');
```

```jsx
<p>User Name: {watchUserName}</p>
```

> For more information / special cases, see [the official documentation for "watch"](https://react-hook-form.com/api/useform/watch)
