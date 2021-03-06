import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ProjectListMapComponent from 'labs-zap-search/components/structural/project-list-map';
import Component from '@ember/component';
import setupMockBoxHooks from '../../../helpers/mapbox-gl-stub';

module('Integration | Component | structural/project-list-map', function(hooks) {
  setupRenderingTest(hooks);
  setupMockBoxHooks(hooks);

  hooks.beforeEach(function() {
    const that = this;
    class ProjectListMapStub extends ProjectListMapComponent {
      init(...args) {
        super.init(...args);

        that.component = this;
      }
    }

    this.owner.register('component:structural/project-list-map', ProjectListMapStub);
    this.owner.register('component:mapbox-gl-dynamic-tiles', Component);
  });

  test('it renders', async function(assert) {
    await render(hbs`
      {{structural/project-list-map
        tiles=(array 'https://google.com')
      }}
    `);

    this.mapboxEventStub = {
      target: {
        getZoom: () => {
          assert.ok('event is called');

          return 15;
        },
      },
    };

    await triggerEvent('.mapbox-gl', 'zoomend');

    assert.equal(this.element.textContent.trim(), '');
    assert.equal(this.component.tileMode, 'polygons');
    assert.deepEqual(this.component.tilesForZoom, ['https://google.com?type=polygons']);
  });
});
