import React from 'react';
import { FormattedMessage } from 'react-intl';

import './unconfirmed-transactions-table.scss';
import { UnconfirmedTransactionsTableHeaderComponent } from './unconfirmed-transactions-header/unconfirmed-transactions-table-header.component';
import { Link } from 'react-router-dom';
import { ellipsis } from 'src/utils/formatter';

interface UnconfirmedTransactionsTableProps {
  transactions: any[];
  isFetching: boolean;
}

export class UnconfirmedTransactionsTableComponent extends React.Component<UnconfirmedTransactionsTableProps> {
  render(): JSX.Element {
    return (
      <div className="bi-blocks-table">
        {!this.props.transactions ? null : this.renderTable()}
      </div>
    );
  }

  private renderTable(): JSX.Element {
    return (
      <div className="bi-blocks-table__body bi-table">
        <UnconfirmedTransactionsTableHeaderComponent />

        {this.props.transactions.map((transaction) => {
          return (
            <div
              className="bi-blocks-table__row bi-table__row"
              key={transaction.id}
            >
              <div className="bi-blocks-table__cell bi-table__cell bi-tokens-table__cell">
                <div className="bi-blocks-table__cell-name bi-tokens-table__cell-name">
                  <FormattedMessage id="common.transaction.txHash" />
                </div>

                <Link
                  to={`/transactions/${transaction.hash}`}
                  title={transaction.hash}
                >
                  {ellipsis({ startLength: 4, endLength: 4 })(transaction.hash)}
                </Link>
              </div>

              <div className="bi-blocks-table__cell bi-table__cell bi-tokens-table__cell">
                <div className="bi-blocks-table__cell-name bi-tokens-table__cell-name">
                  <FormattedMessage id="components.unconfirmed-transactions.creation-timestamp" />
                </div>

                <Link
                  to={`/block/${parseInt(transaction.blockNumber, 16)}`}
                  title={parseInt(transaction.blockNumber, 16).toString()}
                >
                  {parseInt(transaction.blockNumber, 16)}
                </Link>

              </div>

              <div className="bi-blocks-table__cell bi-table__cell bi-tokens-table__cell">
                <div className="bi-blocks-table__cell-name bi-tokens-table__cell-name">
                  <FormattedMessage id="components.unconfirmed-transactions.inputs-quantity" />
                </div>

                <Link
                  to={`/block/${transaction.from}`}
                  title={transaction.from}
                >
                  {ellipsis({ startLength: 4, endLength: 4 })(transaction.from)}
                </Link>
              </div>

              <div className="bi-blocks-table__cell bi-table__cell bi-tokens-table__cell">
                <div className="bi-blocks-table__cell-name bi-tokens-table__cell-name">
                  <FormattedMessage id="components.unconfirmed-transactions.outputs-quantity" />
                </div>
                <Link
                  to={`/block/${transaction.to}`}
                  title={transaction.to}
                >
                  {ellipsis({ startLength: 4, endLength: 4 })(transaction.to)}
                </Link>
              </div>
              <div className="bi-blocks-table__cell bi-table__cell  bi-tokens-table__cell">
                <div className="bi-blocks-table__cell-name bi-tokens-table__cell-name">
                  <FormattedMessage id="common.block.size" />
                </div>

                <span className="u-word-wrap u-word-wrap--ellipsis">
                  {parseInt(transaction.value, 16)}
                </span>
              </div>
              <div className="bi-blocks-table__cell bi-table__cell  bi-tokens-table__cell">
                <div className="bi-blocks-table__cell-name bi-tokens-table__cell-name">
                  <FormattedMessage id="common.block.size" />
                </div>

                <span className="u-word-wrap u-word-wrap--ellipsis">
                  {parseInt(transaction.gas, 16)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
