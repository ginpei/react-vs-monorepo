# react-vs-monorepo

Quickly: run `npm link ../app/node_modules/react` to refer the same React.

From the official doc:

- [Invalid Hook Call Warning – React](https://reactjs.org/warnings/invalid-hook-call-warning.html)

> Assuming `myapp` and `mylib` are sibling folders, one possible fix is to run `npm link ../myapp/node_modules/react` from `mylib`.

## Problem

The `sub/` packages has React as a dep or a dev dep. The apps use the sub package as "../sub" probably or whatever:

```json
  "dependencies": {
    "@ginpei/x--react-vs-monorepo--sub": "../sub",
…
```

You will see the following error.

```
Uncaught Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.
```

This is because the sub package refers `sub/node_modules/react` while the app does `app-xxx/node_modules/react`. (In other word, it works if the sub package uses ONLY as peer dep.)

## Solution

You need 3 steps to the apps work:

1. Install the app and the sub package
2. Link to the app's React
3. Run the app

First, you need normal setup for the app and the sub package.

```console
$ cd app-cra/
$ npm ci
$ cd ../sub/
$ npm ci
```

Then link to the app's React. (This is the trick!)

```console
$ npm link ../app-cra/node_modules/react/
```

Now get back to the app, and run.

```console
$ cd ../app-cra/
$ npm run dev
```

`npm link` creates a link from `sub/node_modules/react` to `app-cra/node_modules/react/` so that both packages refers the same React resources.

## Create React App

```console
$ cd app-cra/
$ npm ci
$ cd sub/
$ npm ci
$ npm link ../app-cra/node_modules/react/
$ cd ../app-cra/
$ npm run start
```

## Next.js


```console
$ cd app-next/
$ npm ci
$ cd ../sub/
$ npm ci
$ npm link ../app-next/node_modules/react/
$ cd ../app-next/
$ npm run dev
```

## Vite

Works without link.

```console
$ cd app-vite
$ npm ci
$ npm run dev
```

Make sure you imported ES module version `*.mjs` that uses `export xxx` instead of `module.exports = xxx`.

```diff
- import { useOne } from "@ginpei/x--react-vs-monorepo--sub";
+ import { useOne } from "@ginpei/x--react-vs-monorepo--sub/index.mjs";
```
