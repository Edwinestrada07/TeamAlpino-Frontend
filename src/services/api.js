const apiUrl = process.env.REACT_APP_API_URL;

export const fetchFromApi = async (endpoint) => {
    try {
        const response = await fetch(`${apiUrl}/${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        return response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error; // Aseguramos de que el error se propague
    }
};

