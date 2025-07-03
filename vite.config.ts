import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'
import { vitePluginForArco } from '@arco-plugins/vite-react'
// import AutoImport from 'unplugin-auto-import/vite'
// import postCssPxToRem from 'postcss-pxtorem'
// import postcsspxToViewport from 'postcss-px-to-viewport'
import autoprefixer from 'autoprefixer'
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd())

  const { VITE_API_URL } = viteEnv
  return {
    plugins: [
      react(),
      tailwindcss(),
      viteCompression({
        threshold: 1024 * 5 // 对大于 1k * x 的文件进行压缩
      }),
      vitePluginForArco({}),
    ],
    resolve: {
      alias: {
        '@': '/src',
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            console.log('id:', id);

            if (id.includes('node_modules')) {
              // 将 node_modules 中的依赖打包成单独的 chunk
              // return id.toString().split('node_modules/')[1].split('/')[0].toString();
              return 'vendor'
            }
            if (id.includes('src/components')) {
              // 将 src/components 中的组件打包成单独的 chunk
              return id.toString().split('src/components/')[1].split('/')[0].toString();
            }
          }
        }
      }
    },
    esbuild: {
      // drop: ['console', 'debugger'],
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({})

          // postCssPxToRem({
          // rootValue: 12,
          // propList:['*'],
          //   unitPrecision: 5, // 转换后的精度
          //   selectorBlackList: [], // 忽略转换的选择器
          //   replace: true, // 替换而不是添加
          //   mediaQuery: false, // 是否允许在媒体查询中转换px
          //   minPixelValue: 0 // 小于或等于此值的px不会被转换
          // }),
          // postcsspxToViewport({
          //   unitToConvert: 'px', // 需要转换的单位，默认为"px"
          //   viewportWidth: 1200, // 设计稿的视口宽度
          //   unitPrecision: 5, // 单位转换后保留的精度
          //   propList: ['width', 'height'], // 能转化为vw的属性列表
          //   viewportUnit: 'vw', // 希望使用的视口单位
          //   fontViewportUnit: 'vw', // 字体使用的视口单位
          //   selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
          //   minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
          //   mediaQuery: false, // 媒体查询里的单位是否需要转换单位
          //   replace: true, //  是否直接更换属性值，而不添加备用属性
          //   exclude: undefined, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          //   include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换
          //   landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
          //   landscapeUnit: 'vw', // 横屏时使用的单位
          //   landscapeWidth: 1920 // 横屏时使用的视口宽度
          // }),
        ]
      }
    },
    server: {
      proxy: {
        '/api': {
          target: VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      }
    }
  }
})

