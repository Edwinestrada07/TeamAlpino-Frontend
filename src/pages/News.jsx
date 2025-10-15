import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'

const News = () => {
    const links = [
        {
            id: 1,
            title: 'El siguiente link te va a redirigir a las noticias de deportes',
            button: 'Ir a Marca',
            url: 'https://www.marca.com/futbol/futbol-internacional.html',
            image: 'img/banner_copa.jpg',
        },
        {
            id: 2,
            title: 'El siguiente link te va a redirigir a Roja Directa para los partidos del día',
            button: 'Ir a Roja Directa',
            url: 'https://rojadirectaenhd.net/',
            image: 'img/Banner-futbol.jpg',
        },
    ]

    return (
        <section className="flex-1 flex flex-col justify-center items-center min-h-screen bg-gray-900 p-6">
            {/* Encabezado */}
            <h1 className="text-3xl font-bold text-center text-white mb-10 flex items-center gap-3">
                <FontAwesomeIcon icon={faNewspaper} className="text-green-400 text-3xl" />
                Enlaces de Interés
            </h1>

            {/* Tarjetas */}
            <div className="flex flex-col gap-8 w-full max-w-5xl">
                {links.map((link) => (
                <div
                    key={link.id}
                    className="relative rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-[1.02] hover:shadow-green-400/20 cursor-pointer"
                    style={{
                        backgroundImage: `url(${link.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        height: '220px',
                    }}
                >
                    {/* Overlay semitransparente */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
                        <div className="px-6 text-center max-w-2xl">
                            <h2 className="text-2xl font-semibold text-white mb-6 drop-shadow-lg">
                                
                            </h2>
                            <a
                                href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-medium text-lg shadow-md hover:shadow-green-400/20"
                                >
                                {link.button}
                            </a>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </section>
    )
}

export default News
