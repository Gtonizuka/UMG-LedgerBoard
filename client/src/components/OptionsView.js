import React, { useState, useEffect } from 'react';
import './options_view.scss';
import axios from 'axios';
import io from 'socket.io-client';

import ResponsiveTable from './ResponsiveTable';
import { REST_ENDPOINT } from '../static/API_ENDPOINT';
import { groupBy } from '../utils/groupBy';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

// const socket = io('http://localhost:4000');

// socket.on('connect', () => {
//   console.log('connected to socket');
//   socket.on('quotes', (data) => console.log(data));
// });

const OptionsView = () => {
  const [contracts, setContracts] = useState([]);

  const [expireDates, setExpireDates] = useState([]);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const booksTop = await axios.get(
          `${proxyUrl}${REST_ENDPOINT}/book-tops?`
        );
        const booksTopArr = booksTop.data.data;

        const { data } = await axios.get(
          `${proxyUrl}${REST_ENDPOINT}/contracts?after_ts=2020-05-15T00%3A00%3A00.000Z&limit=0`
        );

        // Get expiration dates
        const expire = contracts.map((el) => el.date_expires);
        const filtered = [...new Set(expire)];
        setExpireDates(filtered);

        // Get active contracts
        const active = data.data.filter(
          (contract) => contract.active !== false
        );

        //Add starting prices
        const pricedContracts = active.map((el) => {
          booksTopArr.forEach((x) => {
            if (x.contract_id === el.id) {
              el.bid = x.bid;
              el.ask = x.ask;
            }
          });
        });

        // Group contracts
        const grouped = groupBy(
          active,
          (item) => [item.date_expires, item.strike_price],
          (group = {}, { date_expires, strike_price, ...el }) => ({
            ...group,
            date_expires,
            strike_price,
            [el.type]: el,
          })
        );

        setContracts(grouped);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContracts();
  }, []);

  console.log(contracts, 'contractt');

  return (
    <div>
      <h1> QuoteBook </h1>
      {contracts && <ResponsiveTable data={contracts} />}
    </div>
  );
};

export default OptionsView;
