# react-vs-monorepo

The `sub/` packages has React as a peer dep. Apps use it over npm-link.

To set up, run `npm ci` and `npm link ../sub/` in each app directory.

## Create React App

Error.

```console
$ cd app-cra
$ npm ci
$ npm link ../sub/
$ npm run start
```

```
Uncaught Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.
    at resolveDispatcher (react.development.js:1476)
    at useState (react.development.js:1507)
    at useOne (index.mjs:4)
    at App (App.js:6)
    at renderWithHooks (react-dom.development.js:14985)
    at mountIndeterminateComponent (react-dom.development.js:17811)
    at beginWork (react-dom.development.js:19049)
    at HTMLUnknownElement.callCallback (react-dom.development.js:3945)
    at Object.invokeGuardedCallbackDev (react-dom.development.js:3994)
    at invokeGuardedCallback (react-dom.development.js:4056)
```

If you removed `react` from `devDependencies`, it works.

## Next.js

Error.

```console
$ cd app-next
$ npm ci
$ npm link ../sub/
$ npm run dev
```

```
Unhandled Runtime Error

Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.
```

If you removed `react` from `devDependencies`, it throws another error.

![](./docs/module-not-found-cant-resolve-react.png)

> Failed to compile
> 
> ../sub/index.js:1:0  
> Module not found: Can't resolve 'react'
> 
> ```
> > 1 | const React = require('react');
>   2 | 
>   3 | module.exports.useOne = function() {
>   4 |   const [one] = React.useState(1);
> ```
> 
> Import trace for requested module:
> ./pages/index.js
> 
> https://nextjs.org/docs/messages/module-not-found

## Vite

Works.

```console
$ cd app-vite
$ npm ci
$ npm link ../sub/
$ npm run dev
```

Make sure you imported ES module version `*.mjs` that uses `export xxx` instead of `module.exports = xxx`.

```diff
- import { useOne } from "@ginpei/x--react-vs-monorepo--sub";
+ import { useOne } from "@ginpei/x--react-vs-monorepo--sub/index.mjs";
```
