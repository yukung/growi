import { Container } from 'unstated';
import loggerFactory from '@alias/logger';

import { pathUtils } from 'growi-commons';
import urljoin from 'url-join';
import removeNullPropertyFromObject from '../../../lib/util/removeNullPropertyFromObject';

const logger = loggerFactory('growi:security:AdminGoogleSecurityContainer');

/**
 * Service container for admin security page (GoogleSecurityManagement.jsx)
 * @extends {Container} unstated Container
 */
export default class AdminGoogleSecurityContainer extends Container {

  constructor(appContainer) {
    super();

    this.appContainer = appContainer;

    this.state = {
      retrieveError: null,
      callbackUrl: urljoin(pathUtils.removeTrailingSlash(appContainer.config.crowi.url), '/passport/google/callback'),
      googleClientId: '',
      googleClientSecret: '',
      isSameEmailTreatedAsIdenticalUser: false,
    };


  }

  /**
   * retrieve security data
   */
  async retrieveSecurityData() {
    try {
      const response = await this.appContainer.apiv3.get('/security-setting/');
      const { googleOAuth } = response.data.securityParams;
      this.setState({
        googleClientId: googleOAuth.googleClientId,
        googleClientSecret: googleOAuth.googleClientSecret,
        isSameEmailTreatedAsIdenticalUser: googleOAuth.isSameEmailTreatedAsIdenticalUser,
      });
    }
    catch (err) {
      this.setState({ retrieveError: err });
      logger.error(err);
      throw new Error('Failed to fetch data');
    }
  }

  /**
   * Workaround for the mangling in production build to break constructor.name
   */
  static getClassName() {
    return 'AdminGoogleSecurityContainer';
  }

  /**
   * Change googleClientId
   */
  changeGoogleClientId(value) {
    this.setState({ googleClientId: value });
  }

  /**
   * Change googleClientSecret
   */
  changeGoogleClientSecret(value) {
    this.setState({ googleClientSecret: value });
  }

  /**
   * Switch isSameEmailTreatedAsIdenticalUser
   */
  switchIsSameEmailTreatedAsIdenticalUser() {
    this.setState({ isSameEmailTreatedAsIdenticalUser: !this.state.isSameEmailTreatedAsIdenticalUser });
  }

  /**
   * Update googleSetting
   */
  async updateGoogleSetting() {
    const { googleClientId, googleClientSecret, isSameEmailTreatedAsIdenticalUser } = this.state;

    let requestParams = {
      googleClientId, googleClientSecret, isSameEmailTreatedAsIdenticalUser,
    };

    requestParams = await removeNullPropertyFromObject(requestParams);
    const response = await this.appContainer.apiv3.put('/security-setting/google-oauth', requestParams);
    const { securitySettingParams } = response.data;

    this.setState({
      googleClientId: securitySettingParams.googleClientId,
      googleClientSecret: securitySettingParams.googleClientSecret,
      isSameEmailTreatedAsIdenticalUser: securitySettingParams.isSameEmailTreatedAsIdenticalUser,
    });
    return response;
  }

}
