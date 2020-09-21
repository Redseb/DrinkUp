import cards from './cards';

/* Returns an array of cards randomly shuffled */
const initDeck = () => {
  const newDeck = shuffle(cards);
  return newDeck;
};

/* Accepts an array of cards and shuffles it */
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/* Returns and  */
const nextCard = () => {};

export {initDeck, shuffle, nextCard};
