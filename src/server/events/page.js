const debug = require('debug')('growi:events:page');
const { EventEmitter } = require('events');

class PageEvent extends EventEmitter {

  constructor(crowi) {
    super();

    this.crowi = crowi;
  }

  onCreate(page, user) {
    debug('onCreate event fired');

    if (page.path === '/Sidebar') {
      this.updateSidebarCache();
    }
  }

  onUpdate(page, user) {
    debug('onUpdate event fired');

    if (page.path === '/Sidebar') {
      this.updateSidebarCache();
    }
  }

  updateSidebarCache() {
    this.crowi.customizeService.initSidebar();
  }

}

module.exports = PageEvent;
