import { click, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | table-filers', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.setProperties({
      model: {
        data: [
          {
            id: 123,
            attributes: {
              ein: 123456789,
              name: 'John Doe',
              address: '123 Sunshine Road',
              city: 'Jacksonville',
              state: 'FL',
              postal_code: 32224
            }
          }
        ],
        meta: { totalCount: 1, totalPages: 1 }
      },
      selectedFiler: undefined,
      selectState: () => { assert.ok('selectState called!') },
      selectFiler: () => { assert.ok('selectFiler called!') },
      closePanel: () => { assert.ok('closePanel called!') }
    });

    await render(hbs`
      <TableFilers
        @filers={{this.model.data}}
        @meta={{this.model.meta}}
        @selectState={{this.selectState}}
        @selectFiler={{this.selectFiler}}
        @selectedFiler={{this.selectedFiler}}
        @closePanel={{this.closePanel}}
      />
    `);

    assert.dom('[data-test-id="filer-name"]').containsText('');
  });

  test('it should trigger selectState', async function(assert) {
    assert.expect(2); // should call selectState

    this.setProperties({
      model: {
        data: [
          {
            id: 123,
            attributes: {
              ein: 123456789,
              name: 'John Doe',
              address: '123 Sunshine Road',
              city: 'Jacksonville',
              state: 'FL',
              postal_code: 32224
            }
          }
        ],
        meta: { totalCount: 1, totalPages: 1 }
      },
      selectedFiler: undefined,
      selectState: () => { assert.ok('selectState called!') },
      selectFiler: () => { assert.ok('selectFiler called!') },
      closePanel: () => { assert.ok('closePanel called!') }
    });

    await render(hbs`
      <TableFilers
        @filers={{this.model.data}}
        @meta={{this.model.meta}}
        @selectState={{this.selectState}}
        @selectFiler={{this.selectFiler}}
        @selectedFiler={{this.selectedFiler}}
        @closePanel={{this.closePanel}}
      />
    `);

    assert.dom('[data-test-id="filer-name"]').containsText('John Doe');
    
    await click('[data-test-id="select-state-dropdown"]');
    await click('[data-test-id="select-state-dropdown"] option:nth-child(2)');
  });

  test('it should trigger selectFiler', async function(assert) {
    assert.expect(2); // should call selectFiler

    this.setProperties({
      model: {
        data: [
          {
            id: 123,
            attributes: {
              ein: 123456789,
              name: 'John Doe',
              address: '123 Sunshine Road',
              city: 'Jacksonville',
              state: 'FL',
              postal_code: 32224
            }
          }
        ],
        meta: { totalCount: 1, totalPages: 1 }
      },
      selectedFiler: undefined,
      selectState: () => { assert.ok('selectState called!') },
      selectFiler: () => { assert.ok('selectFiler called!') },
      closePanel: () => { assert.ok('closePanel called!') }
    });

    await render(hbs`
      <TableFilers
        @filers={{this.model.data}}
        @meta={{this.model.meta}}
        @selectState={{this.selectState}}
        @selectFiler={{this.selectFiler}}
        @selectedFiler={{this.selectedFiler}}
        @closePanel={{this.closePanel}}
      />
    `);

    assert.dom('[data-test-id="filer-name"]').containsText('John Doe');
    
    await click('[data-test-id="edit-filer"]');
  });
});
