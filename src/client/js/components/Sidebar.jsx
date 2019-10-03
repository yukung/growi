import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

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
      html: innerHTMLWithoutNestedDiv,
    };

  }

  render() {
    return (
      // eslint-disable-next-line react/no-danger
      <div key="sidebar" dangerouslySetInnerHTML={{ __html: this.state.html }}></div>
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
