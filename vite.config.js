import { defineConfig } from 'vite'  
import vue from '@vitejs/plugin-vue'  

export default defineConfig({ 
  base: "/Steam/",
  build: {
    outDir: "docs"
  },
  plugins: [  
    vue(),  
  ],  
  resolve: {  
    alias: {  
      '@': '/src'
    }  
  },  
}
)