import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand, faUser } from '@fortawesome/free-solid-svg-icons';

const Groups = ({ groups }) => {
    return (
        <div className="flex justify-between">
            <div className="mb-4">
                <h2 className="text-lg font-bold">Equipo 1</h2>
                <ul>
                    {groups.group1.map((person) => (
                        <li key={person.id} className="flex items-center">
                            {person.is_archer && <FontAwesomeIcon icon={faHand}  className="mr-2 text-blue-500" />}
                            <span>{person.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2 className="text-lg font-bold">Equipo 2</h2>
                <ul>
                    {groups.group2.map(person => (
                        <li key={person.id} className="flex items-center">
                            {person.is_archer && <FontAwesomeIcon icon={faHand} className="mr-2 text-blue-500" />}
                            <span>{person.name}</span>
                        </li>
                    ))}
                </ul>        
            </div>
        </div>
    )
}

export default Groups
