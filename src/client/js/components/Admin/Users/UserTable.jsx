import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import dateFnsFormat from 'date-fns/format';

import UserPicture from '../../User/UserPicture';
import UserMenu from './UserMenu';

import { createSubscribedElement } from '../../UnstatedUtils';
import AppContainer from '../../../services/AppContainer';
import AdminUsersContainer from '../../../services/AdminUsersContainer';

class UserTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };

    this.getUserStatusLabel = this.getUserStatusLabel.bind(this);
  }

  onClickColumnSort(sortName) {
    // TODO send array to AdminUserContainer.js (GW1227)
  }

  /**
   * return status label element by `userStatus`
   * @param {string} userStatus
   * @return status label element
   */
  getUserStatusLabel(userStatus) {
    let additionalClassName;
    let text;

    switch (userStatus) {
      case 1:
        additionalClassName = 'label-info';
        text = 'Approval Pending';
        break;
      case 2:
        additionalClassName = 'label-success';
        text = 'Active';
        break;
      case 3:
        additionalClassName = 'label-warning';
        text = 'Suspended';
        break;
      case 4:
        additionalClassName = 'label-danger';
        text = 'Deleted';
        break;
      case 5:
        additionalClassName = 'label-info';
        text = 'Invited';
        break;
    }

    return (
      <span className={`label ${additionalClassName}`}>
        {text}
      </span>
    );
  }

  /**
   * return admin label element by `isAdmin`
   * @param {string} isAdmin
   * @return admin label element
   */
  getUserAdminLabel(isAdmin) {
    const { t } = this.props;

    if (isAdmin) {
      return <span className="label label-inverse label-admin ml-2">{t('admin:user_management.user_table.administrator')}</span>;
    }
  }

  render() {
    const { t, adminUsersContainer } = this.props;

    return (
      <Fragment>
        <table className="table table-default table-bordered table-user-list">
          <thead>
            <tr>
              <th width="100px">#</th>
              <th>
                <div className="d-flex justify-content-center align-items-center">
                  {t('status')}
                  <div className="input-sm d-flex flex-column">
                    <a className="icon-arrow-up" aria-hidden="true" onClick={() => this.onClickColumnSort('StatusAsc')}></a>
                    <a className="icon-arrow-down" aria-hidden="true" onClick={() => this.onClickColumnSort('StatusDesc')}></a>
                  </div>
                </div>
              </th>
              <th>
                <div className="d-flex justify-content-center align-items-center">
                  <code>username</code>
                  <div className="input-sm d-flex flex-column">
                    <a className="icon-arrow-up" aria-hidden="true" onClick={() => this.onClickColumnSort('UserNameAsc')}></a>
                    <a className="icon-arrow-down" aria-hidden="true" onClick={() => this.onClickColumnSort('UserNameDesc')}></a>
                  </div>
                </div>
              </th>
              <th>
                <div className="d-flex justify-content-center align-items-center">
                  {t('Name')}
                  <div className="input-sm d-flex flex-column">
                    <a className="icon-arrow-up" aria-hidden="true" onClick={() => this.onClickColumnSort('NameAsc')}></a>
                    <a className="icon-arrow-down" aria-hidden="true" onClick={() => this.onClickColumnSort('NameDesc')}></a>
                  </div>
                </div>
              </th>
              <th>
                <div className="d-flex justify-content-center align-items-center">
                  {t('Email')}
                  <div className="input-sm d-flex flex-column">
                    <a className="icon-arrow-up" aria-hidden="true" onClick={() => this.onClickColumnSort('EmailAsc')}></a>
                    <a className="icon-arrow-down" aria-hidden="true" onClick={() => this.onClickColumnSort('EmailDesc')}></a>
                  </div>
                </div>
              </th>
              <th width="100px">
                <div className="d-flex justify-content-center align-items-center">
                  {t('Created')}
                  <div className="input-sm d-flex flex-column">
                    <a className="icon-arrow-up" aria-hidden="true" onClick={() => this.onClickColumnSort('CreatedAsc')}></a>
                    <a className="icon-arrow-down" aria-hidden="true" onClick={() => this.onClickColumnSort('CreatedDesc')}></a>
                  </div>
                </div>
              </th>
              <th width="150px">{t('Last_Login')}</th>
              <th width="70px"></th>
            </tr>
          </thead>
          <tbody>
            {adminUsersContainer.state.users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>
                    <UserPicture user={user} className="picture img-circle" />
                  </td>
                  <td>{this.getUserStatusLabel(user.status)} {this.getUserAdminLabel(user.admin)}</td>
                  <td>
                    <strong>{user.username}</strong>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{dateFnsFormat(new Date(user.createdAt), 'yyyy-MM-dd')}</td>
                  <td>
                    {user.lastLoginAt && <span>{dateFnsFormat(new Date(user.lastLoginAt), 'yyyy-MM-dd HH:mm')}</span>}
                  </td>
                  <td>
                    <UserMenu user={user} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Fragment>
    );
  }

}

const UserTableWrapper = (props) => {
  return createSubscribedElement(UserTable, props, [AppContainer, AdminUsersContainer]);
};

UserTable.propTypes = {
  t: PropTypes.func.isRequired, // i18next
  appContainer: PropTypes.instanceOf(AppContainer).isRequired,
  adminUsersContainer: PropTypes.instanceOf(AdminUsersContainer).isRequired,

};

export default withTranslation()(UserTableWrapper);
