import _ from 'lodash';
import Random from './Random.js';

const spade = '\u2660';
const heart = '\u2665';
const diamond = '\u2666';
const club = '\u2663';

const cardSuits = [spade, heart, diamond, club];
const redSuits = [heart, diamond];

const cardValues = ['A', 'J', 'Q', 'K'].concat(_.range(2, 11).map(n => n.toString()));

class PlayingCard {
    static globalCardCounter = 0;

    constructor(suit, value) {
        this.suit = suit || Random.choice(cardSuits);
        this.value = value || Random.choice(cardValues);
        this.id = PlayingCard.globalCardCounter++;
    }

    get color() {
        return redSuits.includes(this.suit) ? 'red' : 'black';
    }

    matches(other) {
        return (
            (other instanceof PlayingCard)
            && (this.value === other.value)
            && (this.suit === other.suit)
        );
    }
}

function MatchingCardPair() {
    const card1 = new PlayingCard();
    const card2 = new PlayingCard(card1.suit, card1.value);
    return [card1, card2];
}

export { PlayingCard as default, MatchingCardPair };
