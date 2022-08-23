let table = document.getElementById('countries')

const getCountries = async () => {

    try {
        const response = await fetch("https://restcountries.com/v3.1/all")
        if(response.ok){
            const jsonResponse = await response.json()

            jsonResponse.sort((a,b) => {
                let fa = a.name.common.toLowerCase();
                let fb = b.name.common.toLowerCase();

                if (fa < fb) {
                    return -1;
                } else if (fa > fb) {
                    return 1;
                }
                return 0;
            })

            console.log(jsonResponse)
            jsonResponse.map(country => {
                country.area = country.area.toLocaleString('pt-br', {minimumFractionDigits: 2})
                if(!country.capital){
                    country.capital = "-"
                }
                if(!country.area){
                    country.area = "-"
                }
                console.log(country.currencies)
                if(!country.currencies){
                    country.currencies = "-"
                }
                table.innerHTML += `<tr>
                                        <td>${country.name.common}</td>
                                        <td>${country.capital}</td>
                                        <td>${country.area}</td>
                                        <td>${Object.keys(country.currencies)}</td>
                                    </tr>`
            })
        }
    } catch (error) {
        console.log(error)
    }
}

getCountries()