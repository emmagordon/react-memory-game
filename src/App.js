import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './App.css';
import Random from './Random';
import { MatchingCardPair } from './PlayingCard';

const App = () => {
  const [gameId, setGameId] = useState(0);
  return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />
}

const Game = props => {
  const {
    cards, cardViewCount, alreadyMatched, isFaceUp, setGameState
  } = useGameState();

  const handleCardClick = card => {
    if (alreadyMatched(card)) {
      return;
    }
    setGameState(card);
  }

  return (
    <div className="memory-game">
      <div className="header"><h1>Memory Game</h1></div>
      <div className="cards-grid">
        {cards.map(c =>
          <Card
            key={c.id}
            card={c}
            isFaceUp={isFaceUp(c)}
            onClick={handleCardClick}
          />
        )}
      </div>
      <div className="game-info">
        <div className="score">Card Views: {cardViewCount}</div>
        <button className="reset" onClick={props.startNewGame}>Reset</button>
      </div>
    </div>
  );
}

const Card = props => {
  const face = (props.isFaceUp) ? 'front' : 'back';
  return (
    <div
      className={`card ${face}`}
      style={{ color: (props.isFaceUp) ? props.card.color : 'transparent' }}
      onClick={() => props.onClick(props.card)}
    >
      {props.card.value + props.card.suit}
    </div>
  );
};

const useGameState = () => {
  const [numPairs] = useState(6);
  const [cards] = useState(generateCards(numPairs));
  const [cardViewCount, setCardViewCount] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    if (selectedCards.length > 1) {
      const timerId = setTimeout(() => {
        setSelectedCards([]);
      }, 500);
      return () => clearTimeout(timerId);
    }
  });

  const alreadyMatched = card => (
    matchedCards.filter(c => c.id === card.id).length > 0);

  const isSelected = card => (
    selectedCards.filter(c => c.id === card.id).length > 0);

  const isFaceUp = card => isSelected(card) || alreadyMatched(card);

  const setGameState = clickedCard => {
    if (isSelected(clickedCard)) {
      setSelectedCards([]);
      return;
    }

    setCardViewCount(cardViewCount + 1);
    const newSelectedCards = selectedCards.concat(clickedCard);

    if (newSelectedCards.length === 1 || newSelectedCards.length > 2) {
      setSelectedCards([clickedCard]);
    }
    else if (newSelectedCards[0].matches(newSelectedCards[1])) {
      setMatchedCards(matchedCards.concat(newSelectedCards));
      setSelectedCards([]);
    }
    else {
      setSelectedCards(newSelectedCards);
    }
  }

  return { cards, cardViewCount, alreadyMatched, isFaceUp, setGameState };
}

const generateCards = numPairs => (
  Random.shuffle(
    _.range(numPairs).reduce((acc, _) => acc.concat(new MatchingCardPair()), [])
  )
);

export default App;
