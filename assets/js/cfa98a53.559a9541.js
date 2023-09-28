"use strict";(self.webpackChunkipc144=self.webpackChunkipc144||[]).push([[1553],{3905:(e,t,o)=>{o.d(t,{Zo:()=>u,kt:()=>h});var n=o(7294);function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function s(e,t){if(null==e)return{};var o,n,r=function(e,t){if(null==e)return{};var o,n,r={},a=Object.keys(e);for(n=0;n<a.length;n++)o=a[n],t.indexOf(o)>=0||(r[o]=e[o]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)o=a[n],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(r[o]=e[o])}return r}var l=n.createContext({}),c=function(e){var t=n.useContext(l),o=t;return e&&(o="function"==typeof e?e(t):i(i({},t),e)),o},u=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var o=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(o),m=r,h=p["".concat(l,".").concat(m)]||p[m]||d[m]||a;return o?n.createElement(h,i(i({ref:t},u),{},{components:o})):n.createElement(h,i({ref:t},u))}));function h(e,t){var o=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=o.length,i=new Array(a);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:r,i[1]=s;for(var c=2;c<a;c++)i[c]=o[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,o)}m.displayName="MDXCreateElement"},610:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var n=o(7462),r=(o(7294),o(3905));o(8209);const a={id:"welcome",title:"Welcome",sidebar_position:1,description:"Welcome"},i="Welcome to Web Programming for Apps and Services",s={unversionedId:"Introduction/welcome",id:"Introduction/welcome",title:"Welcome",description:"Welcome",source:"@site/docs/Introduction/welcome.md",sourceDirName:"Introduction",slug:"/Introduction/welcome",permalink:"/WebProgrammingForAppsAndServices/Introduction/welcome",draft:!1,editUrl:"hhttps://github.com/patrick-crawford/WebProgrammingForAppsAndServices/tree/master/docs/Introduction/welcome.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{id:"welcome",title:"Welcome",sidebar_position:1,description:"Welcome"},sidebar:"courseNotesSidebar",previous:{title:"Table of contents",permalink:"/WebProgrammingForAppsAndServices/"},next:{title:"Developer Tools",permalink:"/WebProgrammingForAppsAndServices/Introduction/dev-tools"}},l={},c=[{value:"Course introduction",id:"course-introduction",level:2},{value:"How can you get started?",id:"how-can-you-get-started",level:2},{value:"How to use these course notes",id:"how-to-use-these-course-notes",level:2},{value:"What do we expect from you?",id:"what-do-we-expect-from-you",level:2}],u={toc:c},p="wrapper";function d(e){let{components:t,...o}=e;return(0,r.kt)(p,(0,n.Z)({},u,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"welcome-to-web-programming-for-apps-and-services"},"Welcome to Web Programming for Apps and Services"),(0,r.kt)("p",null,"Welcome to the Web Programming for Apps and Services course. This document has information that helps you get started in the course."),(0,r.kt)("h2",{id:"course-introduction"},"Course introduction"),(0,r.kt)("p",null,"In this course, you will learn to create web client (front end, in the browser) apps that work with a web service (back end, in the server). The apps will enable entry-level functionality, which can be hosted on-premise or in the cloud."),(0,r.kt)("p",null,"Throughout the learning process, you will learn foundational concepts, skills, and technologies that will enable you to create high-quality intermediate and advanced-level web applications in the future. These foundations will include:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"JavaScript"),(0,r.kt)("li",{parentName:"ul"},"Web API (web services) on a modern server stack (Node.js, Express.js, and MongoDB)"),(0,r.kt)("li",{parentName:"ul"},"The concept (and application) of front end web client development"),(0,r.kt)("li",{parentName:"ul"},"The React and Next.js libraries")),(0,r.kt)("h2",{id:"how-can-you-get-started"},"How can you get started?"),(0,r.kt)("p",null,"Get familiar with the course content online."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Using your own personal computer")),(0,r.kt)("p",null,"The student will use a number of applications and development tools, including:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"A modern web app execution environment (Node.js, Express.js, MongoDB)"),(0,r.kt)("li",{parentName:"ul"},"Visual Studio Code"),(0,r.kt)("li",{parentName:"ul"},"Various code generators")),(0,r.kt)("p",null,"During the course, the professor(s) will guide the student in the installation, configuration, and use of the software."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Please be aware of the following:"),(0,r.kt)("p",{parentName:"blockquote"},"If you have problems or difficulties using your own personal computer for course work, your professor will not be able to provide technical support. In a problem scenario, you are still expected to complete your work on time. A problematic personal computer ",(0,r.kt)("em",{parentName:"p"},"cannot")," be used as an excuse for delays in completing the course work.")),(0,r.kt)("h2",{id:"how-to-use-these-course-notes"},"How to use these course notes"),(0,r.kt)("p",null,"Every class/session will reference the notes posted here"),(0,r.kt)("p",null,"Before you come into a class, you are expected to read and process the topics covered in the notes."),(0,r.kt)("p",null,"The format and style of the notes pages will vary. At times, they will be terse, with headings and keywords that are intended to guide the student through the topics. At other times, they will be lengthy, with narrative that explains and supports the topics. Expect a full range of formats and styles between these extremes."),(0,r.kt)("p",null,"Class/sessions are important. The notes do not attempt to capture everything that must be communicated in the process of learning a topic."),(0,r.kt)("h2",{id:"what-do-we-expect-from-you"},"What do we expect from you?"),(0,r.kt)("p",null,"Before the class in which there's a test, we expect you to prepare for the class. This means:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Read and study the notes"),(0,r.kt)("li",{parentName:"ul"},"Read and study the linked documents"),(0,r.kt)("li",{parentName:"ul"},"Make your own notes, including questions that you have")),(0,r.kt)("p",null,"In other words, do not come into the classroom expecting somehow to soak up knowledge like a sponge. You need to prepare before class, so that you understand the topics and their context."),(0,r.kt)("p",null,"In the Lecture class, we expect you to be an engaged and actively-learning participant. This means:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Listening effectively"),(0,r.kt)("li",{parentName:"ul"},"Asking and answering questions"),(0,r.kt)("li",{parentName:"ul"},"Writing notes"),(0,r.kt)("li",{parentName:"ul"},"Doing the in-class exercises and activities")),(0,r.kt)("p",null,"Before the lab session of the week, we also expect you to prepare for the class. This means:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Being prepared to split your time between new topic learning, and working hands-on with the topic or the current assignment"),(0,r.kt)("li",{parentName:"ul"},"Asking and answering questions"),(0,r.kt)("li",{parentName:"ul"},"Writing notes"),(0,r.kt)("li",{parentName:"ul"},"Read and study the current assignment"),(0,r.kt)("li",{parentName:"ul"},"Practice its contents, and/or get started on its contents")),(0,r.kt)("p",null,"Regarding the workload, it will simply not be possible to confine this course's learning experience to the scheduled class time. We expect you to spend some of the in-class time working on the assignments, but you must spend time out-of-class to complete the work."),(0,r.kt)("p",null,"That being said, you will encounter problems and delays. Please follow a general rule: If you cannot solve the problem within 20 to 30 minutes, then stop and set it aside. Seek help from your professor, during class time, or during the designated help time or office hours. Alternatively, seek help from a classmate ",(0,r.kt)("em",{parentName:"p"},"who knows the solution")," to the problem."),(0,r.kt)("p",null,"Do not waste time. Do not attempt to wrestle the problem to the ground. Others will not think any less of you when you ask for help. You're here to learn, so take advantage of the course's resources and delivery to help you learn."))}d.isMDXComponent=!0},8209:(e,t,o)=>{o(7294)}}]);