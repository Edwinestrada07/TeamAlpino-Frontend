import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'

const News = () => {
    const handleClick = () => {
        window.location.href = 'https://www.marca.com/futbol/futbol-internacional.html' // URL de la página de noticias deportivas
    }

    const handleClick2 = () => {
        window.location.href = 'https://rojadirectaenhd.net/' // URL de la página deportivas
    }

    return (
        <div className="mt-4">
            <h1 className="text-3xl font-bold text-center text-white m-6">
                <FontAwesomeIcon icon={faNewspaper} className="mr-2" /> Enlaces de Interes
            </h1>

            <section 
                className="text-gray-400 bg-gray-900 body-font rounded-lg shadow-lg" 
                style={{ backgroundImage: 'url(img/banner_copa.jpg)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '400px' }}
            >
                <div className="container px-3 py-20 mx-auto bg-gray-900 bg-opacity-50 rounded-lg h-full flex items-center">
                    <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
                        <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-white">
                            El siguiente link te va redirigir a las noticias de deportes
                        </h1>
                        <button 
                            onClick={handleClick} 
                            className="bg-blue-500 text-white p-3 m-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                        >
                            Click AQUÍ para Noticias de Deportes
                        </button>
                    </div>
                </div>
            </section>

            <section 
                className="text-gray-400 bg-gray-900 body-font rounded-lg shadow-lg" 
                style={{ backgroundImage: 'url(img/Banner-futbol.jpg)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '400px' }}
            >
                <div className="container px-3 py-20 mx-auto bg-gray-900 bg-opacity-50 rounded-lg h-full flex items-center">
                    <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
                        <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-white">
                            El siguiente link te va redirigir a Roja Directa para los partidos del día
                        </h1>
                        <button 
                            onClick={handleClick2} 
                            className="bg-blue-500 text-white p-3 m-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                        >
                            Click AQUÍ para ingresar a Roja Directa
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default News
