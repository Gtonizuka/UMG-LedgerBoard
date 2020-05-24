import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

import './options_view.scss';
import PriceContainer from './PriceContainer';
import ResponsiveTable from './ResponsiveTable';
import Spinner from './Spinner';
import { REST_ENDPOINT } from '../static/API_ENDPOINT';
import { groupBy } from '../utils/groupBy';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

let socket;

const OptionsView = () => {
  const [contracts, setContracts] = useState([]);
  const [btcPrice, setBtcPrice] = useState({ id: 0, bid: 0, ask: 0 });
  const [expireDates, setExpireDates] = useState([]);

  const [isContracts, setIsContracts] = useState(false);
  const [isSocket, setIsSocket] = useState(false);

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

        // Get active contracts
        const active = data.data.filter(
          (contract) => contract.active !== false
        );

        //Add starting prices
        active.forEach((el) => {
          booksTopArr.forEach((x) => {
            if (x.contract_id === el.id) {
              el.bid = x.bid;
              el.ask = x.ask;
            }
          });
        });

        const btc = active.find(
          (el) => el.derivative_type === 'day_ahead_swap'
        );
        console.log('BTC', btc);
        console.log('BTC', btc.id);

        setBtcPrice(btc);

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

        // Get array of expiring date -- Set will remove all duplicates
        const expire = grouped.map((el) => el.date_expires);
        const setOfExpire = [...new Set(expire)];
        setExpireDates(setOfExpire);

        const sorted = grouped.sort((a, b) => a.strike_price - b.strike_price);
        setContracts((prevContracts) => [...prevContracts, ...sorted]);

        // set flag to true to avoid memory leaks
        setIsContracts(true);
      } catch (err) {
        console.error(err);
      }
    };

    // Avoid multiple XHR connections
    if (!isContracts) {
      fetchContracts();
    }

    // WSS is the most likely to have memory leaks so we set the flag to true
    return () => setIsSocket(true);
  }, [setContracts, isContracts]);

  const updateQuote = (data) => {
    const parsed = JSON.parse(data);
    if (parsed.type === 'book_top') {
      const { contract_id, contract_type, ask, bid } = parsed;

      //BTC contract ID
      if (contract_id === btcPrice.id) {
        setBtcPrice({ bid, ask });
      }

      const newContracts = contracts.map((x) => {
        if (x.put && x.call) {
          if (x.put.id === contract_id) {
            x.putClass = 'flash-put';
            x.put.ask = ask;
            x.put.bid = bid;
            setTimeout(() => (x.putClass = 'no-flash'), 3000);
          } else if (x.call.id === contract_id) {
            x.callClass = 'flash-call';
            x.call.ask = ask;
            x.call.bid = bid;
            setTimeout(() => (x.callClass = 'no-flash'), 3000);
          }
        }
        return x;
      });

      setContracts(newContracts);
    }
  };

  // Only start WSS when state is set
  // The reason to have the WSS connection logic outside useEffect is for better performance
  if (contracts.length > 1) {
    if (!isSocket) {
      socket = io('http://localhost:4000');
      setIsSocket(true);
      socket.on('connect', () => {
        console.log('connected to socket');
      });
      socket.on('quotes', (data) => {
        updateQuote(data);
      });
    }
  }

  return (
    <div className={'wrapper'}>
      {' '}
      <PriceContainer price={btcPrice} />
      {contracts.length < 1 ? (
        <Spinner />
      ) : (
        <ResponsiveTable data={contracts} expireDates={expireDates} />
      )}
    </div>
  );
};

export default OptionsView;
