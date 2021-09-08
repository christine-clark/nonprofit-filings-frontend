import DS from 'ember-data';

export default class Award extends DS.JSONAPISerializer.extend({
}) {}

// DO NOT DELETE: this is how TypeScript knows how to look up your serializers.
declare module 'ember-data/types/registries/serializer' {
  export default interface SerializerRegistry {
    'award': Award;
  }
}
