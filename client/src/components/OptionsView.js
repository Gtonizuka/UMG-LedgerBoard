import React, { useState, useEffect } from 'react';
import './options_view.scss';
import axios from 'axios';
import io from 'socket.io-client';

import ResponsiveTable from './ResponsiveTable';
// import { groupBy } from '../utils/groupBy';
// import { getSortedKeyValue } from '../utils/getSortedKeyValue';
// import { executeCommand } from '../socketsEvents';
import { REST_ENDPOINT } from '../static/commands';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
// const socket = io('http://localhost:4000');

// socket.on('connect', () => {
//   console.log('connected to socket');
//   socket.on('suca', (data) => console.log(data));
// });

const OptionsView = () => {
  const [contracts, setContracts] = useState([]);

  const [expireDates, setExpireDates] = useState([]);

  const [booksTop, setbooksTop] = useState([]);

  // BROWSER - DOES NOT WORK

  //   var socket = io('http://localhost:4000', {
  //     rememberUpgrade: true,
  //     transports: ['websocket'],
  //     secure: true,
  //     rejectUnauthorized: false,
  //   });

  function groupBy(array, f) {
    var groups = {};
    array.forEach(function (o) {
      var group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
      return groups[group];
    });
  }

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const booksTop = await axios.get(
          `${proxyUrl}${REST_ENDPOINT}/book-tops?`
        );
        setbooksTop(booksTop);

        const { data } = await axios.get(
          `${proxyUrl}${REST_ENDPOINT}/contracts?after_ts=2020-05-15T00%3A00%3A00.000Z&limit=0`
        );
        console.log(data);

        // Get expiration dates
        const expire = contracts.map((el) => el.date_expires);
        const filtered = [...new Set(expire)];
        setExpireDates(filtered);

        // Only get active contracts
        const active = data.data.filter(
          (contract) => contract.active !== false
        );

        const booksTopArr = booksTop.data.data;

        //Add initial prices
        const pricedContracts = active.map((el) => {
          booksTopArr.forEach((x) => {
            if (x.contract_id === el.id) {
              console.log(x.contract_id);
              console.log(el.id);
              el.bid = x.bid;
              el.ask = x.ask;
            }
          });
        });

        // Get contracts structure

        const grouped = groupBy(active, function (item) {
          return [item.date_expires, item.strike_price];
        });

        const finalContracts = grouped.map((el) => {
          if (el[0].date_expires && el[0].strike_price) {
            const result = {
              date_expires: el[0].date_expires,
              strike_price: el[0].strike_price,
            };

            if (el[0].type === 'put') {
              result.put = el[0];
              result.call = el[1];
            } else if (el[0].type === 'call') {
              result.put = el[1];
              result.call = el[0];
            }

            return result;
          }
        });

        setContracts(finalContracts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContracts();
  }, []);

  console.log(contracts, 'resultt');
  console.log(booksTop.data, 'book');
  return (
    <div>
      <h1> QuoteBook </h1>
      {contracts && <ResponsiveTable data={contracts} />}
    </div>
  );
};

export default OptionsView;
