import React from 'react';
import './ResponsiveTable.scss';

const ResponsiveTable = ({ data }) => {
  const expire = data.map((el) => el.date_expires);
  const expireDates = [...new Set(expire)];
  console.log(expireDates, 'fil');

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
          {expireDates.map((date) => (
            <>
              <tr className={'title-row'}>
                <th>{date}</th>
              </tr>
              {data.map((option) => {
                console.log(option.date_expires, 'OPTIONN');
                console.log(date, 'DATE');
                if (option.put && option.date_expires === date) {
                  const { call, data_expires, put, strike_price } = option;
                  console.log('SUCC');
                  return (
                    <tr
                      key={`${call.id}_${put.id}`}
                      className={option.classCSS}
                    >
                      <td className={'call-option'}>{call.open_interest}</td>
                      <td className={'call-option'}>{call.bid}</td>
                      <td className={'call-option'}>{call.ask}</td>
                      <td>{strike_price}</td>
                      <td className={'put-option'}>{put.bid}</td>
                      <td className={'put-option'}>{put.ask}</td>
                      <td className={'put-option'}>{put.open_interest}</td>
                    </tr>
                  );
                }
              })}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResponsiveTable;
