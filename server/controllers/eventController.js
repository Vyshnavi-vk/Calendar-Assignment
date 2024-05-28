const Event = require('../models/eventData');

const createEvent = async (req, res) => {
    try {
        const { title, description, participants, date, time, duration, sessionNotes } = req.body;
        const newEvent = await Event.create({
            title,
            description,
            participants,
            date,
            time,
            duration,
            sessionNotes
        });

        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, participants, date, time, duration, sessionNotes } = req.body;
        const event = await Event.findByIdAndUpdate(id,
            { title, description, participants, date, time, duration, sessionNotes },
            { new: true }
        );
        res.status(200).json(event);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        await Event.findByIdAndDelete(id);
        res.json({ message: "Event deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getEvents = async (req, res) => {
    try {
        const allEvents = await Event.find({})
        res.status(200).json({ events: allEvents })
    } catch (error) {
        res.status(500).json("Internal server error")
    }
};


module.exports = { createEvent, updateEvent, deleteEvent, getEvents };
