const logger = require('@alias/logger')('growi:service:GrowiRenderer');

const remark = require('remark');


const REMARK_CONFIGURERS_DEFAULT = [
  new (require('./remark/md2html'))(),
];

class GrowiRenderer {

  constructor(originRenderer) {
    this.remarkConfigurers = (originRenderer != null)
      ? originRenderer.remarkConfigurers
      : REMARK_CONFIGURERS_DEFAULT;
  }

  /**
   * Add Remark Configurers
   * @param {array} added Array for instances of Remark Configurer
   */
  addRemarkConfigurers(added) {
    if (added != null && added.length > 0) {
      logger.debug('Remark Configureres added: ', added);
    }

    this.remarkConfigurers = this.remarkConfigurers.concat(added);
    return this;
  }

  setup() {
    this.remark = remark();

    for (const remarkConfigurer of this.remarkConfigurers) {
      this.remark = remarkConfigurer.configure(this.remark);
    }

    return this;
  }

  process(markdown) {
    const tree = this.remark.processSync(markdown);
    logger.info(tree);
    return tree.toString();
  }

}

module.exports = GrowiRenderer;
