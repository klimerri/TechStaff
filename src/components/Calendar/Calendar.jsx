import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';
import * as dates from 'date-arithmetic'
import { Calendar, momentLocalizer, Views, Navigate, DateLocalizer } from 'react-big-calendar'
import TimeGrid from 'react-big-calendar/lib/TimeGrid';

function MyWeek({
    date,
    localizer,
    max = localizer.endOf(new Date(), 'day'),
    min = localizer.startOf(new Date(), 'day'),
    scrollToTime = localizer.startOf(new Date(), 'day'),
    ...props
}) {
    const currRange = useMemo(
        () => MyWeek.range(date, { localizer }),
        [date, localizer]
    )

    return (
        <TimeGrid
            date={date}
            eventOffset={15}
            localizer={localizer}
            max={max}
            min={min}
            range={currRange}
            scrollToTime={scrollToTime}
            {...props}
        />
    )
}

MyWeek.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    localizer: PropTypes.object,
    max: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date),
    scrollToTime: PropTypes.instanceOf(Date),
}

MyWeek.range = (date, { localizer }) => {
    const startOfWeek = localizer.startOf(date, 'week') // понедельник
    const endOfWorkWeek = localizer.add(startOfWeek, 4, 'day') // пятница

    let current = startOfWeek
    const range = []

    while (localizer.lte(current, endOfWorkWeek, 'day')) {
        range.push(current)
        current = localizer.add(current, 1, 'day')
    }

    return range
}

MyWeek.date = (date, { localizer }) => {
    // возвращаем начало недели (понедельник)
    return localizer.startOf(date, 'week')
}

MyWeek.navigate = (date, action, { localizer }) => {
    switch (action) {
        case Navigate.PREVIOUS:
            return localizer.add(date, -1, 'week')
        case Navigate.NEXT:
            return localizer.add(date, 1, 'week')
        default:
            return date
    }
}

MyWeek.title = (date) => {
    return `${date.toLocaleDateString()}`
}

export default function EngineerCalendar({ events }) {
    useEffect(() => {
        console.log(events);
    }, [events]);

    const [date, setDate] = useState(new Date())

    moment.updateLocale('en', {
        week: { dow: 1 },
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
        },
    });
    
    
    const localizer = momentLocalizer(moment);
    
    const views = useMemo(
        () => ({
            month: true,
            week: MyWeek,
        }),
        []
    )


    return (
        <div className="height600">
            <Calendar
                date={date}
                onNavigate={(newDate) => setDate(newDate)}
                view={Views.WEEK}
                onView={() => {}}
                events={events}
                localizer={localizer}
                views={views}
                components={{
                    event: EngineerEvent,
                }}
            />
        </div>
    )
}
EngineerCalendar.propTypes = {
    localizer: PropTypes.instanceOf(DateLocalizer),
}

const EngineerEvent = ({ event }) => (
    <>
        <span>{event.name} </span> <br />
        {/* <span>{event.engineer.user.name}</span> <br />   */}
        {/* <span>{event.start_time.toLocaleString()}</span> <br /> */}
        {/* <span>{event.completion_time.toLocaleString()}</span> */}
    </>
);