import { faShirt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Uniforms = () => {
    return (
        <section>
            <h1 className="text-3xl font-bold text-center text-white m-6">
                <FontAwesomeIcon icon={faShirt} className="mr-2" /> Uniformes de Jugadores Lpino
            </h1>

            <div className="container px-5 py-10 mx-auto">
                <div className="flex flex-wrap -mx-4 -mb-10 text-center">
                    <div className="sm:w-1/2 mb-10 px-10">
                        <div className="rounded-lg overflow-hidden">
                            <img alt="content" className="object-cover object-center h-full w-full" src="img/mockup_camiseta_1.jpg" />
                        </div>
                        <h2 className="title-font text-2xl font-medium text-white mt-6 mb-3">Jersey Negro Manga Corta</h2>
                    </div>
                    
                    <div className="sm:w-1/2 mb-10 px-10">
                        <div className="rounded-lg overflow-hidden">
                            <img alt="content" className="object-cover object-center h-full w-full" src="img/mockup_camiseta_2.jpg" />
                        </div>
                        <h2 className="title-font text-2xl font-medium text-white mt-6 mb-3">Jersey Blanco Manga Corta</h2>
                    </div>

                    <div className="sm:w-1/2 mb-10 px-10">
                        <div className="rounded-lg overflow-hidden">
                            <img alt="content" className="object-cover object-center h-full w-full" src="img/mockup_camiseta_3.jpg" />
                        </div>
                        <h2 className="title-font text-2xl font-medium text-white mt-6 mb-3">Jersey Blanco Manga Larga Portero</h2>
                    </div>
                </div>
            </div>
        </section>
            
    )
}

export default Uniforms
