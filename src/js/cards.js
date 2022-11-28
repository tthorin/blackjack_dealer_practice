const generateCards = () => {
  //♥♣♦♠
  const suits = ["♥", "♣", "♦", "♠"];
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9"];
  const numberOfDecks = 3;
  const cards = [];
  let id = 0;

  for (let i = 0; i < numberOfDecks; i++) {
    for (let j = 0; j < suits.length; j++) {
      for (let k = 0; k < values.length; k++) {
        cards.push({
          id: id,
          suit: suits[j],
          display: values[k],
		  value: values[k] === "A" ? 1 : values[k],
          secondaryValue: values[k] === "A" ? 11 : values[k],
          color: suits[j] === "♥" || suits[j] === "♦" ? "red" : "black",
		  hand: "deck"
        });
        id++;
      }
    }
  }
  return cards;
};

const shuffleCards = (cards) => {
  for (let i = 0; i < cards.length; i++) {
    const randomIndex = Math.floor(Math.random() * cards.length);
    const temp = cards[i];
    cards[i] = cards[randomIndex];
    cards[randomIndex] = temp;
  }
};

const getShuffledCards = () => {
	  const cards = generateCards();
	  shuffleCards(cards);
	  return cards;
};

export { getShuffledCards, generateCards, shuffleCards };
