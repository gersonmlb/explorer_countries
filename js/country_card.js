closeModal.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
    }
});

class CountryCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        const countryName = this.shadowRoot.querySelector('.country_name');
        countryName.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showModal();
        });
    }

    showModal() {
        modalTitle.textContent = this.getAttribute('name');

        var content_modal = `
              <div class="country-detail">
                  <div class="flag-container">
                      <img src="${this.getAttribute('flag')}" alt="Bandera de ${this.getAttribute('name')}">
                  </div>
                  <div class="country-data">
                      <h2>${this.getAttribute('name')}</h2>
                      <h3>${this.getAttribute('official')}</h3>
                      
                      <div class="info-grid">
                          <div class="info-item">
                              <span class="info-label">Continente:</span> ${this.getAttribute('region')}
                          </div>
                          <div class="info-item">
                              <span class="info-label">Subregión:</span> ${this.getAttribute('subregion')}
                          </div>
                          <div class="info-item">
                              <span class="info-label">Capital:</span> ${this.getAttribute('capital')}
                          </div>
                          <div class="info-item">
                              <span class="info-label">Población:</span> ${this.getAttribute('population')}
                          </div>
                          <div class="info-item">
                              <span class="info-label">Zona horaria:</span> ${this.getAttribute('timezones')}
                          </div>
                          <div class="info-item">
                              <span class="info-label">Moneda:</span> ${this.getAttribute('currencies')}
                          </div>
                          <div class="info-item">
                              <span class="info-label">Idiomas:</span> ${this.getAttribute('languages')}
                          </div>
                      </div>
                      
                      <a href="https://www.google.com/maps/place/${this.getAttribute('name')}" target="_blank" class="map-link">
                          Ver en Google Maps
                          <i class="bi bi-geo-fill"></i>
                      </a>
                  </div>
              </div>
              
              <div class="border-countries">
                  <h4>Países fronterizos:</h4>
                  <div class="borders-container" id="borderCountries">
                  ${this.getAttribute('border')}
                  </div>
              </div>
          `;
        modalBody.innerHTML = content_modal;
        modalOverlay.classList.add('active');
    }

    render() {
        this.shadowRoot.innerHTML = `
          <link rel="stylesheet" href="styles/style_card.css">
          <div>
              <img src="${this.getAttribute('flag')}" alt="Bandera de ${this.getAttribute('name')}" class="flag_svg">
              <div class="info__country">
                  <h3 class="country_name">${this.getAttribute('name')}</h3>
                  <div class="box__info">
                    <div class="div__info"><span class="span_title">Ciudad Capital</span> <p>${this.getAttribute('capital')}</p></div>
                    <i class="bi bi-globe-americas"></i>
                  </div>
                  <div class="box__info">
                    <div class="div__info"><span class="span_title">Idioma</span> <p>${this.getAttribute('language')}</p></div>
                    <i class="bi bi-megaphone-fill"></i>
                  </div>
                  <div class="box__info">
                    <div class="div__info"><span class="span_title">Población</span> <p>${this.getAttribute('population')}</p></div>
                    <i class="bi bi-cookie"></i>
                  </div>
              </div>
          </div>
      `;
    }
}

customElements.define('country-card', CountryCard);