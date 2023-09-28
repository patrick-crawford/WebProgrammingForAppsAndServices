"use strict";(self.webpackChunkipc144=self.webpackChunkipc144||[]).push([[8726],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>k});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(n),d=r,k=u["".concat(l,".").concat(d)]||u[d]||m[d]||o;return n?a.createElement(k,i(i({ref:t},p),{},{components:n})):a.createElement(k,i({ref:t},p))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:r,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1582:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var a=n(7462),r=(n(7294),n(3905));n(8209);const o={id:"handling-user-events",title:"Handling User Events",sidebar_position:1,description:"Handling User Events"},i="Handling User Events",s={unversionedId:"Handling-Events-Rendering-Data/handling-user-events",id:"Handling-Events-Rendering-Data/handling-user-events",title:"Handling User Events",description:"Handling User Events",source:"@site/docs/Handling-Events-Rendering-Data/handling-user-events.md",sourceDirName:"Handling-Events-Rendering-Data",slug:"/Handling-Events-Rendering-Data/handling-user-events",permalink:"/WebProgrammingForAppsAndServices/Handling-Events-Rendering-Data/handling-user-events",draft:!1,editUrl:"hhttps://github.com/patrick-crawford/WebProgrammingForAppsAndServices/tree/master/docs/Handling-Events-Rendering-Data/handling-user-events.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{id:"handling-user-events",title:"Handling User Events",sidebar_position:1,description:"Handling User Events"},sidebar:"courseNotesSidebar",previous:{title:"Example Code",permalink:"/WebProgrammingForAppsAndServices/React-NextJS-Introduction/example-code"},next:{title:"Adding API Data",permalink:"/WebProgrammingForAppsAndServices/Handling-Events-Rendering-Data/adding-API-data"}},l={},c=[{value:"Adding Parameters",id:"adding-parameters",level:2}],p={toc:c},u="wrapper";function m(e){let{components:t,...n}=e;return(0,r.kt)(u,(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"handling-user-events"},"Handling User Events"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"NOTE:")," Some of the below code examples and explanations have been reproduced from sections of the ",(0,r.kt)("a",{parentName:"p",href:"https://react.dev/"},"official online documentation")," for React.")),(0,r.kt)("p",null,"Handling events in React is very similar to handling events on DOM elements using properties like ",(0,r.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick"},"onclick"),". However, there are some differences, ie:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"React events are named using camelCase, rather than lowercase."),(0,r.kt)("li",{parentName:"ul"},"With JSX you pass a function as the event handler, rather than a string.")),(0,r.kt)("p",null,"For example, the HTML:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<button onclick="processClick()">Click Me!</button>\n')),(0,r.kt)("p",null,"is slightly different in React:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"<button onClick={processClick}>Click me!</button>\n")),(0,r.kt)("p",null,'To see this in action, let\'s code a simple "click counter" component that renders a single button that shows a number that increases by one (1) every time it\'s clicked. To achieve this, we\'ll create a new component called "ClickCounter":'),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"import { useState } from 'react';\n\nexport default function ClickCounter(props) {\n  const [numClicks, setNumClicks] = useState(0);\n\n  function increaseNumClicks(e) { // 'e' is the current event object\n    setNumClicks(numClicks + 1);\n  }\n\n  return <button onClick={increaseNumClicks}>Clicks: {numClicks}</button>\n}\n")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"NOTE"),": Be careful when updating state based on a previous value (ie: numClicks + 1 in the example above), as it may not always work as expected on types that are not ",(0,r.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Glossary/Primitive"},"primitive"),', ie: "string", "number", "boolean", etc. For example, if we use the same logic to add an element to a state value holding an ',(0,r.kt)("em",{parentName:"p"},"array"),", we may be tempted to use the following code:"),(0,r.kt)("pre",{parentName:"blockquote"},(0,r.kt)("code",{parentName:"pre",className:"language-js"},"setMyArray(myArray.push('new element'));\n")),(0,r.kt)("p",{parentName:"blockquote"},"However, updating state in this manner ",(0,r.kt)("strong",{parentName:"p"},"will not")," cause the component to re-render. Instead, we must provide a ",(0,r.kt)("strong",{parentName:"p"},"new array"),", ie:"),(0,r.kt)("pre",{parentName:"blockquote"},(0,r.kt)("code",{parentName:"pre",className:"language-js"},"setMyArray([...myArray, 'new element']);\n")),(0,r.kt)("p",{parentName:"blockquote"},"For more information see: ",(0,r.kt)("a",{parentName:"p",href:"https://react.dev/learn/adding-interactivity#updating-arrays-in-state"},"Updating arrays in state")," and ",(0,r.kt)("a",{parentName:"p",href:"https://react.dev/learn/adding-interactivity#updating-objects-in-state"},"Updating objects in state"))),(0,r.kt)("p",null,"Here, you will notice that we have added a couple new concepts to the construction and rendering of a typical functional component, ie:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"We have declared a function to handle the event. It receives a single parameter 'e' which is a \"",(0,r.kt)("a",{parentName:"p",href:"https://react.dev/reference/react-dom/components/common#react-event-object"},"synthetic event"),'" - "a cross-browser wrapper around the browser\u2019s native event. It has the same interface as the browser\u2019s native event, including ',(0,r.kt)("em",{parentName:"p"},"stopPropagation()")," and ",(0,r.kt)("em",{parentName:"p"},"preventDefault()"),', except the events work identically across all browsers."')),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},'On our button element, we use "onClick" (instead of "onclick") to reference the event handler and "wire up" the event.'))),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"NOTE:")," For a full list events please refer to the official documentation for ",(0,r.kt)("a",{parentName:"p",href:"https://react.dev/reference/react-dom/components/common"},"supported events"),".")),(0,r.kt)("h2",{id:"adding-parameters"},"Adding Parameters"),(0,r.kt)("p",null,'As you can see from the above example, our callback function "increaseNumClicks" is registered to the onClick event by ',(0,r.kt)("em",{parentName:"p"},"passing the function only")," - the function is not actually ",(0,r.kt)("em",{parentName:"p"},"invoked")," anywhere in our JSX. This works fine, but what if we wish to pass one or more parameters to the function, in addition to the SyntheticEvent (above)?"),(0,r.kt)("p",null,"This can actually be achieved by registering the event as an anonymous function declared within the JSX, which ",(0,r.kt)("em",{parentName:"p"},"invokes")," the callback function. For example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"function increaseNumClicks(e, message) { // 'e' is the current event object\n  console.log(message);\n  setNumClicks(numClicks + 1);\n}\n\nreturn <button onClick={(e) => { increaseNumClicks(e, \"Hello\") }}>Clicks: {numClicks}</button>\n")),(0,r.kt)("p",null,'Here, we declare the callback function in place. It accepts a single parameter "e" as before, but the body of the function ',(0,r.kt)("em",{parentName:"p"},"invokes"),' the callback function. This allows us to continue to pass the SyntheticEvent (e) to our event handler "increaseNumClicks" as well as add any other parameter values.'))}m.isMDXComponent=!0},8209:(e,t,n)=>{n(7294)}}]);