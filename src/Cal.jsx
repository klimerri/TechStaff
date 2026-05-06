import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Fragment, useMemo, useState, useCallback } from 'react'
import { Calendar, DateLocalizer, momentLocalizer, Views } from 'react-big-calendar'

const resources = [
    { resourceId: 1, resourceTitle: 'Board room' },
    { resourceId: 2, resourceTitle: 'Training room' },
    { resourceId: 3, resourceTitle: 'Meeting room 1' },
    { resourceId: 4, resourceTitle: 'Meeting room 2' },
]

let eventId = 0
const events = Array.from({ length: 20 }, (_, k) => k).flatMap((i) => {
    const currentResource = resources[i % resources.length]
    const dayDiff = i % 7

    return Array.from({ length: 5 }, (_, j) => ({
        id: eventId++,
        title: `Event ${i + j} _ ${currentResource.resourceTitle}`,
        start: new Date(2018, 0, 29 + dayDiff, 9 + (j % 4), 0, 0),
        end: new Date(2018, 0, 29 + dayDiff, 11 + (j % 4), 0, 0),
        resourceId: currentResource.resourceId,
    }))
})

export default function Resource() {
    moment.updateLocale('en', {
        week: { dow: 1 },
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
        },
    });
    const localizer = momentLocalizer(moment);

    const { defaultDate, views } = useMemo(
        () => ({
            defaultDate: new Date(2018, 0, 29),
            views: ['day', 'work_week'],
        }),
        []
    )

    const [myEvents, setEvents] = useState(events)

    const handleSelectSlot = useCallback(
        ({ start, end, resourceId }) => {
            const title = window.prompt('New Event Name')
            if (title) {
                setEvents((prev) => [...prev, { start, end, title, resourceId }])
            }
        },
        [setEvents]
    )

    const handleSelectEvent = useCallback(
        (event) => window.alert(event.title),
        []
    )
    const moveEvent = useCallback(
        ({
            event,
            start,
            end,
            resourceId,
            isAllDay: droppedOnAllDaySlot = false,
        }) => {
            const { allDay } = event
            if (!allDay && droppedOnAllDaySlot) {
                event.allDay = true
            }

            setEvents((prev) => {
                const existing = prev.find((ev) => ev.id === event.id) ?? {}
                const filtered = prev.filter((ev) => ev.id !== event.id)
                return [...filtered, { ...existing, start, end, resourceId, allDay }]
            })
        },
        [setEvents]
    )

    const resizeEvent = useCallback(
        ({ event, start, end }) => {
            setEvents((prev) => {
                const existing = prev.find((ev) => ev.id === event.id) ?? {}
                const filtered = prev.filter((ev) => ev.id !== event.id)
                return [...filtered, { ...existing, start, end }]
            })
        },
        [setEvents]
    )

    return (
        <Fragment>
            <div className="height600">
                <Calendar
                    selectable
                    defaultDate={defaultDate}
                    defaultView={Views.DAY}
                    events={myEvents}
                    localizer={localizer}
                    resources={resources}
                    resourceIdAccessor="resourceId"
                    resourceTitleAccessor="resourceTitle"
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    onEventDrop={moveEvent}
                    onEventResize={resizeEvent}
                    step={60}
                    views={views}
                />
            </div>
        </Fragment>
    )
}
Resource.propTypes = {
    localizer: PropTypes.instanceOf(DateLocalizer),
}