import { shuffle } from "lodash";

export const SuperForces = {
  1: {
    name: "Прозрение",
    imageUrl: "",
    use: game => {
      const closedCards = game.cards.filter(c => !c.open);
      const newCards = game.cards.map(c => ({ ...c, open: true }));
      game.setCards(newCards);
      game.setIsReadOnly(true);
      game.timer.stop();

      setTimeout(() => {
        closedCards.forEach(c => (c.open = false));
        game.refreshCards();
        game.setIsReadOnly(false);
        game.timer.resume();
      }, 5000);
    },
  },

  2: {
    name: "Алохомора",
    imageUrl: "",
    use: game => {
      let closedCards = game.cards.filter(c => !c.open);
      closedCards = shuffle(closedCards);
      if (closedCards.length >= 2) {
        closedCards[0].open = true;
        closedCards[1].open = true;
        game.refreshCards();
      }
    },
  },
};
