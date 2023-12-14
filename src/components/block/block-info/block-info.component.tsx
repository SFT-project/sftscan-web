import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';


import { FullBlock } from '../../../models/generated/fullBlock';

import { TimestampComponent } from '../../common/timestamp/timestamp.component';

import './block-info.scss';

interface IBlockInfoProps {
  block: FullBlock;
}

export class BlockInfoComponent extends React.Component<IBlockInfoProps> {

  render(): JSX.Element {
    return (
      <div className="bi-block-info">
        <div className="bi-block-info__table bi-table">
          <div className="bi-block-info__row bi-table__row">
            <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
              <FormattedMessage id="common.block.height" />
            </div>

            <div className="bi-block-info__cell bi-table__cell">
              {this.props.block.number}
            </div>
          </div>

          <div className="bi-block-info__row bi-table__row">
            <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
              <FormattedMessage id="common.block.age" />
            </div>

            <div className="bi-block-info__cell bi-table__cell">
              <TimestampComponent
                timestamp={parseInt(this.props.block.timestamp, 16) * 1000}
              />
            </div>
          </div>

          <div className="bi-block-info__row bi-table__row">
            <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
              <FormattedMessage id="common.block.miner" />
            </div>

            <div className="bi-block-info__cell bi-table__cell u-word-wrap">
              <Link to={`/address/${this.props.block.number}`}>
                {this.props.block.miner}
              </Link>
            </div>
          </div>

            <div className="bi-block-info__row bi-table__row">
              <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
                <FormattedMessage id="common.block.blockReward" />
              </div>

              <div className="bi-block-info__cell bi-table__cell u-word-wrap">
                  {this.props.block.number}
              </div>
            </div>



          <div className="bi-block-info__row bi-table__row">
            <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
              <FormattedMessage id="common.block.totalDifficulty" />
            </div>

            <div className="bi-block-info__cell bi-table__cell u-word-wrap">
              {parseInt(this.props.block.totalDifficulty,16)}
            </div>
          </div>

          <div className="bi-block-info__row bi-table__row">
            <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
              <FormattedMessage id="common.block.size" />
            </div>

            <div className="bi-block-info__cell bi-table__cell">
              {parseInt(this.props.block.size,16)} Bytes
            </div>
          </div>

          <div className="bi-block-info__row bi-table__row">
            <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
              <FormattedMessage id="common.block.gasUsed" />
            </div>

            <div className="bi-block-info__cell u-word-wrap">
            {parseInt(this.props.block.gasUsed,16)}
            </div>
          </div>

          <div className="bi-block-info__row bi-table__row">
            <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
              <FormattedMessage id="common.block.gasLimit" />
            </div>

            <div className="bi-block-info__cell bi-table__cell u-word-wrap">
            {parseInt(this.props.block.gasLimit,16)}
            </div>
          </div>

          <div className="bi-block-info__row bi-table__row">
            <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
              <FormattedMessage id="common.block.sha3Uncles" />
            </div>

            <div className="bi-block-info__cell bi-table__cell u-word-wrap">
              {this.props.block.sha3Uncles}
            </div>
          </div>

          <div className="bi-block-info__row bi-table__row">
            <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
              <FormattedMessage id="common.block.extraData" />
            </div>

            <div className="bi-block-info__cell bi-table__cell u-word-wrap">
              {this.props.block.extraData}
            </div>
          </div>

          <div className="bi-block-info__row bi-table__row">
            <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
              <FormattedMessage id="common.block.nBits" />
            </div>

            <div className="bi-block-info__cell bi-table__cell">
              {this.props.block.number}
            </div>
          </div>

      

        </div>
      </div>
    );
  }
}
