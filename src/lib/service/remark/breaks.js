const RemarkConfigurer = require('./remark-configurer');

class BreaksConfigurer extends RemarkConfigurer {

  configure(remark) {
    return remark.use(require('remark-breaks'));
  }

}

module.exports = BreaksConfigurer;
