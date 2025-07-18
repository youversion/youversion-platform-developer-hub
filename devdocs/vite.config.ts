import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    exclude: [
      'OasProvider',
      'OperationList', 
      'createServer'
    ]
  }
}) 