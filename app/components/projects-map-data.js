import Component from '@ember/component';
import mapboxgl from 'mapbox-gl';
import { action } from '@ember-decorators/object';
import { argument } from '@ember-decorators/argument';
import { service } from '@ember-decorators/service';

export default class ProjectsMapComponent extends Component {
  constructor() {
    super(...arguments);
  }

  @service router;
  @service resultMapEvents;

  // required
  @argument meta = {};

  tooltipPoint = { x: 0, y: 0 }

  highlightedFeature = null

  popup = new mapboxgl.Popup({
   closeOnClick: false,
  });

  @action
  handleMapLoad(map) {
    window.map = map;
    this.set('mapInstance', map);

    const navigationControl = new mapboxgl.NavigationControl();
    map.addControl(navigationControl, 'top-left');

    const geoLocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    map.addControl(geoLocateControl, 'top-left');

    this.get('resultMapEvents').on('hover', this, 'hoverPoint');
    this.get('resultMapEvents').on('unhover', this, 'unHoverPoint');
  }

  @action
  handleMouseMove(e) {
    const map = this.get('mapInstance');
    const [feature] = map.queryRenderedFeatures(
      e.point,
      { layers: ['project-centroids-circle'] }
    );

    if (feature) {
      this.set('highlightedFeature', feature);

      this.set('tooltipPoint', {
        x: e.point.x + 20,
        y: e.point.y + 20,
      });

      map.getCanvas().style.cursor = 'pointer';

    } else {
      this.set('highlightedFeature', null);

      map.getCanvas().style.cursor = 'default';

    }
  }

  @action
  handleMapClick(e) {
    const map = this.get('mapInstance');
    const [feature] = map.queryRenderedFeatures(
      e.point,
      { layers: ['project-centroids-circle'] }
    );

    if (feature) {
      const projectid = feature.properties.projectid;
      this.get('router').transitionTo('show-project', projectid);
    }
  }

  hoverPoint({ id, layerId }) {
    this.get('mapInstance')
      .setLayoutProperty(layerId, 'visibility', 'visible')
      .setPaintProperty('project-centroids-circle', 'circle-blur', 0.9)
      .setFilter(layerId, ["==", ["get", "projectid"], id]);
  }

  unHoverPoint({ layerId }) {
    this.get('mapInstance')
      .setPaintProperty('project-centroids-circle', 'circle-blur', 0)
      .setLayoutProperty(layerId, 'visibility', 'none');
  }

  willDestroyElement() {
    this.get('resultMapEvents').off('hover', this, 'hoverPoint');
    this.get('resultMapEvents').off('unhover', this, 'unHoverPoint');
  }
}
