function filterCountries() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  if (searchTerm === '') {
      isFiltering = false;
      filteredCountries = [...allCountries];
  } else {
      isFiltering = true;
      filteredCountries = allCountries.filter(country => {
          return (
              country.name.common.toLowerCase().includes(searchTerm) ||
              country.name.official.toLowerCase().includes(searchTerm) ||
              (country.capital && country.capital[0].toLowerCase().includes(searchTerm)) ||
              (country.region && country.region.toLowerCase().includes(searchTerm)) ||
              (country.continents && country.continents[0].toLowerCase().includes(searchTerm))
          );
      });
  }

  page = 1;
  countriesContainer.innerHTML = '';
  loadCountries();

  const scrollContainer = document.querySelector('.grid');
  scrollContainer.addEventListener('scroll', checkScrollPosition);
}