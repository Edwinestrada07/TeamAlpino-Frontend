const News = () => {
    const handleClick = () => {
        window.location.href = 'https://www.marca.com/futbol/futbol-internacional.html' // URL de la página de noticias deportivas
    }

    return (
        <div className="mt-4">
            <section class="text-gray-400 bg-gray-900 body-font rounded-lg shadow-lg">
                <div class="container px-3 py-10 mx-auto">
                    <div class="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
                        <h1 class="flex-grow sm:pr-16 text-2xl font-medium title-font text-white">Con el siguiente link te va redirigir a una página de deportes</h1>
                        <button 
                            onClick={handleClick} 
                            className="flex-shrink-3 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"
                        >
                            Click AQUÍ para Noticias de Deportes
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default News;