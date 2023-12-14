import React from 'react';
import './overview.scss';
import { SettingsActions } from '../../actions/settings.actions';
import { SettingsState } from '../../reducers/settings.reducer';
import { AppState } from '../../store/app.store';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

// import environment from 'src/config/environment';

type INavbarMenuProps = SettingsActions & { settings: SettingsState };

class Overview extends React.Component<INavbarMenuProps> {


  render(): JSX.Element {
    const overViewData = [{
      icon: 'https://sft-img.b-cdn.net/explorer/totalSupply.svg',
      title: 'totalSupply',
      value: '368.712.398'
    }, {
      icon: 'https://sft-img.b-cdn.net/explorer/transactions.svg',
      title: 'transactions',
      value: '368.712.398'
    }, {
      icon: 'https://sft-img.b-cdn.net/explorer/gasPrice.svg',
      title: 'gasPrice',
      value: '368.712.398'
    }, {
      icon: 'https://sft-img.b-cdn.net/explorer/circulation.svg',
      title: 'circulation',
      value: '368.712.398'
    }, {
      icon: 'https://sft-img.b-cdn.net/explorer/block.svg',
      title: 'block',
      value: '368.712.398'
    }, {
      icon: 'https://sft-img.b-cdn.net/explorer/safeBlock.svg',
      title: 'safeBlock',
      value: '368.712.398'
    }]

    return (
      <div className='overview' >
        {
          overViewData.map(item => (
            <div className='overview__cell' key={item.title}>
              <img src={item.icon} alt="" />
              <div>
                <p>
                  <FormattedMessage id={"components.overview." + item.title} />
                </p>
                <p>
                  {item.value}
                </p>
              </div>

            </div>
          ))
        }
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

export const OverviewComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(Overview);
