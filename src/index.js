import './css/styles.css';
import fetchCountries from "./js/fetchCountries.js";
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;


const refs = {
    input: document.querySelector('input#search-box'),
    ulFlags: document.querySelector('.country-list'),
    divName: document.querySelector('.ccountry-info'),
}


refs.input.addEventListener('input',debounce((e) => {       
        searchCuntry(e)
    }, DEBOUNCE_DELAY))



function searchCuntry(e) {
    e.preventDefault();

    const cuntry = e.target.value.trim();

    if (e.target.value === '') {
        refs.ulFlags.innerHTML = '';
        return;
    };

    
    fetchCountries(cuntry).then(data => {
        if (data.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            return;
        }
        
        if (data.length === 1) {
            const markupCard = generatecuntryMarkupCard(data);
            appendMarcupCuntryCard(markupCard)
            return;
        }

        const markup = generatecuntryMarkup(data)
        appendMarcupCuntry(markup);
    }).catch(err => Notiflix.Notify.failure("Oops, there is no country with that name"));
}

function appendMarcupCuntry(markupCuntry){
    refs.ulFlags.innerHTML = markupCuntry;
}

function generatecuntryMarkup(data) {
     return data.map((element) =>
                `<li><img width="150" height="100" src="${element.flags.svg}"><p>${element.name.official}</p></li>`).join();
}



function appendMarcupCuntryCard(markupCuntry){
    refs.ulFlags.innerHTML = markupCuntry;
}
function generatecuntryMarkupCard(data){
    return `<li><img width="150" height="100" src="${data[0].flags.svg}">
            <p>${data[0].name.official}</p>
            <p>Capital: ${data[0].capital.join()}</p>
            <p>Population: ${data[0].population}</p>
            <p>Languages: ${Object.values(data[0].languages).join()}</p>
        </li>`;
}