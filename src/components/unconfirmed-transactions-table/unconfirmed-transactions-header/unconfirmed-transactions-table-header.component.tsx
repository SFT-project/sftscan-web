import React from 'react';
// import queryString from 'query-string';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';

// import {
//   SortDirectionAscIcon,
//   SortDirectionDescIcon,
//   SortDirectionIcon,
// } from '../../common/icons/common.icons';

import './unconfirmed-transactions-table-header.scss';

class UnconfirmedTransactionsTableHeader extends React.Component<
  RouteComponentProps<any>
> {
  render(): JSX.Element {
    return (
      <div className="bi-blocks-table-header bi-blocks-table__row bi-table__row">
        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="common.transaction.txHash" />
        </div>

        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="common.transaction.block" />

        </div>

        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="common.transaction.from" />
        </div>

        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="common.transaction.to" />
        </div>

        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="common.transaction.value" />
        </div>
        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="common.transaction.transactionFee" />
        </div>
      </div>
    );
  }

}

export const UnconfirmedTransactionsTableHeaderComponent = withRouter(
  UnconfirmedTransactionsTableHeader
);
