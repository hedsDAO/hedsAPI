import DatePicker from 'react-datepicker';
import { Flex, Text } from '@chakra-ui/react';
import './calendarStyles.css';
import 'react-datepicker/dist/react-datepicker.css';

interface OwnProps {
  startDate: Date;
  endDate: Date;
  changeStart: (date: Date) => void;
  changeEnd: (date: Date) => void;
  minDate: Date;
}

export const DateTimeRangePicker = ({ startDate, endDate, changeStart, changeEnd, minDate }: OwnProps) => {
  const filterTime = (time: Date, startTime: Date) => {
    const selectedDate = new Date(time);
    if (startTime) {
      return startTime.getTime() <= selectedDate.getTime();
    }
    return true;
  };

  return (
    <Flex justifyContent="space-between">
      <DatePicker
        showTimeSelect
        selected={startDate}
        onChange={(date) => changeStart(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}
        filterTime={(time) => filterTime(time, minDate)}
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      <Text color="white">-</Text>
      <DatePicker
        showTimeSelect
        selected={endDate}
        onChange={(date) => changeEnd(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        filterTime={(time) => filterTime(time, startDate)}
        dateFormat="MMMM d, yyyy h:mm aa"
      />
    </Flex>
  );
};
