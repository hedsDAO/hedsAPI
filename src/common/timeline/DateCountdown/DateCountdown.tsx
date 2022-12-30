import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';

interface CountdownProps {
  deadline: number;
  setIsMintOpen?: Function;
}

const DateCountdown = ({ deadline, setIsMintOpen }: CountdownProps) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [done, setDone] = useState(false);

  const getTimeUntil = (deadline: number) => {
    const currentTime = new Date();
    const time = deadline - Date.parse(String(currentTime));
    if (time < 0) {
      setSeconds(0);
      setMinutes(0);
      setHours(0);
      setDays(0);
      setDone(true);
      if (setIsMintOpen) setIsMintOpen(true);
    } else {
      setSeconds(Math.floor((time / 1000) % 60));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    }
  };

  useEffect(() => {
    //    if (done) dispatch.spaceModel.updateTapeStatus()
  }, [done]);

  useEffect(() => {
    if (hours + days + minutes + seconds === 0) getTimeUntil(deadline);
    const intervalTimer = setInterval(() => getTimeUntil(deadline), 1000);
    if (!done) intervalTimer;
    return () => {
      clearInterval(intervalTimer);
    };
  }, [deadline]);

  const leading0 = (num: number) => {
    return num < 10 ? '0' + num : num;
  };

  return (
    <Transition
      show={seconds + minutes + hours + days > 0}
      enter="transform transition ease-in-out duration-500 sm:duration-700"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transform transition ease-in-out duration-500 sm:duration-700"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {done ? (
        <div className="countdown-box flex gap-1">
          <div className="flex mr-0.5">
            <div className="text-neutral-700 dark:text-neutral-200 mr-0.5 lg:text-xs text-sm">{days}</div>
            <h5 className="text-neutral-500 dark:text-neutral-400 lg:text-xs text-sm">D</h5>
          </div>
          <div className="flex mr-0.5">
            <div className="text-neutral-700 dark:text-neutral-200 mr-0.5 lg:text-xs text-sm">{hours}</div>
            <h5 className="text-neutral-500 dark:text-neutral-400 lg:text-xs text-sm">H</h5>
          </div>
          <div className="flex mr-0.5">
            <div className="text-neutral-700 dark:text-neutral-200 mr-0.5 lg:text-xs text-sm">{minutes}</div>
            <h5 className="text-neutral-500 dark:text-neutral-400 lg:text-xs text-sm">M</h5>
          </div>
          <div className="flex mr-0.5">
            <div className="text-neutral-700 dark:text-neutral-200 mr-0.5 lg:text-xs text-sm">{seconds}</div>
            <h5 className="text-neutral-500 dark:text-neutral-400 lg:text-xs text-sm">S</h5>
          </div>
        </div>
      ) : (
        <div className="countdown-box flex gap-1">
          <div className="flex mr-0.5">
            <div className="text-neutral-700 dark:text-neutral-200 mr-0.5 lg:text-xs text-sm">{leading0(days)}</div>
            <h5 className="text-neutral-500 dark:text-neutral-400 lg:text-xs text-sm">D</h5>
          </div>
          <div className="flex mr-0.5">
            <div className="text-neutral-700 dark:text-neutral-200 mr-0.5 lg:text-xs text-sm">{leading0(hours)}</div>
            <h5 className="text-neutral-500 dark:text-neutral-400 lg:text-xs text-sm">H</h5>
          </div>
          <div className="flex mr-0.5">
            <div className="text-neutral-700 dark:text-neutral-200 mr-0.5 lg:text-xs text-sm">{leading0(minutes)}</div>
            <h5 className="text-neutral-500 dark:text-neutral-400 lg:text-xs text-sm">M</h5>
          </div>
          <div className="flex mr-0.5">
            <div className="text-neutral-700 dark:text-neutral-200 mr-0.5 lg:text-xs text-sm">{leading0(seconds)}</div>
            <h5 className="text-neutral-500 dark:text-neutral-400 lg:text-xs text-sm">S</h5>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default DateCountdown;
