import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';

const Statistics = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch('http://localhost:3000/user');
                const userData = await response.json(); // Parsear la respuesta a JSON
                setPlayers(userData);
            } catch (error) {
                console.error('Error al obtener jugadores:', error);
            }
        };

        fetchPlayers();
    }, []);

    // Función para obtener datos de calificaciones para graficar
    const getChartData = () => {
        const ratings = players.map(player => player.rating);
        const data = {
            labels: players.map(player => player.name),
            datasets: [
                {
                    label: 'Calificación de Jugadores',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 1,
                    data: ratings,
                },
            ],
        };
        return data;
    };

    return (
        <div className="statistics-container">
            <h2>Estadísticas del Juego</h2>
            <div className="chart-container">
                <Bar
                    data={getChartData()}
                    options={{
                        title: { display: true, text: 'Calificación de Jugadores', fontSize: 20 },
                        legend: { display: false },
                        scales: {
                            yAxes: [{ ticks: { beginAtZero: true, max: 5 } }],
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default Statistics;

