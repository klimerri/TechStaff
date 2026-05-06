import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';
import * as dates from 'date-arithmetic'
import { Calendar, momentLocalizer, Views, Navigate, DateLocalizer } from 'react-big-calendar'
import TimeGrid from 'react-big-calendar/lib/TimeGrid';
import { NavLink } from 'react-router-dom';
import 'moment/locale/ru'

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

export const messages = {
    today: 'Сегодня',
    previous: 'Назад',
    next: 'Вперёд',
    month: 'Месяц',
    week: 'Неделя',
    work_week: 'Рабочая неделя',
    day: 'День',
    agenda: 'Повестка',
    date: 'Дата',
    time: 'Время',
    event: 'Событие',
    noEventsInRange: 'Нет событий',
}

moment.locale('ru')
moment.updateLocale('ru', {
    week: { dow: 1 },
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
    },
});
const localizer = momentLocalizer(moment);
    
export default function EngineerCalendar({ events }) {
    const [date, setDate] = useState(new Date())
    
    const views = useMemo(
        () => ({
            week: MyWeek,
        }),
        []
    )

    return (
        <Calendar
            culture='ru'
            messages={messages}
            date={date}
            onNavigate={(newDate) => setDate(newDate)}
            view={Views.WEEK}
            onView={() => {}}
            events={events}
            localizer={localizer}
            views={views}
            components={{
                event: EngineerEvent,
                eventWrapper: ({ children, event }) => (
                    <NavLink
                        to={`/ticket/${event.id}`}
                        style={{
                            display: 'block',
                            textDecoration: 'none',
                            color: 'inherit',
                            height: '100%',
                            width: '100%',
                        }}
                    >
                        {children}
                    </NavLink>
                )
            }}
            eventPropGetter={(event) => {
                let backgroundColor = '#3174ad';
                let textDecoration = 'none';

                switch (event.status) {
                    case 'process':
                        backgroundColor = '#3498db';
                        break;

                    case 'done':
                        backgroundColor = '#27ae60';
                        textDecoration = 'line-through';
                        break

                    case 'cancelled':
                        backgroundColor = '#e74c3c';
                        textDecoration = 'line-through';
                        break;

                    default:
                        backgroundColor = '#7f8c8d';
                }

                return {
                    style: {
                        backgroundColor,
                        textDecoration,
                        borderRadius: '6px',
                        border: 'none',
                        color: '#fff',
                        padding: '2px 4px',
                    },
                }
            }}
        />
    )
}
EngineerCalendar.propTypes = {
    localizer: PropTypes.instanceOf(DateLocalizer),
}

export const EngineerEvent = ({ event }) => (
    <span>
        {event.name} <br />
        {event.status === 'cancelled' && '(Отменена)'}
        {event.status === 'done' && '(Завершена)'}
    </span> 
);