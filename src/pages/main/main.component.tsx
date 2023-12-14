import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AppActions } from 'src/actions/app.actions';
import { BlockActions } from 'src/actions/block.actions';
import { WidgetBlocksComponent } from 'src/components/widgets/widget-blocks/widget-blocks.component';
// import { WidgetCharts } from 'src/components/widgets/widget-charts/widget-charts.components';
// import { WidgetIssuedTokensComponent } from 'src/components/widgets/widget-issued-tokens/widget-issued-tokens.component';
import { WidgetTxsListComponent } from 'src/components/widgets/widget-txs-list/widget-txs-list.component';
import { AppState } from 'src/store/app.store';

import './main.scss';
import { SearchV2Component } from 'src/components/search-v2/search-v2.component';
import { OverviewComponent } from 'src/components/overview/overview.component';

const MainComponent = () => {
  return (
    <div className="bi-main">
      <div className='bi-main-header'>
      <SearchV2Component />
        <OverviewComponent />
      </div>
      <div className="bi-main__container">
        <div className="bi-main__col">
          <WidgetBlocksComponent />
        </div>
        <div className="bi-main__col">
          <WidgetTxsListComponent />
        </div>
        {/* <div className="bi-main__col">
          <WidgetCharts />
        </div> */}
        {/* <div className="bi-main__col">
          <WidgetIssuedTokensComponent />
        </div> */}
      </div>
    </div>
  );
};

function mapStateToProps(state: AppState): AppState {
  return state;
}

function mapDispatchToProps(dispatch: any): any {
  return bindActionCreators({ ...BlockActions, ...AppActions }, dispatch);
}

const Main = connect(mapStateToProps, mapDispatchToProps)(MainComponent);

export default Main;
