import { faShirt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

const Uniforms = () => {
    const [selectedImage, setSelectedImage] = useState(null)

    const uniforms = [
        {
            id: 1,
            src: "img/mockup_camiseta_1.jpg",
            title: "Jersey Negro Manga Corta",
        },
        {
            id: 2,
            src: "img/mockup_camiseta_2.jpg",
            title: "Jersey Blanco Manga Corta",
        },
        {
            id: 3,
            src: "img/mockup_camiseta_3.jpg",
            title: "Jersey Blanco Manga Larga Portero",
        },
    ]

    return (
        <section className="flex-1 flex flex-col justify-center items-center min-h-screen bg-gray-900">
            <h1 className="text-3xl font-bold text-center text-white mb-6">
                <FontAwesomeIcon icon={faShirt} className="mr-2 text-2xl" /> Uniformes de Jugadores Lpino
            </h1>

            <div className="flex flex-wrap justify-center gap-6">
                {uniforms.map((uniform) => (
                    <div
                        key={uniform.id}
                        className="w-full max-w-xs mb-10 bg-gray-800 rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
                        onClick={() => setSelectedImage(uniform.src)}
                    >
                        <div className="overflow-hidden border-b-2 border-gray-700">
                            <img
                                alt={uniform.title}
                                className="w-full h-auto block transition-transform transform hover:scale-110"
                                src={uniform.src}
                            />
                        </div>
                        <h2 className="text-xl font-medium p-4 text-gray-300">
                            {uniform.title}
                        </h2>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div 
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50" 
                    onClick={() => setSelectedImage(null)}
                >
                    <img src={selectedImage} 
                        alt="Selected" 
                        className="max-w-full max-h-full" 
                    />
                </div>
            )}
        </section>
    )
}

export default Uniforms
