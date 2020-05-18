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

import './contract_view.scss';

const ContractView = ({ location }) => {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const [historic, setHistoric] = useState([]);
  const [isMoundted, setIsMounted] = useState(false);
  const [contractId, setContractId] = useState('');

  useEffect(() => {
    // console.log(location.pathname);
    let pathname = location.pathname.split('/');
    const path = pathname[2];
    console.log(path, 'paaa');

    const fetchData = async () => {
      try {
        const apiData = await axios.get(`http://localhost:4000/historic`);
        const { data } = apiData;
        console.log(pathname, ' pathh');
        data.map((el) => console.log(el.contract_id));
        const current = data.find((el) => el.contract_id == path);

        console.log(current, 'currentt');
        setContractId(current.contract_id);

        const midPointPrices = current.prices.map((el) => {
          return {
            midpoint: (el.ask + el.bid) / 2,
            name: el.time,
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

  console.log(historic, 'lovc');
  return (
    <div>
      {historic && (
        <div>
          <h1>Data for contract: {contractId}</h1>
          {/* <h2>Expires: {location.myCustomProps.date_expires}</h2> */}
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
            {/* <Line
              type='monotone'
              dataKey='pv'
              stroke='#8884d8'
              activeDot={{ r: 8 }}
            /> */}
            <Line type='monotone' dataKey='midpoint' stroke='#82ca9d' />
          </LineChart>{' '}
        </div>
      )}
    </div>
  );
};

export default ContractView;
