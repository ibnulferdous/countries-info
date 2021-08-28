const loadCountries = async () => {
    const res = await fetch("https://restcountries.eu/rest/v2/all")
    const data = await res.json()
    showCountries(data)
}

loadCountries()


// Function to show countries on the index.html page
const showCountries = countriesData => {

    const rowDiv = document.getElementById("row")

    countriesData.forEach(country => {
        const columnDiv = document.createElement("div") 
        columnDiv.classList.add("col")

        // Loop on array for languages
        const languages = country.languages.map(languageObj=> languageObj.name)
        // Loop on array for borders
        let borders
        if(country.borders.length == 0) {
            borders = "None"
        } else {
            borders = country.borders.join(", ")
        }

        columnDiv.innerHTML = `
            <div class="card h-100 p-3">
                <div class="card-body">
                    <!-- Card Heading Part -->
                    <div class="row mb-3">
                        <div class="col-10 d-flex align-items-center">
                            <h3 class="fs-4 fw-bold text-primary">
                                ${country.name}
                            </h3>                                    
                        </div>
                        <div class="col-2 d-flex justify-content-end align-items-center">
                            <img src="${country.flag}" class="img-fluid d-block" alt="${country.name} Flag">
                        </div>
                    </div>

                    <ul>
                        <li><span class="fw-bold">Capital:</span> ${country.capital}</li>
                        <li><span class="fw-bold">Language:</span> ${languages.join(", ")}</li>
                        <li><span class="fw-bold">Population:</span> ${country.population}</li>
                        <li><span class="fw-bold">Region:</span> ${country.region}</li>
                        <li><span class="fw-bold">Border(s):</span> ${borders}</li>
                    </ul>
                    <button onclick="countryDetails('${country.alpha3Code}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#country-details">Learn More</button>
                </div>
            </div>
        `
        rowDiv.appendChild(columnDiv)
    })

}

const countryDetails = async countryCode => {
    document.getElementById("country-name").textContent = ""
    document.getElementById("modal-body").innerHTML = ""

    const url = `https://restcountries.eu/rest/v2/alpha/${countryCode}`

    const res = await fetch(url)
    const data = await res.json()

    document.getElementById("country-name").textContent = data.name

    // Loop on array for languages
    const languages = data.languages.map(languageObj=> languageObj.name)
    // Loop on array for borders
    let borders
    if(data.borders.length == 0) {
        borders = "None"
    } else {
        borders = data.borders.join(", ")
    }

    const ul = document.createElement("ul")
    ul.innerHTML = `
        <li><span class="fw-bold">Capital:</span> ${data.capital}</li>
        <li><span class="fw-bold">Language:</span> ${languages.join(", ")}</li>
        <li><span class="fw-bold">Area:</span> ${data.area} km<sup>2</sup></li>
        <li><span class="fw-bold">Alpha-3 code:</span> ${data.alpha3Code}</li>
        <li><span class="fw-bold">Border(s):</span> ${borders}</li>
        <li><span class="fw-bold">Population:</span> ${data.population}</li>
        <li><span class="fw-bold">Region:</span> ${data.region}</li>
        <li><span class="fw-bold">Sub-region:</span> ${data.subregion}</li>
        <li><span class="fw-bold">Currencies:</span> ${data.currencies[0].name} ${data.currencies[0].symbol}</li>
        <li><span class="fw-bold">Calling Code:</span> ${data.callingCodes[0]}</li>
        <li><span class="fw-bold">Time-zones:</span> ${data.timezones.join(", ")}</li>
    `

    document.getElementById("modal-body").appendChild(ul)



}
