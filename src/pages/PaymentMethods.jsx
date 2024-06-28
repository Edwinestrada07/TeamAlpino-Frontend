import { faCreditCard } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const PaymentMethods = () => {
    return (
        <section className="flex-1 flex flex-col justify-center items-center min-h-screen bg-gray-900">
            <h1 className="text-3xl font-bold text-center text-white mb-4">
                <FontAwesomeIcon icon={faCreditCard} className="mr-2 text-2xl" /> Medios de Pago
            </h1>
            <p className="text-xl font-bold text-center text-white mb-6">Estos medios de pago se habilitan para pagos de la cancha</p>

            <div className="flex flex-wrap justify-center gap-6">
                <div className="flex flex-wrap -m-4">
                    {/* Nequi Payment Method */}
                    <div className="p-4 lg:w-1/2 md:w-full">
                        <div className="flex border-2 rounded-lg border-gray-700 p-4 sm:flex-row flex-col items-center justify-center">
                            <div className="sm:mr-8 sm:mb-0 mb-4">
                                <img src="/img/QR_nequi.jpg" alt="QR Code Nequi" className="rounded-lg w-64 h-full object-cover"/>
                            </div>
                            <div className="flex-grow text-center">
                                <h2 className="text-white text-2xl title-font font-medium">Pagos Nequi</h2>
                                <p className="text-white text-lg">Escanea el QR y envía tus pagos al número 320-341-2535.</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Daviplata Payment Method */}
                    <div className="p-4 lg:w-1/2 md:w-full">
                        <div className="flex border-2 rounded-lg border-gray-700 p-4 sm:flex-row flex-col items-center justify-center">
                            <div className="sm:mr-8 sm:mb-0 mb-4">
                                <img src="/img/QR_daviplata.jpg" alt="QR Code Daviplata" className="rounded-lg w-64 h-full object-cover"/>
                            </div>
                            <div className="flex-grow text-center">
                                <h2 className="text-white text-2xl title-font font-medium">Pagos Daviplata</h2>
                                <p className="text-white text-lg">Pagos habilitados para Daviplata al número 320-341-2535.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PaymentMethods

