const RemarkConfigurer = require('./remark-configurer');

class HtmlConfigurer extends RemarkConfigurer {

  configure(remark) {
    return remark.use(require('remark-html'));
  }

}

module.exports = HtmlConfigurer;
