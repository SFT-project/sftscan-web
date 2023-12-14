import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { SettingsActions } from '../../actions/settings.actions';

import { NavbarComponent } from '../navbar/navbar.component';

import './header-v2.scss';

class Header extends React.Component<SettingsActions> {
  constructor(props: SettingsActions) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div className="bi-header-v2 g-flex g-flex-column">
        <NavbarComponent />
       
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: any): any {
  return bindActionCreators(SettingsActions, dispatch);
}

export const HeaderV2Component = connect(null, mapDispatchToProps, null, {
  pure: false,
})(Header);
