import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import click from '@ember/test-helpers/dom/click';

module('Integration | Component | table-filer-panel', function(hooks) {
  setupRenderingTest(hooks);

  const FILER = {
    id: 123,
    attributes: {
      ein: 123456789,
      name: 'John Doe',
      address: '123 Sunshine Road',
      city: 'Jacksonville',
      state: 'FL',
      postal_code: 32224
    }
  };

  test('it renders', async function(assert) {
    this.setProperties({
      model: FILER,
      closePanel: () => { assert.ok('closePanel called!') }
    });

    await render(hbs`
      <TableFilerPanel
        @filer={{this.model}}
        @closePanel={{this.closePanel}}
      />
    `);
    assert.dom('[data-test-id="quick-edit-panel"]').isVisible();
    assert.dom('[data-test-id="close-panel-button"]').isNotDisabled();
    assert.dom('[data-test-id="filer-ein"]').containsText(FILER.attributes.ein.toString());
    assert.dom('[data-test-id="filer-name"]').containsText(FILER.attributes.name);
    assert.dom('[data-test-id="filer-address"]').containsText(FILER.attributes.address);
    assert.dom('[data-test-id="filer-city"]').containsText(FILER.attributes.city);
    assert.dom('[data-test-id="filer-state"]').containsText(FILER.attributes.state);
    assert.dom('[data-test-id="filer-postal-code"]').containsText(FILER.attributes.postal_code.toString());
  });

  test('it triggers closePanel', async function(assert) {
    assert.expect(3); // should call closePanel

    this.setProperties({
      model: FILER,
      closePanel: () => { assert.ok('closePanel called!') }
    });

    await render(hbs`
      <TableFilerPanel
        @filer={{this.model}}
        @closePanel={{this.closePanel}}
      />
    `);
    assert.dom('[data-test-id="quick-edit-panel"]').isVisible();
    assert.dom('[data-test-id="filer-name"]').containsText(FILER.attributes.name);

    await click('[data-test-id="close-panel-button"]');
  });
});
