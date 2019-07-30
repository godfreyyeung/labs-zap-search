import DS from 'ember-data';
import { attr, hasMany } from '@ember-decorators/data';
import { computed } from '@ember-decorators/object';

const { Model } = DS;

const EmptyFeatureCollection = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: null,
    properties: {
      isEmptyDefault: true,
    },
  }],
};

export default class ProjectModel extends Model {
  // can we replace this array/string of action codes with action model?
  @hasMany('action') actions;
  @hasMany('user') users;

  @attr() applicantteam;

  // array of applicant objects
  @attr() applicants;

  // semicolon delimited applicant names
  @attr('string') dcp_projectid;

  @attr('string') dcp_name;

  @attr('string') dcp_alterationmapnumber;

  @attr() dcp_applicanttype;

  @attr() dcp_borough;

  @attr('string') dcp_bsanumber;

  @attr('string') dcp_ceqrnumber;

  @attr() dcp_ceqrtype;

  @attr('string') dcp_certifiedreferred;

  @attr('string') dcp_decpermitnumber;

  @attr() dcp_easeis;

  @attr('boolean') dcp_femafloodzonea;

  @attr('boolean') dcp_femafloodzonecoastala;

  @attr('boolean') dcp_femafloodzoneshadedx;

  @attr('boolean') dcp_femafloodzonev;

  @attr() dcp_leaddivision;

  @attr('string') dcp_lpcnumber;

  @attr('string') dcp_nydospermitnumber;

  @attr('boolean') dcp_previousactiononsite;

  @attr('string') dcp_projectbrief;

  @attr('string') dcp_projectname;

  @attr() dcp_publicstatus_simp;

  @attr() dcp_hiddenprojectmetrictarget;

  @attr('boolean') dcp_sischoolseat;

  @attr('boolean') dcp_sisubdivision;

  @attr('string') dcp_ulurp_nonulurp;

  @attr('string') dcp_wrpnumber;

  @attr() dcp_communitydistrict;

  @attr('string') dcp_communitydistricts;

  @attr('string') dcp_validatedcommunitydistricts;

  @attr('boolean') has_centroid;

  @attr() bbls;

  @attr({ defaultValue: () => EmptyFeatureCollection })
  bbl_featurecollection

  @attr() milestones;

  // array of action codes?
  // @attr() actions;

  @attr() addresses;

  @attr() keywords;

  @attr() ulurpnumbers;

  @attr() center;

  @attr() lastmilestonedate;

  @attr() video_links;

  @computed('bbl_featurecollection')
  get bblFeatureCollectionSource() {
    const data = this.bbl_featurecollection;
    return {
      type: 'geojson',
      data,
    };
  }
}
