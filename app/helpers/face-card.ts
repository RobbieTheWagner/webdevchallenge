import { helper } from '@ember/component/helper';

export default helper(function faceCard([value]) {
  switch (value) {
    case 'A':
      return 'ace';
    case 'K':
      return 'king';
    case 'Q':
      return 'queen';
    case 'J':
      return 'jack';
    default:
      return value;
  }
});
