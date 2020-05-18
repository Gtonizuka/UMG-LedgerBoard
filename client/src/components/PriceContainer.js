import React, { useState, useEffect } from 'react';
import './price_container.scss';

const PriceContainer = ({ price }) => {
  return (
    <div className={'flex-container'}>
      <h2 className={'flex-item'}>
        BTC ask price: <span>${price.ask}</span>
      </h2>
      <h2 className={'flex-item'}>
        BTC bid price: <span>${price.bid}</span>
      </h2>
    </div>
  );
};

export default PriceContainer;
