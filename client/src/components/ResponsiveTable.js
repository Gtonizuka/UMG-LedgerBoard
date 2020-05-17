import React from 'react';
import './ResponsiveTable.scss';
import { v4 as uuidv4 } from 'uuid';

const ResponsiveTable = ({ data }) => {
  console.log(data);
  return (
    <div className='table-wrapper'>
      <table className='fl-table'>
        <thead>
          <tr>
            <th className={'blue-bg'}>OI</th>
            <th className={'blue-bg'}>Bid</th>
            <th className={'blue-bg'}>Ask</th>
            <th className={'purple-bg'}>Strike</th>
            <th className={'green-bg'}>Bid</th>
            <th className={'green-bg'}>Ask</th>
            <th className={'green-bg'}>OI</th>
          </tr>
        </thead>
        <tbody>
          {data.map((option) => {
            if (option) {
              console.log(option, 'optionnn');
              const { call, data_expires, put, strike_price } = option;
              return (
                <tr key={uuidv4()}>
                  <td>{call.open_interest}</td>
                  <td>{call.bid}</td>
                  <td>{call.ask}</td>
                  <td>{strike_price}</td>
                  <td>{put.bid}</td>
                  <td>{put.ask}</td>
                  <td>{put.open_interest}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ResponsiveTable;
