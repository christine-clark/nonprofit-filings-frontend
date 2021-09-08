import DS from 'ember-data';

export default class Filer extends DS.JSONAPISerializer.extend({
}) {
  public serializeAttribute(snapshot: DS.Snapshot, json: {}, key: string, attribute: {}) {
    super.serializeAttribute(snapshot, json, key, attribute);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your serializers.
declare module 'ember-data/types/registries/serializer' {
  export default interface SerializerRegistry {
    'filer': Filer;
  }
}
