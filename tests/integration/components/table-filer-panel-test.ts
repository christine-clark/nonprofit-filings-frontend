import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import click from '@ember/test-helpers/dom/click';

module('Integration | Component | table-filer-panel', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.setProperties({
      model: {
        id: 123,
        attributes: {
          ein: 123456789,
          name: 'John Doe',
          address: '123 Sunshine Road',
          city: 'Jacksonville',
          state: 'FL',
          postal_code: 32224
        }
      },
      closePanel: () => { assert.ok('closePanel called!') }
    });

    await render(hbs`
      <TableFilerPanel
        @filer={{this.model}}
        @closePanel={{this.closePanel}}
      />
    `);
    assert.dom('[data-test-id="filer-name"]').containsText('John Doe');
  });

  test('it triggers closePanel', async function(assert) {
    assert.expect(3); // should call closePanel

    this.setProperties({
      model: {
        id: 123,
        attributes: {
          ein: 123456789,
          name: 'John Doe',
          address: '123 Sunshine Road',
          city: 'Jacksonville',
          state: 'FL',
          postal_code: 32224
        }
      },
      closePanel: () => { assert.ok('closePanel called!') }
    });

    await render(hbs`
      <TableFilerPanel
        @filer={{this.model}}
        @closePanel={{this.closePanel}}
      />
    `);
    assert.dom('[data-test-id="filer-name"]').containsText('John Doe');

    await click('[data-test-id="close-panel-button"]');
    assert.dom('[data-test-id="filer-name"]').doesNotExist();
  });
});
