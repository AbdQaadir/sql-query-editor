# PROJECT OVERVIEW

This is a dummy project that mimicks how an sql editor functions. It allows users to view data on listed tables and also filter the rendered data based on their desired search parameters.

## FEATURES

1. **Sidebar Navigation System:** It has an easy to use sidebar for quick navigations of the whole database table.
2. **Additonal Tab based interface**: This interface is located just above the code editor. It allows users to quickly switch between opened tabs and also be able to close tabs that are no longer useful.
3. **Rich Code Editor**: This application uses a Monaco Code Editor for better Experience while writing the query.
4. **Dynamic Rendering of data**: The data being rendered on the table is dynamic. User can search for a particular data and also be able to limit the number of rows to be displayed at once.

## CORE TECHNICAL STACKS

- JavaScript Framework: [React JS](https://facebook.github.io/create-react-app)
- UI Component: [Chakra UI](https://chakra-ui.com/)
- Table: [Tanstack React Table V7](https://react-table-v7.tanstack.com/)
- Code Editor [Monaco Editor](https://www.npmjs.com/package/@monaco-editor/react)

## PAGE LOAD TIME

The page load time and other metrics were calculated using [https://pagespeed.web.dev/](https://pagespeed.web.dev/) after the project has been deployed through Netlify, and below is the breakdown:\

Speed Index = 0.6s.\
Time to interactive = 0.6s.\
Total Blocking Time = 30ms.\

## OPTIMIZATIONS

1. Proper Code Splitting for improved code readability and code bundling.
2. Use of Self-hosted Open Source fonts using [Font Source](https://fontsource.org/fonts/poppins), thereby eliminating extra (render blocking) network request if CDN had to be used.
3. Use of custom hook called to optimize the process of fetching the data remotely.
4. Implemented a cache functionality which is sychronized to the user's sessionStorage. This eliminates multiple api calls on a single query tab.
5. The table header and body data is being optimized using the \*_useMemo_ hook.

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs the dependencies needed for the app to run.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
