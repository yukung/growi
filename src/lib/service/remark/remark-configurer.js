/**
 * Base Class for Remark Plugin configuration
 */
class RemarkConfigurer {

  configure(remark) {
    throw new Error('implement this');
  }

}

module.exports = RemarkConfigurer;
