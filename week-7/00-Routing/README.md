# Week 7 Class 1

## Routing

1. Install `react-router-dom` using npm:
    ```
    npm install react-router-dom
    ```

2. Import `react-router-dom` to gain access to its components:
    ```javascript
    import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
    ```

3. Components provided by `react-router-dom`:
    - `BrowserRouter`
    - `Route`
    - `Routes`
    - `useNavigate`

4. Routing structure in React.js:
    - `BrowserRouter` wraps `Routes`.
    - Inside `Routes`, use `Route` for each route.

## Lazy Loading

- Lazy loading defers loading of content until it's requested, helping optimize website performance.
- It's particularly useful for websites with a lot of content.

### Syntax:
```javascript
const MyLazy = React.lazy(() => import("component_path"));

<Route path='/hello3' element={<Suspense fallback='Loading...'><MyLazy/></Suspense>}/>
```

- The `Suspense` component is necessary to handle asynchronous data handling.

### Checking Network Tab:

- View separate requests being made in the network tab when lazy routes are clicked.
- Note: Requests are cached; clear the browser cache to see new requests.

## Prop Drilling and Context API

- Prop drilling refers to the process of passing props down through multiple layers of components, even if intermediate components don't utilize these props.
- Context API provides a solution to avoid prop drilling by allowing data to be passed through the component tree without having to pass props manually at every level.
-
- ![Prop Drilling and ContextAPI](https://github.com/vidit-od/100x-/assets/82703629/22f2762c-2dc6-4c1d-868e-c89d9c8f1475)
