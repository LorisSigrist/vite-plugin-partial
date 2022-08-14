# Vite-Plugin-Partial
`vite-plugin-partial` allows you to insert blocks of external html into your html.

Let's say you have a bunch of meta tags at the start of your document, and they are getting in the way. With partials, you can just move them into a seperate file, and insert them into the original file. 

```html
//index.html - src
<html>
  <head>
      <vite-partial src="/meta.html"/>
      ...
  </head>
  ...
</html>
```

```html
//meta.html
<meta name="author" content="John Doe">
<meta name="description" content="Lorem Ipsum">
```

This will result in the partial being inlined where the partial tag was.

```html - output
//index.html
<html>
  <head>
      <meta name="author" content="John Doe">
      <meta name="description" content="Lorem Ipsum">
      ...
  </head>
  ...
</html>
```


## Installation
```bash
npm install --save-dev vite-plugin-partial
```

```javascript
// vite.config.js
import vitePluginPartial from 'vite-plugin-partial'

export default defineConfig({
  plugins: [vitePluginPartial()]
})
```

## Notes
- `<vite-partial>`'s `src` attribute can be an absolute or a relative path
- Partials can include other partials, as long as they don't cause circular insertions.
- You can put children into a `<vite-partial>` tag, but they will be ignored.
- Do not nest `<vite-partial>` tags