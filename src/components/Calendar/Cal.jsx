import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Fragment, useMemo, useState, useCallback } from 'react'
import { Calendar, DateLocalizer, momentLocalizer, Views } from 'react-big-calendar'
import { EngineerEvent, messages } from './Calendar'
import { NavLink } from 'react-router-dom'

const resources = [
    { resourceId: 1, resourceTitle: 'Board room' },
    { resourceId: 2, resourceTitle: 'Training room' },
    { resourceId: 3, resourceTitle: 'Meeting room 1' },
    { resourceId: 4, resourceTitle: 'Meeting room 2' },
]

moment.locale('ru')
moment.updateLocale('ru', {
    week: { dow: 1 },
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
    },
});
const localizer = momentLocalizer(moment);

export default function Resource({ events }) {    
    const { defaultDate, views } = useMemo(
        () => ({
            defaultDate: new Date(2018, 0, 29),
            views: ['day'],
        }),
        []
    )

    const [date, setDate] = useState(new Date())
    const resources = useMemo(() => {
        const map = new Map();

        events.forEach((event) => {
            if (!event.engineer) return;

            const engineer = event.engineer;
            const user = engineer.user;
            const id = engineer.id;

            if (!map.has(id)) {
                map.set(id, {
                    resourceId: id,
                    resourceTitle: `${user.lastname} ${user.name} ${user.surname}`,
                });
            }
        });

        return Array.from(map.values());
    }, [events]);

    const mappedEvents = useMemo(() => {
        return events.map((event) => ({
            ...event,
            resourceId: event.engineer?.id, // ключевое
            title: event.name, // важно для отображения
            start: new Date(event.start),
            end: new Date(event.end),
        }))
    }, [events])
    
    return (
        <Fragment>
            <div className="height600">
                <Calendar
                    selectable
                    culture='ru'
                    messages={messages}
                    date={date}
                    onNavigate={(newDate) => setDate(newDate)}
                    defaultView={Views.DAY}
                    events={mappedEvents}
                    localizer={localizer}
                    resources={resources}
                    resourceIdAccessor="resourceId"
                    resourceTitleAccessor="resourceTitle"
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
            </div>
        </Fragment>
    )
}
Resource.propTypes = {
    localizer: PropTypes.instanceOf(DateLocalizer),
}