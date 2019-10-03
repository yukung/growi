/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import Dropdown from 'react-bootstrap/es/Dropdown';
import MenuItem from 'react-bootstrap/es/MenuItem';

import AppContainer from '../services/AppContainer';

import { createSubscribedElement } from './UnstatedUtils';


class Sidebar extends React.PureComponent {

  constructor(props) {
    super(props);

    const innerHTMLWithoutNestedDiv = this.props.innerHTML
      // remove wraped div node
      .replace(/^<div>/, '')
      .replace(/<\/div>$/, '');

    this.state = {
      isClient: false,
      isMenuOpened: false,
      html: innerHTMLWithoutNestedDiv,
    };

    this.onToggleMenuDropdown = this.onToggleMenuDropdown.bind(this);
    this.onRefreshButtonClicked = this.onRefreshButtonClicked.bind(this);
  }

  componentDidMount() {
    this.setState({ isClient: true });
  }

  onToggleMenuDropdown() {
    this.setState({ isMenuOpened: !this.state.isMenuOpened });
  }

  onRefreshButtonClicked() {
    // TODO: refresh cache
  }

  renderMenu() {
    return (
      <Dropdown
        pullRight
        id="sidebarMenuDropdown"
        className="sidebar-menu-dropdown"
        open={this.state.isMenuOpened}
        onToggle={this.onToggleMenuDropdown}
      >

        <Dropdown.Toggle bsSize="xs">
          <i className="icon-settings small"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <MenuItem eventKey="1">
            <i className="icon-reload" onClick={this.onRefreshButtonClicked}></i> Refresh
          </MenuItem>
        </Dropdown.Menu>

      </Dropdown>
    );
  }

  render() {
    // render hydrated contents
    if (!this.state.isClient) {
      return (
        <div key="sidebar" dangerouslySetInnerHTML={{ __html: this.state.html }}></div>
      );
    }

    return (
      <>
        <div key="sidebar" dangerouslySetInnerHTML={{ __html: this.state.html }}></div>

        { this.renderMenu() }
      </>
    );
  }

}

Sidebar.propTypes = {
  appContainer: PropTypes.instanceOf(AppContainer).isRequired,

  innerHTML: PropTypes.string.isRequired,
};

/**
 * Wrapper component for using unstated
 */
const SidebarWrapper = (props) => {
  return createSubscribedElement(Sidebar, props, [AppContainer]);
};

export default withTranslation()(SidebarWrapper);
