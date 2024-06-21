import { useState } from 'react'

const Reminders = () => {
    const [reminders, setReminders] = useState([])
    const [reminder, setReminder] = useState('')

    const addReminder = () => {
        if (reminder) {
        setReminders([...reminders, reminder])
        setReminder('')
        }
    }

    return (
        <div className="mt-4">
            <h2>Recordatorios</h2>
            <input
                type="text"
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
                placeholder="Enter reminder"
                className="border p-2 mr-2"
            />
            <button onClick={addReminder} className="bg-yellow-500 text-white p-2 rounded">
                Agregar Recordatorio
            </button>
            <ul className="mt-2">
                {reminders.map((rem, index) => (
                <li key={index} className="border p-2 mb-2">{rem}</li>
                ))}
            </ul>
        </div>
    )
}

export default Reminders
