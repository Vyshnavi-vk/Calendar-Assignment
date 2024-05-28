import React, { useEffect, useState } from 'react'
import FullCalender from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import FormData from './FormData'
import axios from 'axios'
import SelectedEvent from './SelectedEvent'
import { useNavigate } from 'react-router-dom'


const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState('')
    const [events, setEvents] = useState([])
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [showForm, setShowForm] = useState(false)

    const navigate = useNavigate()

    const getAllEvents = async () => {
        const { data } = await axios.get('http://localhost:5000/api/events')
        console.log('events before updating', events)
        setEvents(data.events)
    }

    useEffect(() => {
        getAllEvents()
    }, [])


    const handleDateClick = (dateInfo) => {
        setShowForm(true)
        setSelectedDate(dateInfo.dateStr)
    }

    const handleEventClick = (eventInfo) => {
        setSelectedEvent(eventInfo.event)
    }


    const handleEventSubmit = async (eventData) => {
        await axios.post('http://localhost:5000/api/events/create', eventData)

        const startDateTime = new Date(`${eventData.date}T${eventData.time}:00`);
        const googleEvent = {
            summary: eventData.title,
            description: eventData.description,
            start: startDateTime,
            end: new Date(startDateTime.getTime() + eventData.duration * 60000),
            attendees: eventData.participants.map(email => ({ email })),
        }
        // console.log(new Date(startDateTime.getTime() + eventData.duration * 60000))
        await axios.post('http://localhost:5000/api/google/create-event', googleEvent);
        setShowForm(false)
        getAllEvents()
    }

    const eventDidMount = (info) => {
        info.el.style.backgroundColor = 'rgb(0, 106, 255)';
        info.el.style.color = 'white';
    };

    return (

        <div className='calendar'>
            <FullCalender
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                events={events.map(event => ({
                    id: event._id,
                    title: event.title,
                    start: event.date,
                    extendedProps: {
                        description: event.description,
                        participants: event.participants,
                        time: event.time,
                        duration: event.duration,
                        sessionNotes: event.sessionNotes,
                    },
                }))}
                height={'90vh'}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                eventDidMount={eventDidMount}
            />
            {showForm && (
                <FormData
                    date={selectedDate}
                    onClose={() => setShowForm(false)}
                    onSubmit={handleEventSubmit}
                />
            )}
            {selectedEvent && (
                <SelectedEvent
                    id={selectedEvent.id}
                    date={selectedEvent.start}
                    title={selectedEvent.title}
                    description={selectedEvent.extendedProps.description}
                    participants={selectedEvent.extendedProps.participants}
                    time={selectedEvent.extendedProps.time}
                    duration={selectedEvent.extendedProps.duration}
                    sessionNotes={selectedEvent.extendedProps.sessionNotes}
                    onClose={() => setSelectedEvent(null)}
                    setSelectedEvent={setSelectedEvent}
                    events={events}
                    setEvents={setEvents}
                />
            )}
            <button className='allEvents' onClick={() => { navigate('/events', { state: events }) }}>See All Events</button>
        </div>

    )
}

export default Calendar
