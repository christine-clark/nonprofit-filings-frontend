import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import click from '@ember/test-helpers/dom/click';

module('Integration | Component | table-receiver-panel', function(hooks) {
  setupRenderingTest(hooks);

  const AWARD = {
    id: 369,
    attributes: {
      grant_cash_amount: 963258,
      grant_purpose: 'Grant Purpose'
    }
  };
  const RECEIVER = {
    id: 123,
    attributes: {
      ein: 123456789,
      name: 'John Doe',
      address: '123 Sunshine Road',
      city: 'Jacksonville',
      state: 'FL',
      postal_code: 32224
    },
    included: [AWARD]
  };

  test('it renders info tab', async function(assert) {
    this.setProperties({
      model: RECEIVER,
      closePanel: () => { assert.ok('closePanel called!') }
    });

    await render(hbs`
      <TableReceiverPanel
        @receiver={{this.model}}
        @closePanel={{this.closePanel}}
      />
    `);
    assert.dom('[data-test-id="quick-edit-panel"]').isVisible();
    assert.dom('[data-test-id="close-panel-button"]').isNotDisabled();
    assert.dom('[data-test-id="receiver-ein"]').containsText(RECEIVER.attributes.ein.toString());
    assert.dom('[data-test-id="receiver-name"]').containsText(RECEIVER.attributes.name);
    assert.dom('[data-test-id="receiver-address"]').containsText(RECEIVER.attributes.address);
    assert.dom('[data-test-id="receiver-city"]').containsText(RECEIVER.attributes.city);
    assert.dom('[data-test-id="receiver-state"]').containsText(RECEIVER.attributes.state);
    assert.dom('[data-test-id="receiver-postal-code"]').containsText(RECEIVER.attributes.postal_code.toString());
  });

  test('it renders awards tab', async function(assert) {
    this.setProperties({
      model: RECEIVER,
      closePanel: () => { assert.ok('closePanel called!') }
    });

    await render(hbs`
      <TableReceiverPanel
        @receiver={{this.model}}
        @closePanel={{this.closePanel}}
      />
    `);
    assert.dom('[data-test-id="quick-edit-panel"]').isVisible();
    assert.dom('[data-test-id="close-panel-button"]').isNotDisabled();
    assert.dom('[data-test-id="receiver-ein"]').containsText(RECEIVER.attributes.ein.toString());

    await click('[data-test-id="quick-edit-panel"] .nav-item:nth-child(2)');
    assert.dom('[data-test-id="award-info"]').containsText(AWARD.attributes.grant_cash_amount.toString());
    assert.dom('[data-test-id="award-info"]').containsText(AWARD.attributes.grant_purpose);
  });

  test('it triggers closePanel', async function(assert) {
    assert.expect(3); // should call closePanel

    this.setProperties({
      model: RECEIVER,
      closePanel: () => { assert.ok('closePanel called!') }
    });

    await render(hbs`
      <TableReceiverPanel
        @receiver={{this.model}}
        @closePanel={{this.closePanel}}
      />
    `);
    assert.dom('[data-test-id="quick-edit-panel"]').isVisible();
    assert.dom('[data-test-id="receiver-name"]').containsText(RECEIVER.attributes.name);

    await click('[data-test-id="close-panel-button"]');
  });
});
