import { faCreditCard } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const PaymentMethods = () => {
    return (
        <section className="text-gray-400 bg-gray-900 body-font">
            <h1 className="text-3xl font-bold text-center text-white m-6">
                <FontAwesomeIcon icon={faCreditCard} className="mr-2" /> Medios de Pago
            </h1>

            <div className="container px-5 py-8 mx-auto flex flex-wrap">
                <div className="flex flex-wrap -m-4">
                    <div className="p-4 lg:w-1/2 md:w-full">
                        <div className="flex border-2 rounded-lg border-gray-800 p-8 sm:flex-row flex-col justify-center">
                            <div className="sm:mr-8 sm:mb-0 mb-4 flex-shrink-0">
                                <img src="/img/QR_nequi.jpg" alt="Imagen 1" className="rounded-lg w-64 h-full object-cover"/>
                            </div>
                        </div>
                        <h2 className="text-white text-lg title-font font-medium mb-3">Pagos Nequi</h2>
                        <p className="leading-relaxed text-base">Escanea el QR y envia tus pagos 320-341-2535.</p>
                    </div>
                    <div className="p-4 lg:w-1/2 md:w-full">
                        <div className="flex border-2 rounded-lg border-gray-800 p-8 sm:flex-row flex-col justify-center">
                            <div className="sm:mr-8 sm:mb-0 mb-4 flex-shrink-0">
                                <img src="/img/QR_daviplata.jpg" alt="Imagen 2" className="rounded-lg w-64 h-full object-cover"/>
                            </div>       
                        </div>
                        <h2 className="text-white text-lg title-font font-medium mb-3">Pagos Daviplata</h2>
                        <p className="leading-relaxed text-base">Pagos habilitados para Daviplata 320-341-2535.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export  default PaymentMethods
