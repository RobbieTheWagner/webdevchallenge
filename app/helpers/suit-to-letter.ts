import { helper } from '@ember/component/helper';

export default helper(function suitToLetter([suit]) {
  switch (suit) {
    case 'clubs':
      return 'C';
    case 'diamonds':
      return 'D';
    case 'hearts':
      return 'H';
    case 'spades':
      return 'S';
  }
});
