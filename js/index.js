async function initializeCountries() {
    await loadCountries();
    const scrollContainer = document.querySelector('.grid');
    scrollContainer.addEventListener('scroll', checkScrollPosition);
    searchBtn.addEventListener('click', filterCountries);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            filterCountries();
        }
    });
}

initializeCountries();