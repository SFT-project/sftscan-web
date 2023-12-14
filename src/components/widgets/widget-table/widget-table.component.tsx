import React from 'react';
import { Link } from 'react-router-dom';
import LoaderLogo from 'src/components/loader/loader';
// import { WidgetTableHeader } from './widget-table-header/widget-table-header';
import './widget-table.scss';
import { LatestBlockIcon, LatestTxIcon } from 'src/components/common/icons/common.icons';

export type Column = {
  value: any;
};

export type Row = Column[];
type Props = {
  isFetching: boolean;
  data?: Row[];
  headerTiles: any;
};

export const WidgetTable = ({ headerTiles, data, isFetching }: Props) => {
  if (isFetching) {
    return (
      <div className="widget-table-loader">
        <LoaderLogo></LoaderLogo>
      </div>
    );
  }

  return (
    <div className="widget-table bi-widget-table">
      {/* <WidgetTableHeader tiles={headerTiles} /> */}
      {data
        ? data.map((row, i) => (
          <div key={i} className="widget-table__row bi-widget-table__row">
            {Object.keys(row).map((column, j) => {

              if (column === 'timestamp' || column === 'transactionsCount' || column === 'txTime'|| column === 'toAddress') {
                return
              }
              if (column === 'minerAddress') {
                return (
                  <div
                    key={j}
                    className="widget-table__cell bi-widget-table__cell"
                  >
                    <div className='widget-table__cell__address bi-widget-table__cell__address'>
                      <span>
                        Fee Recipient:
                      </span>
                      <Link
                        to={`${row[column].linkValue}`}
                        className="u-word-wrap u-word-wrap--ellipsis"
                      >
                        {row[column].value}
                      </Link>
                    </div>
                    <div className='widget-table__cell__tx bi-widget-table__cell__tx'>
                      <span>{row['transactionsCount']?.value} txns</span> in {row['txTime']?.value} secs
                    </div>
                  </div>
                )
              }
              if (column === 'height') {
                return (
                  <div
                    key={j}
                    className="widget-table__cell bi-widget-table__cell bi-widget-table__first"
                  >
                    <LatestBlockIcon />
                    <div>
                      {row[column].link ? (
                        <Link
                          to={`${row[column].linkValue}`}
                          className="u-word-wrap u-word-wrap--ellipsis"
                        >
                          {row[column].value}
                          {row['timestamp']?.value}
                        </Link>
                      ) : (
                        row[column].value
                      )}
                    </div>
                  </div>
                )
              }

              if (column === 'minerReward') {
                return (
                  <div
                    key={j}
                    className="widget-table__cell bi-widget-table__cell bi-widget-table__reward "
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="72" height="26" viewBox="0 0 72 26" fill="none">
                      <path d="M0 0H72V26H0L6.12766 13L0 0Z" fill="#F1F1F1" />
                    </svg>
                    <div>
                      {row[column].value}
                    </div>
                  </div>
                )
              }

              // tx

              if (column === 'txHash') {
                return (
                  <div
                    key={j}
                    className="widget-table__cell bi-widget-table__cell bi-widget-table__first"
                  >
                    <LatestTxIcon />
                    <div>
                      {row[column].link ? (
                        <Link
                          to={`${row[column].linkValue}`}
                          className="u-word-wrap u-word-wrap--ellipsis"
                        >
                          {row[column].value}
                          {row['timestamp']?.value}
                        </Link>
                      ) : (
                        row[column].value
                      )}
                    </div>
                  </div>
                )
              }
              if (column === 'formAddress') {
                return (
                  <div
                    key={j}
                    className="widget-table__cell bi-widget-table__cell"
                  >
                    <div className='widget-table__cell__address bi-widget-table__cell__address'>
                      <span>
                        from
                      </span>
                      <Link
                        to={`${row[column].linkValue}`}
                        className="u-word-wrap u-word-wrap--ellipsis"
                      >
                        {row[column].value}
                      </Link>
                    </div>
                    <div className='widget-table__cell__tx bi-widget-table__cell__tx'>
                      <span>to</span>
                      <Link
                        to={`${row['toAddress'].linkValue}`}
                        className="u-word-wrap u-word-wrap--ellipsis"
                      >
                        {row['toAddress']?.value}
                      </Link>
                    </div>
                  </div>
                )
              }
              return (
                <div
                  key={j}
                  className="widget-table__cell bi-widget-table__cell "
                >
                  <div>
                    {row[column].value}
                  </div>
                </div>
              )
            })}
          </div>
        ))
        : null}
    </div>
  );
};
