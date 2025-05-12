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

async function fetchJson(url){
    const response = await fetch(url);
    const obj = await response.json();
    return obj;
}

async function getDashboardData(query){
    console.log(`caricando la dashboard per la query "${query}"`);
    const destinationsPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`);
    const weathersPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`);
    const airportsPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`);

    const promise = [destinationsPromise, weathersPromise, airportsPromise];
    const [destinations, weathers, airports] = await Promise.all(promise);

    return {
        city: destinations[0].name,
        country: destinations[0].country,
        temperature: weathers[0].temperature,
        weather: weathers[0].weather_description,
        airport: airports[0].name
    }
}

getDashboardData('london')
    .then(data => {
        console.log('Dati della dashboard:', data);
        console.log(
            `${data.city}, is in ${data.country},
            the temperature is ${data.temperature}°C,
            the weather is ${data.weather},
            the main airport is ${data.airport}`
        );
    })
    .catch(error => console.error('Errore:', error));