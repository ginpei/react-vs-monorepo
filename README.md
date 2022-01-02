# react-vs-monorepo

The `sub/` packages has React as a peer dep. Apps use it over npm-link.

To set up, run `npm ci` and `npm link ../sub/` in each app directory.

## Create React App

Works.

```console
$ cd app-cra
$ npm ci
$ npm link ../sub/
$ npm run start
```

## Next.js

Error.

```console
$ cd app-next
$ npm ci
$ npm link ../sub/
$ npm run dev
```

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

Error.


```console
$ cd app-vite
$ npm ci
$ npm link ../sub/
$ npm run dev
```

> Uncaught SyntaxError: The requested module '/…/react-vs-monorepo/sub/index.js' does not provide an export named 'useOne'
