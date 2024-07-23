const apiUrl = 'https://teamalpinobackend.onrender.com'

export const fetchFromApi = (endpoint) => {
    return fetch(`${apiUrl}/${endpoint}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .catch((error) => {
        console.error('Error:', error)
    })
}
