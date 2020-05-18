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
    // Get contract ID from path so no need to pass props
    const path = pathname[2];

    const fetchData = async () => {
      try {
        const apiData = await axios.get(`http://localhost:4000/historic`);
        const { data } = apiData;
        const current = data.find((el) => el.contract_id == path);

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
    <div className={'wrapper'}>
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
            <Line type='monotone' dataKey='midpoint' stroke='#2a2252' />
          </LineChart>{' '}
        </div>
      )}
    </div>
  );
};

export default ContractView;
