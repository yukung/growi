const logger = require('@alias/logger')('growi:service:remark:GrowiRenderer');

const RemarkConfigurer = require('./remark-configurer');

class Md2HtmlConfigurer extends RemarkConfigurer {

  constructor(sanitizeOption = {}) {
    super();

    this.tagWhiteList = sanitizeOption.tagWhiteList || require('../xss/recommended-whitelist').tags;
    this.attrWhiteList = sanitizeOption.attrWhiteList || require('../xss/recommended-whitelist').attrs;
  }

  configure(remark) {
    const schema = this.generateSanitizeSchema();

    return remark
      .use(require('remark-rehype'), { allowDangerousHTML: true })
      .use(require('rehype-raw'))
      .use(require('rehype-sanitize'), schema)
      .use(require('rehype-stringify'));
  }

  /**
   * Generate schema object that will be passed to rehype-sanitize
   * @see https://github.com/syntax-tree/hast-util-sanitize#schema
   */
  generateSanitizeSchema() {
    return {
      tagNames: this.tagWhiteList,
      attributes: {
        '*': this.attrWhiteList,
      },
    };
  }

}

module.exports = Md2HtmlConfigurer;
