import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import axios from 'axios';
import moment from 'moment';

import './contract_view.scss';

const ContractView = ({ location }) => {
  const [historic, setHistoric] = useState([]);
  const [isMoundted, setIsMounted] = useState(false);
  const [contractId, setContractId] = useState('');

  useEffect(() => {
    let pathname = location.pathname.split('/');
    const path = pathname[2];

    const fetchData = async () => {
      try {
        const apiData = await axios.get(`http://localhost:4000/historic`);
        const { data } = apiData;
        data.map((el) => console.log(el.contract_id));
        const current = data.find((el) => el.contract_id == path);

        console.log(current, 'currentt');
        setContractId(current.contract_id);

        const midPointPrices = current.prices.map((el) => {
          return {
            midpoint: (el.ask + el.bid) / 2,
            name: moment(el.time).format('HH:mm'),
          };
        });

        setHistoric(midPointPrices);
      } catch (err) {
        console.error(err);
      }
    };

    if (!isMoundted) {
      fetchData();
    }

    // Avoid multiple XHR connections
    return () => setIsMounted(true);
  }, []);

  return (
    <div>
      {historic && (
        <div>
          <h1>Data for contract: {contractId}</h1>
          <LineChart
            width={1000}
            height={300}
            data={historic}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='midpoint' stroke='#82ca9d' />
          </LineChart>{' '}
        </div>
      )}
    </div>
  );
};

export default ContractView;
