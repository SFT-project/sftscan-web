import React, { useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';

// import { Transaction as TransactionModel } from '../../models/generated/transaction';

import { SettingsActions } from '../../actions/settings.actions';
import { TransactionActions } from '../../actions/transaction.actions';
// import { SettingsState } from '../../reducers/settings.reducer';
// import { TransactionState } from '../../reducers/transaction.reducer';
import { AppState } from '../../store/app.store';
import './transaction.scss'

import ProgressBar from '../../components/progress-bar/progress-bar';
import LoaderLogo from '../../components/loader/loader';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

const renderLoader = () => {
  return (
    <ProgressBar className="bi-app__loading-text">
      <LoaderLogo />
    </ProgressBar>
  );
};

const ConfirmedTransaction = (props: any) => {
  const {
    getTransaction,
    match,
    fetching,
    transaction,
    isScriptsDisplayed,
    setFailed,
    isFailedRequest,
  } = props;

  useEffect(() => {
    getTransaction(match.params.id);
  }, [match.params.id]);



  const renderBody = useMemo(() => {
    if (isFailedRequest) {
      setFailed();
      return null;
    }

    if (!transaction) {
      return null;
    }
    console.log(transaction, 'transaction');


    return (
      <div className="bi-transaction-info">
        <div className="bi-transaction-info__table bi-table">
          <div className="bi-transaction-info__row bi-table__row">
            <div className="bi-transaction-info__cell bi-transaction-info__cell--header bi-table__cell">
              <FormattedMessage id="common.transaction.txHash" />
            </div>

            <div className="bi-transaction-info__cell bi-table__cell">
              {transaction.hash}
            </div>
          </div>

          <div className="bi-transaction-info__row bi-table__row">
            <div className="bi-transaction-info__cell bi-transaction-info__cell--header bi-table__cell">
              <FormattedMessage id="common.transaction.status" />
            </div>

            <div className="bi-transaction-info__cell bi-table__cell">
            {transaction.hash}
            </div>
          </div>

          <div className="bi-transaction-info__row bi-table__row">
            <div className="bi-transaction-info__cell bi-transaction-info__cell--header bi-table__cell">
              <FormattedMessage id="common.transaction.block" />
            </div>

            <div className="bi-transaction-info__cell bi-table__cell u-word-wrap">
              <Link to={`/address/${transaction.number}`}>
                {parseInt(transaction.blockNumber,16)}
              </Link>
            </div>
          </div>

          <div className="bi-transaction-info__row bi-table__row">
            <div className="bi-transaction-info__cell bi-transaction-info__cell--header bi-table__cell">
              <FormattedMessage id="common.transaction.timestamp" />
            </div>

            <div className="bi-transaction-info__cell bi-table__cell u-word-wrap">
              {transaction.timestamp}
            </div>
          </div>

          <div className="bi-transaction-info__row bi-table__row">
            <div className="bi-transaction-info__cell bi-transaction-info__cell--header bi-table__cell">
              <FormattedMessage id="common.transaction.from" />
            </div>

            <div className="bi-transaction-info__cell bi-table__cell u-word-wrap">
            <Link to={`/address/${transaction.from}`}>
                {transaction.from}
              </Link>
            </div>
          </div>

          <div className="bi-transaction-info__row bi-table__row">
            <div className="bi-transaction-info__cell bi-transaction-info__cell--header bi-table__cell">
              <FormattedMessage id="common.transaction.to" />
            </div>

            <div className="bi-transaction-info__cell bi-table__cell">
            <Link to={`/address/${transaction.to}`}>
                {transaction.to}
              </Link>
            </div>
          </div>

          <div className="bi-transaction-info__row bi-table__row">
            <div className="bi-transaction-info__cell bi-transaction-info__cell--header bi-table__cell">
              <FormattedMessage id="common.transaction.value" />
            </div>

            <div className="bi-transaction-info__cell u-word-wrap">
              {parseInt(transaction.value, 16)}
            </div>
          </div>

          <div className="bi-transaction-info__row bi-table__row">
            <div className="bi-transaction-info__cell bi-transaction-info__cell--header bi-table__cell">
              <FormattedMessage id="common.transaction.transactionFee" />
            </div>

            <div className="bi-transaction-info__cell bi-table__cell u-word-wrap">
              {parseInt(transaction.gas, 16)}
            </div>
          </div>

          <div className="bi-transaction-info__row bi-table__row">
            <div className="bi-transaction-info__cell bi-transaction-info__cell--header bi-table__cell">
              <FormattedMessage id="common.transaction.nonce" />
            </div>

            <div className="bi-transaction-info__cell bi-table__cell u-word-wrap">
              {transaction.nonce}
            </div>
          </div>

          <div className="bi-transaction-info__row bi-table__row">
            <div className="bi-transaction-info__cell bi-transaction-info__cell--header bi-table__cell">
              <FormattedMessage id="common.transaction.inputData" />
            </div>

            <div className="bi-transaction-info__cell bi-table__cell u-word-wrap">
              {transaction.input}
            </div>
          </div>

        </div>
      </div>
    );
  }, [
    transaction,
    isScriptsDisplayed,
    isFailedRequest,
    setFailed,

  ]);

  if (fetching) {
    return <div className="bi-transaction">{renderLoader()}</div>;
  }

  return (
    <div className="bi-transaction">

      <div className="bi-transaction__wrapper g-flex-column">
        <FormattedMessage
          id="common.pages.transaction.transaction"
          values={{ id: match.params.id }}
        >
          {(title) => (
            <Helmet>
              <title>{title}</title>
            </Helmet>
          )}
        </FormattedMessage>
        <div className="bi-transaction-header__title g-flex__item-fixed">
          <FormattedMessage id="common.transaction.transaction" />{' '}
        </div>
          {renderBody}
      </div>

    </div>
  );
};

function mapStateToProps(state: AppState): any {
  return { ...state.transaction, ...state.settings };
}

function mapDispatchToProps(dispatch: any): ActionCreatorsMapObject {
  return bindActionCreators(
    { ...TransactionActions, ...SettingsActions },
    dispatch
  );
}

const ConfirmedTransactionComponent: any = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ConfirmedTransaction));

export default ConfirmedTransactionComponent;
