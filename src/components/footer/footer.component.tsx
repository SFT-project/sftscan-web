import React from 'react';
import './footer.scss';
import { SettingsActions } from '../../actions/settings.actions';
import { SettingsState } from '../../reducers/settings.reducer';
import { AppState } from '../../store/app.store';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';

// import environment from 'src/config/environment';

type INavbarMenuProps = SettingsActions & { settings: SettingsState };

class Footer extends React.Component<INavbarMenuProps> {


  render(): JSX.Element {


    return (
      <div className='footer' >
        <div className='footer-header'>
          <img src="https://sft-img.b-cdn.net/explorer/logo.svg" alt="" />
          <p>Powered by SFT Chain</p>
        </div>
        <p>
          SPDScan is a Block Explorer and Analytics Platform for SFT Chain.
        </p>
        <div className='footer-botton'>
          <p>SPDScan © 2023 (SPD-1)</p>
          <div className='media-box'>
            <img src="https://sft-img.b-cdn.net/explorer/telegram.svg" alt=""  />
            <img src="https://sft-img.b-cdn.net/explorer/discord.svg" alt=""  />
            <img src="https://sft-img.b-cdn.net/explorer/twitter.svg" alt=""  />
            <img src="https://sft-img.b-cdn.net/explorer/media.svg" alt=""  />
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state: AppState): { settings: SettingsState } {
  return { settings: state.settings };
}

function mapDispatchToProps(dispatch: any): any {
  return bindActionCreators({ ...SettingsActions } as any, dispatch);
}

export const FooterComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(Footer);
