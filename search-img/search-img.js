const clientID = "mV0HKnRNzRLMuYbedgb2ui6TPXWu71Yn4eZWluWFcnk"
const form = document.getElementById("search-Form")
const input = document.getElementById("search-Box")
const searchBtn = document.getElementById("search-Btn")
const divResults = document.getElementById("img-Results")
const showMore = document.getElementById("showmore-Btn")

let page = 1

async function searchImg() {
    try {
        const query = form.elements.query.value
        const url = `https://api.unsplash.com/search/photos?client_id=${clientID}&query=${query}&page=${page}`
        const response = await axios.get(url)
        const arrResults = response.data.results
        
        arrResults.map((result) => {
            const imgElement = document.createElement('img')
            imgElement.src = result.urls.small
            const imgLink = document.createElement('a')
            imgLink.href = result.links.html
            imgLink.target = "_blank"
            
            imgLink.append(imgElement)
            divResults.append(imgLink)
        })
    } catch (err) {
        console.log("Error!", err);
    }
}

form.addEventListener("submit", (input) => {
    input.preventDefault()
    page = 1
    searchImg()
})

showMore.addEventListener("click", () => {
    page++
    searchImg()
})
