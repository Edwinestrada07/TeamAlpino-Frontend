const Groups = ({ groups }) => {
    return (
        <div className="flex justify-between">
            <div>
                <h2>Equipo 1</h2>
                <ul>
                    {groups.group1.map((person) => (
                        <li key={person.id} className="border p-2 mb-2">{person.name}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Equipo 2</h2>
                <ul>
                    {groups.group2.map((person) => (
                        <li key={person.id} className="border p-2 mb-2">{person.name}</li>        
                    ))}
                </ul>        
            </div>
        </div>
    )
}

export default Groups
