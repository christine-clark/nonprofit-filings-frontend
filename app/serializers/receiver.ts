import DS from 'ember-data';

export default class Receiver extends DS.JSONAPISerializer.extend({
}) {}

// DO NOT DELETE: this is how TypeScript knows how to look up your serializers.
declare module 'ember-data/types/registries/serializer' {
  export default interface SerializerRegistry {
    'receiver': Receiver;
  }
}
