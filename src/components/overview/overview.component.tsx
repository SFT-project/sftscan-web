
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './overview.scss';
// import { getUnconfirmedTransactionsStructSelector } from 'src/selectors/txsList';
import useInterval from "../../hooks/useInterval";
import { WIDGET_REFRESH_INTERVAL } from "../../constants/global.constants";
import { FormattedMessage } from 'react-intl';
import { OverviewAction } from 'src/actions/overview.actions';

export const Overview = ({
  overviewInfo,
  overInfo
}: any): JSX.Element => {
  useInterval(() => {
    overviewInfo();
  }, WIDGET_REFRESH_INTERVAL);
  console.log(overInfo, 'overInfo');

  const overViewData = [{
    icon: 'https://sft-img.b-cdn.net/explorer/totalSupply.svg',
    title: 'totalSupply',
    value: '368.712.398'
  }, {
    icon: 'https://sft-img.b-cdn.net/explorer/transactions.svg',
    title: 'transactions',
    value: overInfo?.txsCount
  }, {
    icon: 'https://sft-img.b-cdn.net/explorer/gasPrice.svg',
    title: 'gasPrice',
    value: overInfo?.gasPrice
  }, {
    icon: 'https://sft-img.b-cdn.net/explorer/circulation.svg',
    title: 'circulation',
    value: '368.712.398'
  }, {
    icon: 'https://sft-img.b-cdn.net/explorer/block.svg',
    title: 'block',
    value: overInfo?.height
  }, {
    icon: 'https://sft-img.b-cdn.net/explorer/safeBlock.svg',
    title: 'safeBlock',
    value: overInfo?.safeHeight
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
};

const mapStateToProps = (state: any): any => {
  return {
    overInfo: state.overview.data,
  }
};

const mapDispatchToProps = (dispatch: any): any => {
  return bindActionCreators({ ...OverviewAction }, dispatch);
};

export const OverviewComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview);
