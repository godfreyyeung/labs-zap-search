import { helper } from '@ember/component/helper';
import ENV from 'labs-zap-search/config/environment';

function pad(string, size) {
  while (string.length < (size || 2)) { string = `0${string}`; }
  return string;
}

function bblDemux(bbl) {
  const boro = bbl.substring(0, 1);
  const block = parseInt(bbl.substring(1, 6), 10);
  const lot = parseInt(bbl.substring(6), 10);

  return { boro, block, lot };
}

function zoningResolution(value) {
  // get everything before the hyphen
  const articleChapter = value.split('-')[0];

  // to get article, drop the last character
  const article = pad(articleChapter.slice(0, -1), 2);
  // to get chapter, get the last character
  const chapter = pad(articleChapter.substr(-1), 2);

  // TODO handle values that don't match this hyphenated format (AppendixD, AppendixF, E37-04f1, E37-04g6)

  return `https://www1.nyc.gov/assets/planning/download/pdf/zoning/zoning-text/art${article}c${chapter}.pdf`;
}

function zola(bbl) {
  const { boro, block, lot } = bblDemux(bbl);
  return `https://zola.planning.nyc.gov/lot/${boro}/${block}/${lot}`;
}

function bisweb(bbl) {
  const { boro, block, lot } = bblDemux(bbl);
  return `http://a810-bisweb.nyc.gov/bisweb/PropertyBrowseByBBLServlet?allborough=${boro}&allblock=${block}&alllot=${lot}&go5=+GO+&requestid=0`;
}

function cpcReport(ulurp) {
  const ulurpNumber = ulurp.match(/\d+/g)[0]; // pull 100149 from C100149ZSM to make a cpc report URL
  return `http://www1.nyc.gov/assets/planning/download/pdf/about/cpc/${ulurpNumber}.pdf`;
}

function acris(bbl) {
  const { boro, block, lot } = bblDemux(bbl);
  return `http://a836-acris.nyc.gov/bblsearch/bblsearch.asp?borough=${boro}&block=${block}&lot=${lot}`;
}

function ceqraccess(ceqrnumber) {
  return `${ENV.host}/ceqr/${ceqrnumber}`;
}

function LowerCaseBorough(borough) {
  return borough.charAt(0).toLowerCase() + borough.slice(1);
}

function CommProfiles(boro, cd) {
  const LowerBoro = LowerCaseBorough(boro);
  return `http://communityprofiles.planning.nyc.gov/${LowerBoro}/${cd}`;
}

export function buildUrl([type, value, option]) {
  if (type === 'zoningResolution') return zoningResolution(value);
  if (type === 'zola') return zola(value);
  if (type === 'bisweb') return bisweb(value);
  if (type === 'cpcReport') return cpcReport(value);
  if (type === 'acris') return acris(value);
  if (type === 'ceqraccess') return ceqraccess(value);
  if (type === 'CommProfiles') return CommProfiles(value, option);


  throw new Error('invalid type passed to build-url helper');
}

export default helper(buildUrl);
