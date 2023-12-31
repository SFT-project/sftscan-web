import queryString from 'query-string';
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';

import './unconfirmed-transactions.scss';

import { AppState } from '../../store/app.store';

import { IGetBlocksParams } from '../../services/block.api.service';

import { LimitSelectorComponent } from '../../components/common/limit-selector/limit-selector.component';
import { PaginateSimpleComponent } from '../../components/common/paginate-simple/paginate-simple.component';
import { TxsList} from '../../actions/txsList.actions';
import { getUnconfirmedTransactionsStructSelector } from '../../selectors/txsList';
import { UnconfirmedTransactionsTableComponent } from '../../components/unconfirmed-transactions-table/unconfirmed-transactions-table.component';

type IDataProps = AppState &
  TxsList&
  RouteComponentProps<{}> & {
    txsList: any;
    offset: number;
  };

class UnconfirmedTransactions extends React.PureComponent<IDataProps> {
  params: any;

  constructor(props: any) {
    super(props);

    this.getPageUrl = this.getPageUrl.bind(this);
    this.getLimitLink = this.getLimitLink.bind(this);

    this.params = this.getParams();
  }

  componentDidMount(): void {
    this.reloadTokens(this.params);
  }

  UNSAFE_componentWillReceiveProps(props: IDataProps): void {
    const params = this.getParams();

    if (JSON.stringify(params) !== JSON.stringify(this.params)) {
      this.params = params;

      this.reloadTokens(this.params);
    }
  }

  render(): JSX.Element {
    console.log(this.props.txsList.data,'this.props.txsList.data');
    
    return (
      <div className="bi-data g-flex-column g-flex-column__item-fixed">
        <FormattedMessage id="common.transaction.transaction">
          {(title) => (
            <Helmet>
              <title>{title}</title>
            </Helmet>
          )}
        </FormattedMessage>

        <div className="bi-data__header g-flex-column__item-fixed g-flex">
          <div className="bi-data__title g-flex__item">
            <FormattedMessage id="common.transaction.transaction" />
          </div>
        </div>

        {this.props.txsList.isFetching && (
          <p className="base-text">Fetching Data...</p>
        )}

        {!this.props.txsList.isFetching &&
          this.props.txsList.data?.list?.length === 0 && (
            <div className="bi-data__body g-flex-column__item-fixed">
              No transactions 
            </div>
          )}

        {!this.props.txsList.isFetching &&
          this.props.txsList.data !== null &&
          this.props.txsList.data.list.length > 0 && (
            <div className="bi-data__body g-flex-column__item-fixed">
              <UnconfirmedTransactionsTableComponent
                transactions={this.props.txsList.data.list}
                isFetching={this.props.txsList.isFetching}
              />
            </div>
          )}

        {this.props.txsList.data !== null &&
          this.props.txsList.data.list.length > 0 && (
            <div className="bi-data__footer g-flex-column__item-fixed g-flex">
              <div className="g-flex__item-fixed">
                <LimitSelectorComponent
                  items={[30, 60, 120]}
                  selected={this.params.limit}
                  label={<FormattedMessage id="components.data.show" />}
                  getLimitLink={this.getLimitLink}
                />
              </div>

              <div className="g-flex__item-fixed">
                <PaginateSimpleComponent
                  total={this.props.txsList.data.total}
                  limit={this.params.limit}
                  getPageUrl={this.getPageUrl}
                  forcePage={Math.floor(this.props.offset / this.params.limit)}
                />
              </div>
            </div>
          )}
      </div>
    );
  }

  private getPageUrl(page: number): string {
    const params: any = queryString.parse(this.props.history.location.search);

    params.offset = page * this.params.limit;

    return `/mempool?${queryString.stringify(params)}`;
  }

  private getLimitLink(limit: number): string {
    const params: any = queryString.parse(this.props.history.location.search);

    params.limit = limit;

    return `/mempool?${queryString.stringify(params)}`;
  }

  private reloadTokens(params: IGetBlocksParams): void {
    params = {
      ...this.params,
      ...params,
      limit: params.limit || 30,
      offset: params.offset || 0,
    };

    Object.keys(params).forEach((key) => {
      if (params[key] === null) {
        delete params[key];
      }
    });

    this.props.getTxsList(params);

    if (params.offset === 0) {
      delete params.offset;
    }

    if (params.limit === 30) {
      delete params.limit;
    }

    if (isEmpty(queryString.stringify(params))) {
      return;
    }

    this.props.history.push(`/mempool?${queryString.stringify(params)}`);
  }

  private getParams(): any {
    let { offset, limit, sortBy, sortDirection }: any = queryString.parse(
      this.props.history.location.search
    );

    offset = parseInt(offset, 10);
    limit = parseInt(limit, 10) || 30;

    sortDirection = ['asc', 'desc'].includes(sortDirection)
      ? sortDirection
      : null;
    sortBy = ['creationtimestamp', 'size'].includes(sortBy) ? sortBy : null;

    return {
      limit,
      offset: offset || 0,
      sortBy,
      sortDirection,
    };
  }
}

const mapStateToProps = (state: any): any => ({
  txsList: getUnconfirmedTransactionsStructSelector(state),
  offset: state.txsList.offset,
});

const mapDispatchToProps = (dispatch: any): any => {
  return bindActionCreators({ ...TxsList}, dispatch);
};

const UnconfirmedTransactionsComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconfirmedTransactions);

export default UnconfirmedTransactionsComponent;
