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
 */ import { Digest32 } from './digest32';
import { KeyValueItem } from './keyValueItem';
import { ModifierId } from './modifierId';

export interface BlockExtension {
  headerId: ModifierId;
  digest: Digest32;
  /**
   * List of key-value records
   */
  fields: Array<KeyValueItem>;
}
