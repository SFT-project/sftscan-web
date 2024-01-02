import { Widget } from '../widget/widget.components';
import React, { useMemo } from 'react';
import { WidgetButtonMore } from '../widget-button-more/widget-button-more.component';
import { WidgetTitle } from '../widget-title/widget-title.component';
import { MempoolIcon } from '../../common/icons/common.icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { WidgetTable } from '../widget-table/widget-table.component';

import './widget-txs-list.scss';
import { TimestampComponent } from 'src/components/common/timestamp/timestamp.component';
import { TxsList} from 'src/actions/txsList.actions';
import { getUnconfirmedTransactionsStructSelector } from 'src/selectors/txsList';
import { WidgetBody } from '../widget-body/widget-body.components';
import useInterval from "../../../hooks/useInterval";
import {WIDGET_REFRESH_INTERVAL} from "../../../constants/global.constants";
import { ellipsis } from 'src/utils/formatter';
import BigNumber from 'bignumber.js';

export const WidgetTxsList = ({
  getTxsList,
  txsList,
}: any): JSX.Element => {
  useInterval(() => {
    getTxsList({ limit: 8 });
  }, WIDGET_REFRESH_INTERVAL);
  
  const tableData = useMemo(() => {
    
    return txsList.data?.list?.reduce(
      (acc: any, { creationTimestamp, from, hash, to, value }: any) => {
        return [
          ...acc,
          {
            txHash: {
              value:ellipsis({ startLength: 4, endLength: 4 })(hash),
              link: true,
              linkValue: `/transactions/${hash}`,
            },
            timestamp: {
              value: (
                <TimestampComponent vertical timestamp={creationTimestamp} />
              ),
            },
            formAddress: {
              value:ellipsis({ startLength: 18, endLength: 8 })(from) ,
              link: true,
              linkValue: `/addresses/${from}`,
            },
            toAddress: {
              value: ellipsis({ startLength: 19, endLength: 8 })(to),
              link: true,
              linkValue: `/addresses/${to}`,
            },
            minerReward: {
              value: (
                <span className="u-word-wrap u-word-wrap--ellipsis">
                 {new BigNumber(value).div(10**18).toString()}
                </span>
              ),
            },
          },
        ];
      },
      []
    );
  }, [txsList]);

  return (
    <Widget className="bi-widget-charts">
      <div className="g-flex  bi-widget-charts__header">
        <WidgetTitle
          title={'common.navigation.mempool'}
          icon={<MempoolIcon />}
        />
      </div>

      <WidgetBody>
        <WidgetTable
          headerTiles={[
            'common.token.id',
            'components.unconfirmed-transactions.creation-timestamp',
            'components.unconfirmed-transactions.inputs-quantity',
            'components.unconfirmed-transactions.outputs-quantity',
            'common.block.size',
          ]}
          data={tableData}
          isFetching={!tableData}
        />
      </WidgetBody>

      <div className="bi-widget-charts__button">
        <WidgetButtonMore
          title={'components.widget.view-all'}
          to={'/mempool'}
        />
      </div>
    </Widget>
  );
};

const mapStateToProps = (state: any): any => ({
  txsList: getUnconfirmedTransactionsStructSelector(state),
  offset: state.txsList.offset,
});

const mapDispatchToProps = (dispatch: any): any => {
  return bindActionCreators({ ...TxsList}, dispatch);
};

export const WidgetTxsListComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(WidgetTxsList);
