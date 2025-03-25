const API_URL = 'https://restcountries.com/v3.1/all';

async function fetchCountries() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al cargar los datos');
    countriesContainer.innerHTML = '';
    allCountries.splice(0, allCountries.length, ...(await response.json()));
  } catch (error) {
    countriesGrid.innerHTML = `<p class="loader">No se pudieron cargar los países. Por favor, intenta de nuevo más tarde.</p>`;
  }
}
