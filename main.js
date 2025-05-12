/*In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), 
che accetta una città come input e recupera simultaneamente:
- Nome completo della città e paese da  /destinations?search=[query]
(result.name, result.country, nelle nuove proprietà city e country).
- Il meteo attuale da /weathers?search={query}
(result.temperature e result.weather_description nella nuove proprietà temperature e weather).
- Il nome dell’aeroporto principale da /airports?search={query}
(result.name nella nuova proprietà airport). 
url base: https://boolean-spec-frontend.vercel.app/freetestapi
*/

// Funzione per effettuare una richiesta fetch e restituire il risultato come JSON
async function fetchJson(url) {
    const response = await fetch(url); // Effettua una richiesta HTTP
    const obj = await response.json(); // Converte la risposta in JSON
    return obj; // Restituisce l'oggetto JSON
}

// Funzione per ottenere i dati della dashboard per una città specifica
async function getDashboardData(query) {
    console.log(`caricando la dashboard per la query "${query}"`);

    // Promesse per recuperare i dati da tre endpoint API
    const destinationsPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`);
    const weathersPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`);
    const airportsPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`);

    // Combina tutte le promesse e attende che tutte siano risolte
    const promise = [destinationsPromise, weathersPromise, airportsPromise];
    const [destinations, weathers, airports] = await Promise.all(promise);

    // Restituisce un oggetto con i dati combinati
    return {
        city: destinations[0].name, // Nome della città
        country: destinations[0].country, // Paese della città
        temperature: weathers[0].temperature, // Temperatura attuale
        weather: weathers[0].weather_description, // Descrizione del meteo
        airport: airports[0].name // Nome dell'aeroporto principale
    };
}

// Chiama la funzione getDashboardData con la query 'london'
getDashboardData('london')
    .then(data => {
        // Stampa i dati della dashboard
        console.log('Dati della dashboard:', data);
        console.log(
            `${data.city}, is in ${data.country},
            the temperature is ${data.temperature}°C,
            the weather is ${data.weather},
            the main airport is ${data.airport}`
        );
    })
    .catch(error => console.error('Errore:', error)); // Gestisce eventuali errori