import queryString from 'query-string';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';



import './blocks-table-header.scss';

class BlockTableHeader extends React.Component<RouteComponentProps<any>> {
  render(): JSX.Element {
    return (
      <div className="bi-blocks-table-header bi-blocks-table__row bi-table__row">
        <div className="bi-blocks-table__cell bi-table__cell">
          <Link
            className={this.getSortDirectionClassName('height')}
            to={`/latest-blocks?${this.getSortLink('height')}`}
          >
            <FormattedMessage id="common.block.height" />
          </Link>
        </div>

        <div className="bi-blocks-table__cell bi-blocks-table__cell--timestamp bi-table__cell">
          <Link
            className={this.getSortDirectionClassName('timestamp')}
            to={`/latest-blocks?${this.getSortLink('timestamp')}`}
          >
            <FormattedMessage id="common.block.age" />
          </Link>
        </div>

        <div className="bi-blocks-table__cell bi-table__cell">
          <Link
            className={this.getSortDirectionClassName('transactionscount')}
            to={`/latest-blocks?${this.getSortLink('transactionscount')}`}
          >
            <FormattedMessage id="common.block.transactions" />
          </Link>
        </div>

        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="common.block.miner" />
        </div>
        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="common.block.gasUsed" />
        </div>
        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="common.block.gasLimit" />
        </div>
        <div className="bi-blocks-table__cell bi-table__cell">
          <Link
            className={this.getSortDirectionClassName('minerreward')}
            to={`/latest-blocks?${this.getSortLink('minerreward')}`}
          >
            <FormattedMessage id="common.block.minerReward" />
          </Link>
        </div>

   

        <div className="bi-blocks-table__cell bi-table__cell">
          <Link
            className={this.getSortDirectionClassName('size')}
            to={`/latest-blocks?${this.getSortLink('size')}`}
          >
            <FormattedMessage id="common.block.size" />
          </Link>
        </div>
      </div>
    );
  }

  private getSortDirectionClassName(sortedColumn: string): string {
    const { sortBy, sortDirection } = queryString.parse(
      this.props.history.location.search
    );
    const classNames = [
      'bi-blocks-table-header__sort',
      'u-word-wrap u-word-wrap--ellipsis',
    ];

    if (sortBy === sortedColumn && sortDirection) {
      classNames.push(`bi-blocks-table-header__sort--${sortDirection}`);
    }

    return classNames.join(' ');
  }

  private getSortLink(sortedColumn: string): string {
    const params = queryString.parse(this.props.history.location.search);

    const { sortBy, sortDirection } = params;

    let newSortDirection: string | null = 'asc';
    if (sortBy === sortedColumn && sortDirection === 'desc') {
      return queryString.stringify({
        ...params,
        offset: undefined,
        sortBy: undefined,
        sortDirection: undefined,
      });
    }

    if (sortBy === sortedColumn && sortDirection !== 'desc') {
      newSortDirection = 'desc';
    }

    return queryString.stringify({
      ...params,
      offset: undefined,
      sortBy: sortedColumn,
      sortDirection: newSortDirection,
    });
  }
}

export const BlockTableHeaderComponent = withRouter(BlockTableHeader);
