import { click, fillIn, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | table-receivers', function(hooks) {
  setupRenderingTest(hooks);

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
    included: [
      {
        id: 369,
        attributes: {
          grant_cash_amount: 963258,
          grant_purpose: 'Grant Purpose'
        }
      }
    ]
  };

  test('it renders', async function(assert) {
    this.setProperties({
      model: {
        data: [RECEIVER],
        meta: { totalCount: 1, totalPages: 1 }
      },
      selectedReceiver: undefined,
      selectState: () => { assert.ok('selectState called!') },
      selectReceiver: () => { assert.ok('selectReceiver called!') },
      closePanel: () => { assert.ok('closePanel called!') }
    });

    await render(hbs`
      <TableReceivers
        @receivers={{this.model.data}}
        @meta={{this.model.meta}}
        @selectState={{this.selectState}}
        @selectReceiver={{this.selectReceiver}}
        @selectedReceiver={{this.selectedReceiver}}
        @closePanel={{this.closePanel}}
      />
    `);

    assert.dom('[data-test-id="receivers-table"]').isVisible();
    assert.dom('[data-test-id="select-state-dropdown"]').hasClass('no-filters-applied');
    assert.dom('[data-test-id="receiver-ein"]').containsText(RECEIVER.attributes.ein.toString());
    assert.dom('[data-test-id="receiver-name"]').containsText(RECEIVER.attributes.name);
    assert.dom('[data-test-id="receiver-address"]').containsText(RECEIVER.attributes.address);
    assert.dom('[data-test-id="receiver-city"]').containsText(RECEIVER.attributes.city);
    assert.dom('[data-test-id="receiver-state"]').containsText(RECEIVER.attributes.state);
    assert.dom('[data-test-id="receiver-postal-code"]').containsText(RECEIVER.attributes.postal_code.toString());
    assert.dom('[data-test-id="receiver-awards-count"]').containsText(RECEIVER.included.length.toString());
    assert.dom('[data-test-id="view-receiver"]').isNotDisabled();
  });

  test('it should trigger selectState', async function(assert) {
    assert.expect(2); // should call selectState
    
    this.setProperties({
      model: {
        data: [RECEIVER],
        meta: { totalCount: 1, totalPages: 1 }
      },
      selectedReceiver: undefined,
      selectState: () => { assert.ok('selectState called!') },
      selectReceiver: () => { assert.ok('selectReceiver called!') },
      closePanel: () => { assert.ok('closePanel called!') }
    });

    await render(hbs`
      <TableReceivers
        @receivers={{this.model.data}}
        @meta={{this.model.meta}}
        @selectState={{this.selectState}}
        @selectReceiver={{this.selectReceiver}}
        @selectedReceiver={{this.selectedReceiver}}
        @closePanel={{this.closePanel}}
      />
    `);

    assert.dom('[data-test-id="receiver-name"]').containsText(RECEIVER.attributes.name);
    
    await click('[data-test-id="select-state-dropdown"]');
    await fillIn('[data-test-id="select-state-dropdown"]', 'CA');
  });

  test('it should trigger selectReceiver', async function(assert) {
    assert.expect(2); // should call selectReceiver

    this.setProperties({
      model: {
        data: [RECEIVER],
        meta: { totalCount: 1, totalPages: 1 }
      },
      selectedReceiver: undefined,
      selectState: () => { assert.ok('selectState called!') },
      selectReceiver: () => { assert.ok('selectReceiver called!') },
      closePanel: () => { assert.ok('closePanel called!') }
    });

    await render(hbs`
      <TableReceivers
        @receivers={{this.model.data}}
        @meta={{this.model.meta}}
        @selectState={{this.selectState}}
        @selectReceiver={{this.selectReceiver}}
        @selectedReceiver={{this.selectedReceiver}}
        @closePanel={{this.closePanel}}
      />
    `);

    assert.dom('[data-test-id="receiver-name"]').containsText(RECEIVER.attributes.name);
    
    await click('[data-test-id="view-receiver"]');
  });
});
