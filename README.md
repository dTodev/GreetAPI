# GreetAPITask

Hi.

This is a simple app, calling a WP API and listing product results while providing simple filtering and sorting.

The server is configured with CORS so I had to bypass the browser checks by specifying proxy in the vite config file.

All functionalities as per the task are working, althought I do not like the way in which the filtering works as it only shows categories that are based on the results which the server have sent and that means not all existing categories are visible at all times. At least that is how I understood the task condition. I believe the better approach is to call https://greet.bg/wp-json/wc/store/products/categories and list all possible categories at all times so proper filtration can be made.

I have used simple styling through bootstrap to avoid spending too much time on aesthetics as the pure focus of the task is the logical part and data manipulation.

I am open for any improvements feedback!

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
