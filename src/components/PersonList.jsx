const PersonList = ({ persons }) => {
    return (
        <ul className="mb-4">
            {persons.map((person) => (
                <li key={`${person.name}-${person.cell_number}`} className="border p-2 mb-2">
                    {person.name} - {person.cell_number}
                </li>
            ))}
        </ul>
    )
}

export default PersonList



