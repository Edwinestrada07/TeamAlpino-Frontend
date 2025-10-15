import { faCreditCard } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const PaymentMethods = () => {
  const methods = [
    {
      id: 1,
      title: "Pagos Nequi",
      img: "/img/QR_nequi.jpg",
      number: "320-341-2535",
      description: "Escanea el QR y envía tus pagos a través de Nequi.",
    },
    {
      id: 2,
      title: "Pagos Daviplata",
      img: "/img/QR_daviplata.jpg",
      number: "320-341-2535",
      description: "Envía tus pagos fácilmente por Daviplata.",
    },
  ]

  return (
    <section className="flex-1 flex flex-col justify-center items-center min-h-screen bg-gray-900 p-6">
      {/* Título principal */}
      <h1 className="text-3xl font-bold text-center text-white mb-4 flex items-center gap-3">
        <FontAwesomeIcon icon={faCreditCard} className="text-green-400 text-3xl" />
        Medios de Pago
      </h1>

      <p className="text-lg md:text-xl text-center text-gray-300 mb-10 max-w-2xl">
        Estos medios de pago están habilitados para realizar tus pagos de la cancha de forma rápida y segura.
      </p>

      {/* Contenedor de métodos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {methods.map((method) => (
          <div
            key={method.id}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-center gap-6 shadow-lg transition-transform transform hover:scale-[1.02] hover:shadow-green-400/20"
          >
            {/* Imagen del código QR */}
            <img
              src={method.img}
              alt={`QR Code ${method.title}`}
              className="rounded-lg w-56 h-56 object-cover shadow-md"
            />

            {/* Información */}
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-semibold text-white mb-2">{method.title}</h2>
              <p className="text-gray-300 mb-2">{method.description}</p>
              <p className="text-green-400 font-medium text-lg">
                Número: {method.number}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PaymentMethods
