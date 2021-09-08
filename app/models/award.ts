import { attr, belongsTo } from '@ember-data/model';
import DS from 'ember-data';
import Receiver from './receiver';

export default class Award extends DS.Model.extend({}) {
  @attr('number') public grantCashAmount!: number;
  @attr('string') public grantPurpose!: string;
  @belongsTo('receiver') public receiver!: Receiver;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'award': Award;
  }
}
