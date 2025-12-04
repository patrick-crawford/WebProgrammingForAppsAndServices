---
id: improving-optimizing-performance
title: Improving / Optimizing Performance
sidebar_position: 2
description: Improving / Optimizing Performance
---

# Improving / Optimizing Performance

As we have discovered in the [Analyzing Performance](Performance-Optimizations/analyzing-performance.md) section, our web app for this topic may have some room for improvement when it comes to performance:

![Lighthouse Report Detailed](/img/lighthouse-3.png)

Fortunately, Next.js has a few techniques that we can use to improve these numbers before doing a production build:

### Using the &lt;Image /&gt; Component

The custom [Image component](https://nextjs.org/docs/pages/api-reference/components/image) included with Next.js is an alternative to the native &lt;img /&gt; element and offers a number of optimizations, including:

- **Improved Performance**: Always serve correctly sized image for each device, using modern image formats
- **Visual Stability**: Prevent Cumulative Layout Shift automatically
- **Faster Page Loads**: Images are only loaded when they enter the viewport, with optional blur-up placeholders
- **Asset Flexibility**: On-demand image resizing, even for images stored on remote servers

Let's update our app to use the Image component and look at some of its main features:

1. Add the correct "import" statement for the Image component

```js
import Image from 'next/image';
```

2. Remove the current &lt;img ... /&gt; component and **replace it** with the following:

```jsx
<Image
  src="/theatre-bkrd.jpg"
  alt="theatre background"
  className={styles.headerImage}
  sizes="100vw"
  width={800}
  height={232}
  priority
/>
```

Notice that we have provided a number of additional properties to the "Image" element, specifically:

<!-- prettier-ignore-start -->
```js
sizes="100vw"
```
<!-- prettier-ignore-end -->

- This property provides information on how wide the image should be at different breakpoints, for more information on the "sizes" property, see: ["sizes" in the Image documentation](https://nextjs.org/docs/pages/api-reference/components/image#sizes)

<!-- prettier-ignore-start -->
```js
width={800}
height={232}
```
<!-- prettier-ignore-end -->

- These properties represent the _original_ width in pixels.

<!-- prettier-ignore-start -->
```js
priority
```
<!-- prettier-ignore-end -->

- When set, [**priority**](https://nextjs.org/docs/pages/api-reference/components/image#priority) will mark the image as "priority" causing it to [preload](https://web.dev/preload-responsive-images/). Using "priority" in this case was recommended as this image was detected as the "Largest Contentful Paint (LCP)" element, as seen in the browser console:

  > "Image with src "/theatre-bkrd.jpg" was detected as the Largest Contentful Paint (LCP). Please add the "priority" property if this image is above the fold"

If you inspect the image in the browser console, you should see that it now has a number of extra properties, including

- **srcset:** This is the "source set", which identifies different urls for images to be served at different viewport widths (breakpoints). By default the following [device sizes](https://nextjs.org/docs/pages/api-reference/components/image#devicesizes) are used: 640, 750, 828, 1080, 1200, 1920, 2048, 3840.

  You can see how Next.js has associated each device size with a url based on our original url, ie: the 640 width is set to serve: "/\_next/image?url=%2Ftheatre-bkrd.jpg&**w=640**&q=75", whereas the 750 width is set to serve: "\_next/image?url=%2Ftheatre-bkrd.jpg&**w=750**&q=75". If you try opening each of these images, you will see that Next.js has correctly scaled them to match the widths.

  :::info
  Next.js will only scale images _down_ in size (not up), therefore the image for the 2048 width: "\_next/image?url=%2Ftheatre-bkrd.jpg&**w=2048**&q=75", simply renders our original image (800px x 232px).
  :::

  You will also notice that the source images have additional query parameter: "q". This represents the "quality" of the image, as Next.js will automatically optimize the original image to provide varying levels of quality. By default the quality setting is set to 75, however it can be changed using the [quality](https://nextjs.org/docs/pages/api-reference/components/image#quality) property.

- **decoding:** Next.js sets the [decoding](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decoding) value to "async", which is done to "reduce delay in presenting other content".

#### Remote Images

If you attempt to use a remote image with the Image component, ie:

```jsx
<Image
  src="https://www.senecapolytechnic.ca/content/dam/projects/seneca/campus-photos/magna-hall_tile.jpg"
  className={styles.headerImage}
  width={600}
  height={386}
/>
```

You will see the following error:

```console
Error: Invalid src prop (https://www.senecapolytechnic.ca/content/dam/projects/seneca/campus-photos/magna-hall_tile.jpg) on `next/image`, hostname "www.senecapolytechnic.ca" is not configured under images in your `next.config.mjs`
See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host
```

If we navigate to the link in ["more info"](https://nextjs.org/docs/messages/next-image-unconfigured-host), we will see that the error occurred because the "src" value uses a hostname in the URL that isn't defined in the images.remotePatterns in next.config.mjs. This is done to ensure that only images from approved domains are able to use the Next.js image optimization API.

To solve this problem, open the "next.config.mjs" file, and update the **nextConfig** object to include an "images" property with "[remotePatterns](https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns)":

**File:** "next.config.mjs"

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  //...

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.senecapolytechnic.ca',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
```

### Dynamically Importing Libraries

Next.js supports ["Lazy Loading"](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading) for external libraries with "import" as well as [images](https://nextjs.org/docs/pages/api-reference/components/image#loading). In larger apps, this can have an impact on metrics such as Largest Contentful Paint (LCP) and First Input Delay (FID) due to the smaller bundle size that is required on the first page load.

You will notice that our example includes the library ["lodash"](https://lodash.com) near the top of the index.js file as:

```js
import _ from 'lodash';
```

However, the only lodash function that is used is within the "filterResults(data, searchText)" function:

```js
function filterResults(data, searchText) {
  setFilteredResults(
    _.filter(data, (movie) => movie.title.toLowerCase().includes(searchText.toLowerCase()))
  );
}
```

This function only gets invoked once the user starts typing in the "search" field. As such, we can potentially improve our performance by only loading the "lodash" library when it's required (ie: once the user starts typing).

:::info
Technically, lodash is not required in this case, as the native ["filter()"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method would also work here. However, this example highlights the syntax for dynamic imports, so we'll keep it in.
:::

To dynamically import "\_" from lodash we first **remove** it from the top of the file:

```js
// import _ from 'lodash';
```

and insert it in our "filterResults" function using "await" and "default", ie:

```js
async function filterResults(data, searchText) {
  const _ = (await import('lodash')).default;
  setFilteredResults(
    _.filter(data, (movie) => movie.title.toLowerCase().includes(searchText.toLowerCase()))
  );
}
```

Notice how we updated our filterResults to use "async" - this was required as we must use "await" to wait for "lodash" to finish importing before we can use it in the "setFilterResults" function.

You can confirm that this is working if you open the "network" tab in the Developer Tools and refresh the app. You should see "node_modules_lodash_lodash_js.js" appear in the list once you start typing:

![Lodash Dynamically Imported](/img/dynamic-import-network.png)

### Dynamically Importing Components

Components can also be dynamically imported to reduce the initial bundle size and improve your performance.

In our application we use a number of components to render the UI, primarily from 'react-bootstrap": "Container", "Row", "Col", "Card" and "Accordion". In addition to these, we also include a custom component: **"StarRating"** that is only visible once a user clicks on an accordion header to view the content (Rating and Plot Summary). Like our above "lodash" example, this is a perfect candidate for dynamic loading, as it is not visible / required until a user initiates the an action.

If we wish to dynamically load the "StarRating" component, we must update our code as follows:

1. As before, remove the initial import:

```js
// import StarRating from '@/components/StarRating';
```

2. Import the "dynamic" function from 'next/js'

```js
import dynamic from 'next/dynamic';
```

3. Import the "StarRating" component using the "dynamic" function (included above), making sure to set the [loading property](https://nextjs.org/docs/pages/guides/lazy-loading#nextdynamic):

```js
const StarRating = dynamic(() => import('@/components/StarRating'), {
  loading: () => <>Loading...</>,
});
```

4. Create a flag in the "state" to track when the accordion has been opened:

```js
const [accordionOpened, setAccordionOpened] = useState(false);
```

5. Add an ["onSelect"](https://react-bootstrap.github.io/docs/components/accordion#accordion) event to the &lt;Accordion className="mt-4"&gt;...&lt;/Accordion&gt; element so that we can execute code once the user opens the accordion.

```jsx
<Accordion className="mt-4" onSelect={accordionSelected}>
  ...
</Accordion>
```

6. Write the "accordionSelected" function to set the "accordionOpened" flag to true (after 200 seconds, to ensure that the animation is completed)

```js
function accordionSelected(eventKey, e) {
  setTimeout(() => {
    setAccordionOpened(true);
  }, 200); // allow for the accordion animation to complete
}
```

7. Ensure that the "StarRating" component is only shown once the "accordionOpened" flag has been set:

```jsx
<strong>Rating:</strong> {accordionOpened && <StarRating rating={movie.rating} />}
```

Once again, you can confirm that this is working if you open the "network" tab in the Developer Tools and refresh the app. You should see "components_StarRating_js.js" appear in the list once you open the first accordion section:

![Component Dynamically Imported](/img/dynamic-component-import-network.png)

Additionally, you should temporarily see the text **"Loading..."** in place of the star rating the first time this component is loaded.

### Refactoring to use SSG

If at all possible, we would ideally like to **pre-render** as much of the page as we can. This can help reduce the time to first render and improve application performance. The home page for our practice "app" is a good candidate for SSG, since this is simply a static list of movies that isn't likely to change frequently. We have seen how this works when [discussing Handling Events &amp; Rendering Data](/Handling-Events-Rendering-Data/adding-API-data#fetching-api-data-for-pre-rendered-html), so let's take what we have learned there and apply it to our Film Collection app as a final optimization before going to production:

1. Remove the import for useSWR as we will no longer need it:

```js
//import useSWR from 'swr';
```

2. Remove the 'fetcher' definition used by SWR:

```js
// const fetcher = (url) => fetch(url).then((res) => res.json());
```

3. Import the same "getMovieData()" function that your API uses to fetch the movie data. This will be used by "getStaticProps", since this function is also [executed on the server](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props#when-does-getstaticprops-run).

```js
import getMovieData from '@/lib/movieData';
```

4. Add a "getStaticProps" function above the "Home" component definition:

```js
export function getStaticProps() {
  const data = getMovieData();
  return { props: { staticMovies: data } };
}
```

5. Update the "Home" component function definition to accept "props" (specifically, the "staticMovies" prop)

```js
export default function Home({staticMovies})
```

6. Remove the "useSWR" function call (since we will no longer be needing it to obtain the data):

```js
//const { data, error } = useSWR(`/api/movies`, fetcher);
```

7. Update the "useState()" hook for "filteredResults" to use "staticMovies" as the default value:

```js
const [filteredResults, setFilteredResults] = useState(staticMovies);
```

8. Update our "useEffect()" hook to only watch for changes in "searchText" (since we no longer have "data" from SWR)

```js
useEffect(() => {
  if (searchText) filterResults(staticMovies, searchText);
}, [searchText]);
```

To confirm this is working, once again refresh the page. You can either view the Page Source directly to see all of the movie details in HTML, or view the "localhost" entry in the "network tab" of the Developer Tools. If you "Preview" the results, you will see an unstyled version of the page with the details for each movie visible.

### Final Lighthouse Run

As a final check before our production build, let's re-run Lighthouse to confirm that our optimizations have helped to improve the Core Web Vitals of our app:

![Final Lighthouse Run](/img/lighthouse-4.png)
