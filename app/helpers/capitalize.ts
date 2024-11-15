import { helper } from '@ember/component/helper';
import { capitalize as _capitalize } from '@ember/string';

export default helper(function capitalize([text]: [string]) {
  return _capitalize(text);
});
