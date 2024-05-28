import React from 'react'
import { useLocation } from 'react-router-dom'

const Events = () => {
    const location = useLocation()
    const events = location.state

    console.log(events)

    events.map((event) => {
        console.log(event.title)
    })
    return (
        <div className='eventsCard'>
            {events.map((event) => {
                return (
                    <div className='card'>
                        <div className='details'>
                            <h4 className='event-title'>{event.title}</h4>
                            <h5 className='event-desc'>{event.duration} mins</h5>
                        </div>
                        <div className='buttons'>
                            <button className='copy'>Copy link</button>
                            <button className='share'>Share</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Events
