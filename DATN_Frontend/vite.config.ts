import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
// export default defineConfig({
//   resolve: {
//     alias: [
//       { find: '@', replacement: path.resolve(__dirname, '/src') },
//       {
//         find: '@components',
//         replacement: path.resolve(__dirname, '/src/components'),
//       },
//       { find: '@pages', replacement: path.resolve(__dirname, '/src/pages') },
//     ],
//   },
//   plugins: [react()],

// });
