import React, { useState } from 'react'

const FormData = ({ date, onClose, onSubmit }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [participants, setParticipants] = useState([])
    const [time, setTime] = useState('')
    const [duration, setDuration] = useState('')
    const [sessionNotes, setSessionNotes] = useState('')


    const handleFormSubmit = (e) => {
        e.preventDefault()
        console.log(title,
            description,
            participants.split(','),
            date,
            time,
            duration,
            sessionNotes)
        onSubmit({
            title,
            description,
            participants: participants.split(','),
            date,
            time,
            duration,
            sessionNotes
        })
    }


    return (
        <div className='form'>
            <form onSubmit={handleFormSubmit}>
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

                <button type="submit"
                    className='submit'
                >
                    Create Event
                </button>
                <button type="button"
                    onClick={onClose}
                    className='cancel'
                >Cancel</button>
            </form>
        </div>
    )
}

export default FormData
