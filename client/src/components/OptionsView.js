import React, { useState, useEffect } from 'react';
import './options_view.scss';
import axios from 'axios';
import io from 'socket.io-client';

import PriceContainer from './PriceContainer';
import ResponsiveTable from './ResponsiveTable';
import { REST_ENDPOINT } from '../static/API_ENDPOINT';
import { groupBy } from '../utils/groupBy';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

let socket;

const OptionsView = () => {
  const [contracts, setContracts] = useState([]);
  const [btcPrice, setBtcPrice] = useState({ bid: 0, ask: 0 });

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

        const btc = booksTopArr.find((el) => el.contract_id === 22200586);
        setBtcPrice({
          ask: btc.ask,
          bid: btc.bid,
        });

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

        // setContracts(grouped);
        setContracts((prevContracts) => [...prevContracts, ...grouped]);

        setIsContracts(true);
      } catch (err) {
        console.error(err);
      }
    };

    // Avoid multiple XHR connections
    if (!isContracts) {
      fetchContracts();
    }
  }, [setContracts]);

  const updateQuote = (data) => {
    const parsed = JSON.parse(data);
    if (parsed.type === 'book_top') {
      const { contract_id, contract_type, ask, bid } = parsed;

      if (contract_id === 22200586 || contract_type === 2) {
        setBtcPrice({ bid, ask });
      }

      const newContracts = contracts.map((x) => {
        if (x.put && x.call) {
          if (x.put.id === contract_id) {
            x.putClass = 'flash-put';
            x.put.ask = ask;
            x.put.bid = bid;
            setTimeout(() => (x.putClass = 'no-call'), 3000);
          } else if (x.call.id === contract_id) {
            x.callClass = 'flash-call';
            x.call.ask = ask;
            x.call.bid = bid;
            setTimeout(() => (x.callClass = 'no-call'), 3000);
          }
        }
        return x;
      });

      setContracts(newContracts);
    }
  };

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
      {contracts && <ResponsiveTable data={contracts} />}
    </div>
  );
};

export default OptionsView;
