module.exports = {
  html        : false,
  images      : true,
  fonts       : true,
  static      : false,
  svgSprite   : true,
  ghPages     : false,
  stylesheets : {
    autoprefixer: {
      browsers: "last 2 versions, > 5% in GB, ie >= 10, Safari >= 8"
    }
  },

  javascripts: {
    entry: {
      app: ["./app.js"]
    }
  },

  svgSprite: {
    svgstore: {
      inlineSvg: true
    }
  },

  browserSync: {
    proxy: 'http://localhost/work/fournet/web',
    path: 'wp-content/themes/fournet/assets',
    files: ['themes/fournet/assets']
  },

  production: {
    rev: false
  }
}
