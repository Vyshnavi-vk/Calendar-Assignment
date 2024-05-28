import axios from 'axios';
import React, { useState } from 'react'

const SelectedEvent = (
    { id, date, title: initialTitle, description: initialDescription,
        participants: initialParticipants, time: initialTime,
        duration: initialDuration, sessionNotes: initialSessionNotes,
        onClose, setSelectedEvent, events, setEvents }) => {

    const [title, setTitle] = useState(initialTitle || '')
    const [description, setDescription] = useState(initialDescription || '')
    const [participants, setParticipants] = useState(initialParticipants ? initialParticipants.join(', ') : '');
    const [time, setTime] = useState(initialTime || '')
    const [duration, setDuration] = useState(initialDuration || '')
    const [sessionNotes, setSessionNotes] = useState(initialSessionNotes || '')





    const getAllEvents = async () => {
        const { data } = await axios.get('http://localhost:5000/api/events')
        setEvents(data.events)
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/events/${id}`)
            setSelectedEvent(null)
            getAllEvents()
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/api/events/${id}`, {
                title,
                description,
                participants: participants.split(','),
                date,
                time,
                duration,
                sessionNotes
            })

            setSelectedEvent(null)
            getAllEvents()
            console.log('events after updating', events)

        } catch (error) {
            console.error(error)
        }
    }



    return (
        <div className='form'>
            <form
            >
                <input
                    type='text'
                    required
                    placeholder='Enter title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    required
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <input
                    type="text"
                    required
                    placeholder='Enter participants'
                    value={participants}
                    onChange={(e) => setParticipants(e.target.value)}
                />
                <input
                    required
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <input
                    required
                    placeholder='Duration'
                    type='number'
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
                <textarea
                    required
                    placeholder='session notes'
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                ></textarea>

                <button type="button"
                    className='submit'
                    onClick={handleUpdate}
                >
                    Update Event
                </button>

                <button type="button"
                    className='delete'
                    onClick={handleDelete}
                >
                    Delete Event
                </button>

                <button type="button"
                    onClick={onClose}
                    className='cancel'
                >Cancel</button>
            </form>
        </div>
    )
}

export default SelectedEvent
