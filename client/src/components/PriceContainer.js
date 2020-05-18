import React from 'react';
import './price_container.scss';

const PriceContainer = ({ price }) => {
  return (
    <div className={'flex-container'}>
      <h2 className={'flex-item'}>
        BTC ask price: <span>${(price.ask / 100).toFixed(2)}</span>
      </h2>
      <h2 className={'flex-item'}>
        BTC bid price: <span>${(price.bid / 100).toFixed(2)}</span>
      </h2>
    </div>
  );
};

export default PriceContainer;
