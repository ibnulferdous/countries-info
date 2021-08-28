const loadCountries = () => {
    fetch("https://restcountries.eu/rest/v2/all")
        .then(res=> res.json())
        .then(data=> showCountries(data))
}

loadCountries()

const showCountries = countriesData => {
    console.log(countriesData)

    const rowDiv = document.getElementById("row")

    countriesData.forEach(country => {
        const columnDiv = document.createElement("div") 
        columnDiv.classList.add("col")

        // Loop on array for languages
        const languages = country.languages.map(languageObj=> languageObj.name)
        // Loop on array for languages
        let border
        if(country.borders.length == 0) {
            borders = "None"
        } else {
            borders = country.borders.join(", ")
        }



        columnDiv.innerHTML = `
            <div class="card p-3">
                <div class="card-body">
                    <!-- Card Heading Part -->
                    <div class="row mb-3">
                        <div class="col-10 d-flex align-items-center">
                            <a href="#" class="fs-4 fw-bold text-info">
                                ${country.name}
                            </a>                                    
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
                </div>
            </div>
        `
        rowDiv.appendChild(columnDiv)
    })

}