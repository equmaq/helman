api1 = "https://api.finna.fi/api/v1/search?type=AllFields&filter[]=building%3A%220%2FHelmet%2F%22&filter[]=format:%221/Book/Book/%22&filter[]=language%3A%22eng%22&filter[]=genre_facet%3A%22Mangat%22&sort=first_indexed+desc&page="
api2 = "&limit=100&prettyPrint=true&lng=en-gb"

function getEntries(amount, startPage = 1) {
    api = `${ap1+startPage+api2}`
    if (amount == 'new') {

    } else if (amount.startsWith('num:', 0)) {

    } else if (amount == 'all') {

    }
}