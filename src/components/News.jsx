const News = () => {
    const handleClick = () => {
        window.location.href = 'https://www.marca.com/futbol/futbol-internacional.html' // URL de la página de noticias deportivas
    }

    return (
        <div className="mt-4">
            <button onClick={handleClick} className="text-blue-500 cursor-pointer">
                Click AQUÍ para Noticias de Deportes
            </button>
        </div>
    )
}

export default News;