import Component from '@ember/component';
// import { argument } from '@ember-decorators/argument';
import { action, computed } from '@ember-decorators/object';
import { generateCircleFromFeet } from 'labs-zap-search/helpers/generate-circle-from-feet';

// it takes a point and radius, computes a geojson circle
// and handles clicks that query mapbox-gl for intersections
// triggers optional events
export default class FilterDistanceFromPoint extends Component {
  // @argument
  map;

  // @argument
  pointGeometry;

  // @argument
  radius;

  // @argument
  onRadiusFilterClick = () => {}

  // @argument
  pointLayerId = 'project-centroids-circle';

  // @argument
  shouldQueryFullMap = false;

  // geojson
  @computed('pointGeometry', 'radius')
  get circleFromRadius() {
    const { pointGeometry, radius } = this;

    return generateCircleFromFeet([pointGeometry, radius]);
  }

  // queries relevant layer for intersecting feature and sends it
  // to the click action. conditionally allows for clicking
  // anywhere on the map

  // this has nothing to do with SEARCH
  @action
  handleClick(e) {
    const { target: map } = e; // map
    const { point } = e; // point = coordinates, only logs when you have SEARCHED and then click a point on the map to make a new point
    // e --> lngLat, originalEvent: MouseEvent, point, target, type: "click"
    console.log('point peach', point);
    const [feature] = map.queryRenderedFeatures( // returns array of GeoJSON feature objects representing visible features that satisfy the query parameters
      point, // query rendered features at this coordinate
      { layers: [this.pointLayerId] }, // project-centroids-circle
    );

    // if point exists
    if (feature) {
      const { geometry: { coordinates } } = feature; // feature.geometry.coordinates
      console.log('coordinates peach', coordinates); // Starfruit: confused about when this shows up, only sometimes?
      console.log('feature peach 2', feature); // confused about when this shows up, only sometimes?
      const heyaaa = this.onRadiusFilterClick(coordinates);
      console.log('onRadius peachy', heyaaa);
      console.log('heyyy');

      this.onRadiusFilterClick(coordinates);
    } else if (this.shouldQueryFullMap) {
      const { lng, lat } = map.unproject(point); // turn back into lat/lng
      console.log('hooo');

      this.onRadiusFilterClick([lng, lat]);
    }
  }
}
