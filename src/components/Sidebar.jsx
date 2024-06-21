import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faTshirt, faNewspaper, faCreditCard, faFutbol } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleMouseEnter = () => {
        setIsOpen(true)
    }

    const handleMouseLeave = () => {
        setIsOpen(false)
    }

    return (
        <div 
            className={`fixed h-screen transition-width duration-300 ${isOpen ? 'w-64' : 'w-16'}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={`bg-gray-600 text-white h-full ${isOpen ? 'w-64' : 'w-16'}`}>
                <div className="p-4">
                    <FontAwesomeIcon icon={faFutbol} className="mr-2" />
                    <h1 className={`text-xl font-bold ${isOpen ? 'block' : 'hidden'}`}>Team Lpino</h1>
                </div>
                <nav className="mt-2">
                    <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white flex items-center">
                        <FontAwesomeIcon icon={faHome} className="mr-4" />
                        {isOpen && <span>Inicio</span>}
                    </Link>
                    <Link to="/uniforms" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white flex items-center">
                        <FontAwesomeIcon icon={faTshirt} className="mr-4" />
                        {isOpen && <span>Uniformes</span>}
                    </Link>
                    <Link to="/news" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white flex items-center">
                        <FontAwesomeIcon icon={faNewspaper} className="mr-4" />
                        {isOpen && <span>Noticias</span>}
                    </Link>
                    <Link to="/payments" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white flex items-center">
                        <FontAwesomeIcon icon={faCreditCard} className="mr-4" />
                        {isOpen && <span>Medios de Pago</span>}
                    </Link>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar



