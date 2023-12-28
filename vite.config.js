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
      '@': '/src' // 这里根据你的项目结构进行修改  
    }  
  },  
  cors: {  
    // 在这里添加 CORS 配置  
    // 例如：允许来自特定源的请求  
    allowedOrigins: ['http://localhost:5173'],  
    // 其他 CORS 配置项...  
  }  
}
)