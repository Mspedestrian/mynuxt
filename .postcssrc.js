module.exports = {
  'plugins': {
    'postcss-px2rem-exclude': {
      remUnit: 75,
      exclude: /node_modules|mint-ui/i
      // exclude: /pages|pc/i
    }
  }
}