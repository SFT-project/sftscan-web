import React from 'react';

import { AddressId } from '../../models/generated/addressId';
// import { Transaction } from '../../models/generated/transaction';

import './transactions.scss';
import { UnconfirmedTransactionsTableComponent } from '../unconfirmed-transactions-table/unconfirmed-transactions-table.component';

interface BlockTransactionProps {
  transactions: any;
  address?: AddressId;
}

export class TransactionsComponent extends React.PureComponent<BlockTransactionProps> {

  render(): JSX.Element {
    return (
      <div className="bi-transactions">
        <UnconfirmedTransactionsTableComponent
          transactions={this.props.transactions.list}
          isFetching={this.props.transactions.isFetching}
        />
      </div>
    );
  }
}
