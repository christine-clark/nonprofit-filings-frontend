import { attr } from '@ember-data/model';
import { computed } from '@ember/object';
import DS from 'ember-data';

export default class Filer extends DS.Model {
  @attr('number') public ein!: string;
  @attr('string') public name!: string;
  @attr('string') public address!: string;
  @attr('string') public city!: string;
  @attr('string') public state!: string;
  @attr('string') public postalCode!: string;

  @computed('address', 'city', 'state', 'postalCode')
  public fullAddress() {
    return `${this.address} ${this.city}, ${this.state} ${this.postalCode}`
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'filer': Filer;
  }
}
