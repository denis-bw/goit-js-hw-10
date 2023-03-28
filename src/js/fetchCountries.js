 
export default function fetchCountries(name) {
    const resultFeatch = fetch(`https://restcountries.com/v3.1/name/${name}?capital,population,flags,languages`).then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            };
            return response.json()
        })
    return resultFeatch;
};
