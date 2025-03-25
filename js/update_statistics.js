function updateStatistics(countries) {
  totalCountries.textContent = countries.length;
  const continents = new Set();
  countries.forEach(country => country.continents?.forEach(continent => continents.add(continent)));
  totalContinents.textContent = continents.size;
  totalPopulation.textContent = countries.reduce((sum, country) => sum + country.population, 0).toLocaleString();
}