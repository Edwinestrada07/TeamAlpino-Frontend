import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFutbol,faHome,faUser,faTshirt,faChartSimple,faNewspaper,faCreditCard,} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, handleMouseEnter, handleMouseLeave }) => {
    const menuItems = [
        { path: "/", label: "Inicio", icon: faHome },
        { path: "/userprofile", label: "Perfil Jugador", icon: faUser },
        { path: "/uniforms", label: "Uniformes", icon: faTshirt },
        { path: "/statistics", label: "Estadística Juego", icon: faChartSimple },
        { path: "/news", label: "Noticias", icon: faNewspaper },
        { path: "/paymentsmethods", label: "Medios de Pago", icon: faCreditCard },
    ];

    return (
        <aside
            className={`fixed pl-2 h-screen bg-gray-800 text-white z-50 flex flex-col transition-all duration-300 ease-in-out shadow-lg ${
                    isOpen ? "w-64" : "w-16"
                }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                aria-label="Barra lateral de navegación"
            >
            {/* Logo / Encabezado */}
            <div className="flex items-center justify-center p-4 border-b border-gray-700">
                <FontAwesomeIcon
                    icon={faFutbol}
                    className="text-2xl text-green-400 transition-transform duration-300 hover:rotate-12"
                />
                {isOpen && (
                <span className="ml-3 text-lg font-semibold tracking-wide">
                    Liga App
                </span>
                )}
            </div>

            {/* Navegación */}
            <nav className="flex flex-col mt-4 space-y-1">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-700 hover:text-green-400 group"
                    >
                        <FontAwesomeIcon
                        icon={item.icon}
                        className="text-lg min-w-[20px] mr-3 transition-transform duration-300 group-hover:scale-110"
                        />
                        {isOpen && <span className="text-sm font-medium">{item.label}</span>}
                    </Link>
                ))}
            </nav>

            {/* Pie del Sidebar (opcional) */}
            <div className="mt-auto p-4 text-center text-gray-100 text-xs border-t border-gray-700">
                {isOpen && <span>© 2025 Liga App</span>}
            </div>
        </aside>
    )
}

export default Sidebar




