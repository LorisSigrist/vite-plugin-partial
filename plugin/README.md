# vite-plugin-partial


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

## Usage
After installing, you can use partials in any *entry point* html file. You do this by adding a `<vite-partial src="/my-partial.html"/>` tag. This will then inline the conents of `/my-partial.html`.