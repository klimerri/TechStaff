import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const events = [{ title: 'Событие', start: new Date(), end: new Date(Date.now() + 3600000), engineer: "Василий, старший инженер" }];

const EngineerEvent = ({ event }) => (
    <>
        <span>{event.title} </span>
        <span>({event.engineer})</span>
    </>
  
);

export const MyCalendar = () => {
  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        components={{
            event: EngineerEvent,
        }}
      />
    </div>
  );
}
