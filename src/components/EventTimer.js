import React, { useState, useEffect } from 'react';

export default function EventTimer({ events }) {
  const [DayTime, setDay] = useState('00');
  const [Hrs, setHrs] = useState('00');
  const [Min, setMin] = useState('00');
  const [Sec, setSec] = useState('00');

  let interval = React.useRef();
  const countDown = () => {
    interval = setInterval(() => {
      const now = new Date().getTime();
      const event = new Date(events).getTime();

      const daysSeconds = event - now;

      let sec = Math.floor(daysSeconds / 1000);
      let min = Math.floor(sec / 60);
      let hrs = Math.floor(min / 60);
      let days = Math.floor(hrs / 24);

      sec %= 60;
      min %= 60;
      hrs %= 24;

      sec = sec < 10 ? '0' + sec : sec;
      min = min < 10 ? '0' + min : min;
      hrs = hrs < 10 ? '0' + hrs : hrs;

      if (daysSeconds < 0) {
        clearInterval(interval);
      } else {
        setDay(days);
        setHrs(hrs);
        setMin(min);
        setSec(sec);
      }
    }, 1000);
  };

  useEffect(() => {
    // const abortController = new AbortController();
    // const signal = abortController.signal;
    countDown();
    return () => {
      clearInterval(interval);
      // abortController.abort();
    };
  });

  return (
    <div>
      <div className='timer'>
        {Sec > 0 ? (
          <>
            <div
              style={{ color: 'white', background: 'green', padding: '1em' }}
            >
              <span> Time Left:</span>
              <span>{DayTime}Days</span> :<span>{Hrs}Hours</span> :
              <span>{Min}Mins</span> :<span>{Sec}Secs</span>
            </div>
          </>
        ) : (
          <div style={{ color: 'white', background: 'red', padding: '1em ' }}>
            Date Expires
          </div>
        )}
      </div>
    </div>
  );
}
