import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [
//         react(),
//     ],
//     resolve: {
//         alias: {
//             '@': path.resolve(__dirname, './src'),
//         },
//     },
// });


export default defineConfig(({command, mode})=>{
    return {
        plugins:[
            react(),
        ],
        resolve:{
            alias:{
                '@': path.resolve(__dirname, './src'),
            }
        },
        server:{
            cors: true,
            port: 8848,
            open: true,
            host: true,
            proxy:{
                '/api':{
                    target: loadEnv(mode, process.cwd()).VITE_API_URL,
                    changeOrigin: true,
                }
            }
        }
    }
})
