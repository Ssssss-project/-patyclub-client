module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
           @import "@/assets/scss/App.scss";
        `
      }
    }
  },

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },

  transpileDependencies: [
    'quasar'
  ]
};
