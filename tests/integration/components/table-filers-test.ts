import { click, fillIn, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | table-filers', function(hooks) {
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
      model: {
        data: [FILER],
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

    assert.dom('[data-test-id="filers-table"]').isVisible();
    assert.dom('[data-test-id="select-state-dropdown"]').hasClass('no-filters-applied');
    assert.dom('[data-test-id="filer-ein"]').containsText(FILER.attributes.ein.toString());
    assert.dom('[data-test-id="filer-name"]').containsText(FILER.attributes.name);
    assert.dom('[data-test-id="filer-address"]').containsText(FILER.attributes.address);
    assert.dom('[data-test-id="filer-city"]').containsText(FILER.attributes.city);
    assert.dom('[data-test-id="filer-state"]').containsText(FILER.attributes.state);
    assert.dom('[data-test-id="filer-postal-code"]').containsText(FILER.attributes.postal_code.toString());
    assert.dom('[data-test-id="view-filer"]').isNotDisabled();
  });

  test('it should trigger selectState', async function(assert) {
    assert.expect(2); // should call selectState
    
    this.setProperties({
      model: {
        data: [FILER],
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

    assert.dom('[data-test-id="filer-name"]').containsText(FILER.attributes.name);
    
    await click('[data-test-id="select-state-dropdown"]');
    await fillIn('[data-test-id="select-state-dropdown"]', 'CA');
  });

  test('it should trigger selectFiler', async function(assert) {
    assert.expect(2); // should call selectFiler

    this.setProperties({
      model: {
        data: [FILER],
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

    assert.dom('[data-test-id="filer-name"]').containsText(FILER.attributes.name);
    
    await click('[data-test-id="view-filer"]');
  });
});
