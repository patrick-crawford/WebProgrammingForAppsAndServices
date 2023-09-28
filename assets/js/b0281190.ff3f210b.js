"use strict";(self.webpackChunkipc144=self.webpackChunkipc144||[]).push([[6887],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(n),d=o,f=u["".concat(l,".").concat(d)]||u[d]||m[d]||r;return n?a.createElement(f,i(i({ref:t},c),{},{components:n})):a.createElement(f,i({ref:t},c))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:o,i[1]=s;for(var p=2;p<r;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9867:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var a=n(7462),o=(n(7294),n(3905));n(8209);const r={id:"introducing-jotai",title:"Introducing Jotai",sidebar_position:2,description:"Introducing Jotai"},i="Introducing Jotai",s={unversionedId:"Managing-Application-State/introducing-jotai",id:"Managing-Application-State/introducing-jotai",title:"Introducing Jotai",description:"Introducing Jotai",source:"@site/docs/Managing-Application-State/introducing-jotai.md",sourceDirName:"Managing-Application-State",slug:"/Managing-Application-State/introducing-jotai",permalink:"/WebProgrammingForAppsAndServices/Managing-Application-State/introducing-jotai",draft:!1,editUrl:"hhttps://github.com/patrick-crawford/WebProgrammingForAppsAndServices/tree/master/docs/Managing-Application-State/introducing-jotai.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{id:"introducing-jotai",title:"Introducing Jotai",sidebar_position:2,description:"Introducing Jotai"},sidebar:"courseNotesSidebar",previous:{title:"Shared State with Props and Context",permalink:"/WebProgrammingForAppsAndServices/Managing-Application-State/shared-state-props-context"},next:{title:"Implementation: Shopping Cart",permalink:"/WebProgrammingForAppsAndServices/Managing-Application-State/implementation-shopping-cart"}},l={},p=[{value:"Getting Started",id:"getting-started",level:2},{value:"Defining Application Level State",id:"defining-application-level-state",level:2},{value:"Async Default Values",id:"async-default-values",level:3},{value:"Reading / Writing State",id:"reading--writing-state",level:2},{value:"&quot;Component Tree&quot; Example",id:"component-tree-example",level:2}],c={toc:p},u="wrapper";function m(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"introducing-jotai"},"Introducing Jotai"),(0,o.kt)("p",null,'As we have seen, there are a number of popular 3rd party state management solutions for React. However, for our purposes we will be going with the relatively new "Jotai", for its simplicity, efficiency and support for Next.js. It also makes use of Typescript, which is excellent, but not currently necessary for our implementations going forward.'),(0,o.kt)("p",null,"From the ",(0,o.kt)("a",{parentName:"p",href:"https://jotai.org/docs/basics/concepts"},"Jotai Documentation"),":"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Jotai was born to solve extra re-render issues in React. An extra re-render is when the render process produces the same UI result, where users won't see any differences."),(0,o.kt)("p",{parentName:"blockquote"},"To tackle this issue with React context (useContext + useState), one would require many contexts and face some issues."),(0,o.kt)("ul",{parentName:"blockquote"},(0,o.kt)("li",{parentName:"ul"},"Provider hell: It's likely that your root component has many context providers, which is technically okay, and sometimes desirable to provide context in different subtree."),(0,o.kt)("li",{parentName:"ul"},"Dynamic addition/deletion: Adding a new context at runtime is not very nice, because you need to add a new provider and its children will be re-mounted.\nTraditionally, a top-down solution to this is to use a selector interface. The ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/dai-shi/use-context-selector"},"use-context-selector")," library is one example. The issue with this approach is the selector function needs to return referentially equal values to prevent re-renders, and this often requires a memoization technique.")),(0,o.kt)("p",{parentName:"blockquote"},"Jotai takes a bottom-up approach with the atomic model, inspired by ",(0,o.kt)("a",{parentName:"p",href:"https://recoiljs.org/"},"Recoil"),". One can build state combining atoms, and optimize renders based on atom dependency. This avoids the need for memoization."),(0,o.kt)("p",{parentName:"blockquote"},"Jotai has two principles."),(0,o.kt)("ul",{parentName:"blockquote"},(0,o.kt)("li",{parentName:"ul"},"Primitive: Its basic interface is simple, like useState."),(0,o.kt)("li",{parentName:"ul"},"Flexible: Derived atoms can combine other atoms and enable useReducer style with side effects.\nJotai's core API is minimalistic and makes it easy to build utilities based upon it."))),(0,o.kt)("p",null,"As you can see from the main concepts outlined above, Jotai was inspired by ",(0,o.kt)("a",{parentName:"p",href:"https://recoiljs.org/"},"Recoil"),' (an experimental library created by Dave McCabe, a Software Engineer at Facebook) and was designed to solve some of the problems such as "provider hell" and unnecessary re-renders that we discussed when reviewing "Prop Drilling" and "Context" in the previous section. This makes it a perfect alternative for us to use.'),(0,o.kt)("h2",{id:"getting-started"},"Getting Started"),(0,o.kt)("p",null,"To begin working with Jotai, all we need to do is install it using npm, ie:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"npm i jotai\n")),(0,o.kt)("h2",{id:"defining-application-level-state"},"Defining Application Level State"),(0,o.kt)("p",null,'In Jotai, state values are defined as "atoms", essentially units of state that are both updatable and subscribable. When an atom is updated, any subscribed component will be re-rendered with the new value. This makes working with atoms very familiar, as the syntax and behaviour very closely resembles working with local state in components using the ',(0,o.kt)("a",{parentName:"p",href:"https://react.dev/reference/react/useState"},'"useState"')," hook."),(0,o.kt)("p",null,'To define atoms in Next.js, we will place them in a separate file, ie: "store.js". Since each atom represents a different unit of state, we can define as many as we wish in this file, ie:'),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"File:"),' "my-app/store.js"'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"import { atom } from 'jotai';\n\nexport const countAtom = atom(0);\nexport const countryAtom = atom('Japan');\nexport const citiesAtom = atom(['Tokyo', 'Kyoto', 'Osaka']);\nexport const mangaAtom = atom({ 'Dragon Ball': 1984, 'One Piece': 1997, 'Naruto': 1999 });\n")),(0,o.kt)("p",null,'Here, we have defined 4 atoms with varying default values from numbers, strings, arrays and objects. Each of these atoms can be directly referenced from any component in the tree and may be used just like "useState" (see below).'),(0,o.kt)("h3",{id:"async-default-values"},"Async Default Values"),(0,o.kt)("p",null,"There may be situations where you cannot hard-code default values into your atoms and instead must fetch them from an API, file, etc. To accommodate this, Jotai allows atoms to be defined using an ",(0,o.kt)("a",{parentName:"p",href:"https://jotai.org/docs/guides/async"},'"async function"'),", ie:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"export const postAtom = atom((async () => {\n  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');\n  const data = await res.json();\n\n  return data;\n})());\n")),(0,o.kt)("h2",{id:"reading--writing-state"},"Reading / Writing State"),(0,o.kt)("p",null,'To use any of the atoms defined in our "store.js" file, we must import both the ',(0,o.kt)("a",{parentName:"p",href:"https://jotai.org/docs/basics/primitives#use-atom"},'"useAtom"'),' function (from \'jotai\') as well as the specific atom that we wish to read from / write to. For example, if we wish to reference the "countryAtom" (defined above with a default value of "Japan"), we can use the following code:'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"import { useAtom } from 'jotai';\nimport { countryAtom } from '@/store';\n\nexport default function Country() {\n  const [country, setCountry] = useAtom(countryAtom);\n\n  return <>Country: {country}</>\n}\n")),(0,o.kt)("p",null,"Notice how ",(0,o.kt)("a",{parentName:"p",href:"https://jotai.org/docs/basics/primitives#use-atom"},'"useAtom"')," functions in a very similar way to ",(0,o.kt)("a",{parentName:"p",href:"https://react.dev/reference/react/useState"},'"useState"'),'. We can access the state directly from the atom and when it\'s updated (using "setCountry", in this case) any other components rendering the value from the countryAtom will also get updated.'),(0,o.kt)("h2",{id:"component-tree-example"},'"Component Tree" Example'),(0,o.kt)("p",null,'Now that we understand how state management works in Jotai, let\'s update our "Component Tree" example from the previous section to use it.'),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"NOTE:")," we do ",(0,o.kt)("em",{parentName:"p"},"not"),' need to modify the file "/pages/',"_",'app.js" as in previous examples. Instead we will create a new file: "store.js".')),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"File:"),' "my-app/store.js"'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"import { atom } from 'jotai';\n\nexport const countAtom = atom(0);\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"File:"),' "/components/Component3.js"'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"import { useAtom } from 'jotai';\nimport { countAtom } from '@/store';\n\nexport default function Component3() {\n  const [count, setCount] = useAtom(countAtom);\n  return <>Value: {count}</>\n}\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"File:"),' "/components/ComponentC.js"'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"import { useAtom } from 'jotai';\nimport { countAtom } from '@/store';\n\nexport default function ComponentC() {\n  const [count, setCount] = useAtom(countAtom);\n  return <button onClick={(e) => setCount(count + 1)}>Increase Value</button>\n}\n")),(0,o.kt)("p",null,"As you can see, we only had to create / modify 3 files:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"store.js"),": Defines our atoms (global state with optional default values)"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"component3.js"),": The component using the atom to display its value"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"componentC.js"),": The component using the atom to modify its value")),(0,o.kt)("p",null,'This is much cleaner than our previous approaches, with the added bonus of having the syntax feel very familiar. Additionally, our application / site no longer suffers from the performance hit caused by re-rendering all of the components in the tree; only "Component3" and "ComponentC" are re-rendered when the state changes.'),(0,o.kt)("p",null,"For more information including handling special cases, etc. please reference the ",(0,o.kt)("a",{parentName:"p",href:"https://jotai.org/"},'"official Jotai documentation"'),"."))}m.isMDXComponent=!0},8209:(e,t,n)=>{n(7294)}}]);