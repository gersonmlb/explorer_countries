function checkScrollPosition() {
  const scrollContainer = document.querySelector('.grid');
  if (scrollContainer.scrollHeight - scrollContainer.scrollTop <= scrollContainer.clientHeight + 50) {
      loadCountries();
  }
}

function validateScrollPosition(endIndex) {
  if (!isFiltering && endIndex >= allCountries.length) {
    const scrollContainer = document.querySelector('.grid');
    scrollContainer.removeEventListener('scroll', checkScrollPosition);
  } else if (isFiltering && endIndex >= filteredCountries.length) {
    const scrollContainer = document.querySelector('.grid');
    scrollContainer.removeEventListener('scroll', checkScrollPosition);
  }
}

function attributeBorders(country) {
  return country.borders && country.borders.length > 0
    ? country.borders.map(border => {
      const borderCountry = allCountries.find(c => c.cca3 === border);
      const borderName = borderCountry ? borderCountry.name.common : border;
      return `<span class="border-tag" data-code="${border}">${borderName}</span>`;
    }).join('')
    : '<span>No tiene fronteras con otros países</span>'
}

async function loadCountries() {
  if (isLoading) return;
  isLoading = true;

  if (allCountries.length === 0) {
    await fetchCountries();
    updateStatistics(allCountries);
    filteredCountries.splice(0, filteredCountries.length, ...allCountries);
  }

  const countries = isFiltering ? filteredCountries : allCountries;
  const startIndex = (page - 1) * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  const selectedCountries = countries.slice(startIndex, endIndex);

  if (selectedCountries.length === 0 && isFiltering) {
    if (countriesContainer.children.length === 0) {
      countriesContainer.innerHTML = '<div class="no-results">No se encontraron países con ese criterio de búsqueda.</div>';
    }
    isLoading = false;
    return;
  }

  var not_available = 'No disponible';

  selectedCountries.forEach(country => {
    const card = document.createElement('country-card');
    card.setAttribute('name', country.name.common);
    card.setAttribute('capital', country.capital ? country.capital[0] : not_available);
    card.setAttribute('population', country.population.toLocaleString());
    card.setAttribute('continent', country.continents ? country.continents[0] : not_available);
    card.setAttribute('region', country.region || not_available);
    card.setAttribute('flag', country.flags.svg);
    card.setAttribute('timezones', country.timezones ? country.timezones[0] : not_available);
    card.setAttribute('map', country.maps ? country.maps.googleMaps : '#');
    card.setAttribute('official', country.name.official);
    card.setAttribute('subregion', country.subregion || not_available);
    card.setAttribute('languages', country.languages ? Object.values(country.languages).join(', ') : not_available);
    card.setAttribute('currencies', country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol || not_available})`).join(', ') : not_available);
    card.setAttribute('border', attributeBorders(country));
    countriesContainer.appendChild(card);
  });

  page++;
  isLoading = false;
  validateScrollPosition(endIndex);
}
