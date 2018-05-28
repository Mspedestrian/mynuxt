module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      // { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'viewport', content: 'user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [{
      type: 'text/javascript',
      // 加入flexible布局js，这个作为innerHTML引入，直接写在html内部
      innerHTML: require('./assets/js/flexible.js')
    }],
    // script标签下的内容不进行<>转义
    __dangerouslyDisableSanitizers: ['script'],
  },
  /*
  ** Global CSS
  */
  css: [
    // '~/assets/css/main.less',
    { src: '~/assets/css/main.less', lang: 'less' },
    '~/assets/css/ui-box.css'
  ],
  plugins: [
    '~plugins/axios',
    { src: '~plugins/client-only', ssr: false },
    { src: '~plugins/mint.config', ssr: false }
  ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios','~/assets/js/zepto.js',],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push(
        // {
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/
        // }
        
        )
      }
    }
  }
}
