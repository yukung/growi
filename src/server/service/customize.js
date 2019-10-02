const logger = require('@alias/logger')('growi:service:CustomizeService'); // eslint-disable-line no-unused-vars

const GrowiRenderer = require('@commons/service/growi-renderer');
const BreaksConfigurer = require('@commons/service/remark/breaks');

/**
 * the service class of CustomizeService
 */
class CustomizeService {

  constructor(crowi) {
    this.crowi = crowi;
    this.configManager = crowi.configManager;
    this.appService = crowi.appService;
    this.xssService = crowi.xssService;

    this.sidebarContentCache = null;
    this.remarkRenderer = null;

    this.initGrowiRenderer();
  }

  initGrowiRenderer() {
    this.growiRenderer = new GrowiRenderer()
      .addRemarkConfigurers([
        new BreaksConfigurer(),
      ])
      .setup();
  }

  /**
   * initialize custom css strings
   */
  initCustomCss() {
    const uglifycss = require('uglifycss');

    const rawCss = this.configManager.getConfig('crowi', 'customize:css') || '';

    // uglify and store
    this.customCss = uglifycss.processString(rawCss);
  }

  getCustomCss() {
    return this.customCss;
  }

  getCustomScript() {
    return this.configManager.getConfig('crowi', 'customize:script') || '';
  }

  initCustomTitle() {
    let configValue = this.configManager.getConfig('crowi', 'customize:title');

    if (configValue == null || configValue.trim().length === 0) {
      configValue = '{{page}} - {{sitename}}';
    }

    this.customTitleTemplate = configValue;
  }

  async initSidebar() {
    const Revision = this.crowi.model('Revision');

    const revision = await Revision.findLatestRevision('/Sidebar');

    if (revision != null) {
      this.sidebarContentCache = this.growiRenderer.process(revision.body).toString();
    }
  }

  generateCustomTitle(page) {
    // replace
    const customTitle = this.customTitleTemplate
      .replace('{{sitename}}', this.appService.getAppTitle())
      .replace('{{page}}', page);

    return this.xssService.process(customTitle);
  }


}

module.exports = CustomizeService;
