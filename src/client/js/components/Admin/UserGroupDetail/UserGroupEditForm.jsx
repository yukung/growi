import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import dateFnsFormat from 'date-fns/format';

import { createSubscribedElement } from '../../UnstatedUtils';
import AppContainer from '../../../services/AppContainer';
import UserGroupDetailContainer from '../../../services/UserGroupDetailContainer';
import { toastSuccess, toastError } from '../../../util/apiNotification';

class UserGroupEditForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: props.userGroupDetailContainer.state.userGroup.name,
      nameCache: props.userGroupDetailContainer.state.userGroup.name, // cache for name. update every submit
    };

    this.xss = window.xss;

    this.changeUserGroupName = this.changeUserGroupName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  changeUserGroupName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await this.props.userGroupDetailContainer.updateUserGroup({
        name: this.state.name,
      });

      toastSuccess(`Updated the group name to "${this.xss.process(res.data.userGroup.name)}"`);
      this.setState({ nameCache: this.state.name });
    }
    catch (err) {
      toastError(new Error('Unable to update the group name'));
    }
  }

  validateForm() {
    return (
      this.state.name !== this.state.nameCache
      && this.state.name !== ''
    );
  }

  render() {
    const { t, userGroupDetailContainer } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>
            <div className="border-bottom mt-2">
              {t('admin:user_group_management.basic_info')}
            </div>
          </legend>
          <div className="form-group row mt-2">
            <label htmlFor="name" className="col-sm-2 col-form-label">{t('Name')}</label>
            <div className="col-sm-4">
              <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.changeUserGroupName} />
            </div>
          </div>
          <div className="form-group row mt-2">
            <label className="col-sm-2 col-form-label">{t('Created')}</label>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                value={dateFnsFormat(new Date(userGroupDetailContainer.state.userGroup.createdAt), 'yyyy-MM-dd')}
                disabled
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-sm-2 col-sm-4">
              <button type="submit" className="btn btn-primary" disabled={!this.validateForm()}>{t('Update')}</button>
            </div>
          </div>
        </fieldset>
      </form>
    );
  }

}

UserGroupEditForm.propTypes = {
  t: PropTypes.func.isRequired, // i18next
  appContainer: PropTypes.instanceOf(AppContainer).isRequired,
  userGroupDetailContainer: PropTypes.instanceOf(UserGroupDetailContainer).isRequired,
};

/**
 * Wrapper component for using unstated
 */
const UserGroupEditFormWrapper = (props) => {
  return createSubscribedElement(UserGroupEditForm, props, [AppContainer, UserGroupDetailContainer]);
};

export default withTranslation()(UserGroupEditFormWrapper);
