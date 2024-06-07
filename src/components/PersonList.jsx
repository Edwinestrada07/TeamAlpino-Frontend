const PersonList = ({ persons }) => {

    return (
        <ul>
            {persons.map((persons) => (
                <li key={persons.id} className="border p-2 mb-2">{person.name}</li>
            ))}
        </ul>
    )
}

export default PersonList