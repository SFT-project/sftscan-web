/**
 * SFT blockchain explorer
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 2.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */ import { BlockExtension } from './blockExtension';
import { BlockHeader } from './blockHeader';
import { SerializedAdProof } from './serializedAdProof';
import { Transaction } from './transaction';

/**
 * Block with header and transactions
 */
export interface FullBlock {
  header: BlockHeader;
  difficulty: string;
  extraData: string;
  gasLimit: string;
  gasUsed: string;
  hash: string;
  miner: string;
  nonce: string;
  number: number;
  parentHash: string;
  sha3Uncles: string;
  size: string;
  stateRoot: string;
  timestamp: string;
  totalDifficulty: string;
  transactionsRoot: string;
  txsCount: number;
 
  blockTransactions: Array<Transaction>;
  adProofs: SerializedAdProof;
  extension: BlockExtension;
}
