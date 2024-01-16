import { defineConfig } from 'vite'  
import vue from '@vitejs/plugin-vue'  

export default defineConfig({ 
  base: "/Steam-play/",
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
  //   server:{
  //   proxy:{
  //     '/api':{
  //       target:"http://43.138.190.46:9527", //跨域地址
  //       changeOrigin:true, //支持跨域
  //       rewrite:(path) => path.replace(/^\/api/, "")
  //     }
  //   }
  // }
}
)