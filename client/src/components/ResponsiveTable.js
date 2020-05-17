import React from 'react';
import moment from 'moment';

import './ResponsiveTable.scss';

const ResponsiveTable = ({ data }) => {
  const expire = data.map((el) => el.date_expires);
  const expireDates = [...new Set(expire)];

  return (
    <div className='table-wrapper'>
      <table className='fl-table table-container'>
        <thead>
          <tr className={'table-top-header'}>
            <th className={'blue-bg sticky-th'} colSpan={'3'}>
              Call Options
            </th>
            <th></th>
            <th className={'green-bg sticky-th'} colSpan={'3'}>
              Put Options
            </th>
          </tr>
          <tr>
            <th className={'blue-bg sticky-th'}>OI</th>
            <th className={'blue-bg sticky-th'}>Bid</th>
            <th className={'blue-bg sticky-th'}>Ask</th>
            <th className={'purple-bg sticky-th'}>Strike</th>
            <th className={'green-bg sticky-th'}>Bid</th>
            <th className={'green-bg sticky-th'}>Ask</th>
            <th className={'green-bg sticky-th'}>OI</th>
          </tr>
        </thead>
        <tbody>
          {expireDates.map((date) => (
            <>
              <tr className={'title-row'}>
                <th className={'meta-date'} colSpan={'7'}>
                  {moment(date).format('DD-MM-YYYY')}
                </th>
              </tr>
              {data.map((option) => {
                if (option.put && option.date_expires === date) {
                  const {
                    call,
                    put,
                    strike_price,
                    putClass,
                    callClass,
                  } = option;
                  return (
                    <tr
                      key={`${call.id}_${put.id}`}
                      className={`${putClass} ${callClass}`}
                    >
                      <td className={'call-option'}>{call.open_interest}</td>
                      <td className={'call-option'}>{call.bid}</td>
                      <td className={'call-option'}>{call.ask}</td>
                      <td className={'meta-bold light-gray-bg'}>
                        {strike_price}
                      </td>
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
