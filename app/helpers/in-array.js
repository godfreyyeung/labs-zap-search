import { helper } from '@ember/component/helper';

export default helper(function inArray(params) { 
  let [optionActions, elem] = params;
  return optionActions.includes(elem);
});
