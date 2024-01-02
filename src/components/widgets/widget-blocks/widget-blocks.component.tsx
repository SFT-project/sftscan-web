import { Widget } from '../widget/widget.components';
import React, { useMemo } from 'react';
import { WidgetButtonMore } from '../widget-button-more/widget-button-more.component';
import { WidgetTitle } from '../widget-title/widget-title.component';
import { bindActionCreators } from 'redux';
import { BlockActions } from 'src/actions/block.actions';
import { connect } from 'react-redux';
import { AppState } from 'src/store/app.store';
import { WidgetTable } from '../widget-table/widget-table.component';

import './widget-blocks.scss';
import { TimestampComponent } from 'src/components/common/timestamp/timestamp.component';
import { WidgetBody } from '../widget-body/widget-body.components';
import { WIDGET_REFRESH_INTERVAL } from '../../../constants/global.constants';
import useInterval from '../../../hooks/useInterval';
import { ellipsis } from 'src/utils/formatter';
import BigNumber from 'bignumber.js';

export const WidgetBlocks = ({ getBlocks, blocks }: any): JSX.Element => {
  useInterval(() => {
    getBlocks({ limit: 8 });
  }, WIDGET_REFRESH_INTERVAL);
  const tableData = useMemo(() => {
    return blocks?.blocks.reduce(
      (
        acc: any,
        {
          number,
          timestamp,
          miner,
          size,
          id,
          hash,
          txsCount,
          blockReward
        }: any
      ) => {
        return [
          ...acc,
          {
            height: { value: number, link: true, linkValue: `/blocks/${number}` },
            timestamp: {
              value: <TimestampComponent vertical timestamp={parseInt(timestamp, 16)*1000 } />,
            },
            txTime:{
              value: 10,
            },
            minerAddress: {
              value:ellipsis({ startLength: 4, endLength: 4 })(miner) ,
              link: true,
              linkValue: `/addresses/${miner}`,
            },
            transactionsCount: {
              value: txsCount,
            },
            minerReward: {
              value:<>{new BigNumber(blockReward).div(10**18).toString()}</>,
            },
          },
        ];
      },
      []
    );
  }, [blocks]);

  return (
    <Widget className="bi-widget-blocks">
      <div className="g-flex  bi-widget-blocks__header">
        <WidgetTitle
          title={'common.navigation.latest-blocks'}
          icon={''}
        />
      </div>

      <WidgetBody>
        <WidgetTable
          headerTiles={[
            'common.block.height',
            'common.block.transactions',
            'common.block.minerReward',
          ]}
          data={tableData}
          isFetching={blocks.fetching}
        />
      </WidgetBody>

      <div className="bi-widget-blocks__button">
        <WidgetButtonMore
          title={'components.widget.view-all-blocks'}
          to={'/latest-blocks'}
        />
      </div>
    </Widget>
  );
};

function mapStateToProps(state: AppState): AppState {
  return state;
}

function mapDispatchToProps(dispatch: any): any {
  return bindActionCreators({ ...BlockActions }, dispatch);
}

export const WidgetBlocksComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(WidgetBlocks);
