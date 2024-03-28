import { shuffle } from "lodash";

export const SuperForces = {
  1: {
    name: "Прозрение",
    imageUrl: "./images/insight.svg",
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
        game.timer.start();
      }, 5000);
    },
  },

  2: {
    name: "Алохомора",
    imageUrl: "./images/alohomora.svg",
    use: game => {
      let closedCards = game.cards.filter(c => !c.open);
      closedCards = shuffle(closedCards);
      if (closedCards.length >= 2) {
        closedCards
          .filter(c => c.suit === closedCards[0].suit && c.rank === closedCards[0].rank)
          .forEach(c => (c.open = true));
        game.refreshCards();

        if (game.cards.filter(card => card.open).length === game.cards.length) {
          game.Won();
        }
      }
    },
  },
};
