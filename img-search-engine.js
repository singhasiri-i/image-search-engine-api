const accessKey = "mV0HKnRNzRLMuYbedgb2ui6TPXWu71Yn4eZWluWFcnk" // parameter "client_id"

const searchForm = document.getElementById("searchForm")
const searchBox = document.getElementById("searchBox")
const searchBtn = document.getElementById("searchBtn")
const moreBtn = document.getElementById("moreBtn")
const searchResult = document.getElementById("searchResult")

let keyword = ""
let page = 1

async function searchImage() {
    keyword = searchBox.value
    console.log(keyword);

    const url = `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${keyword}&page=${page}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data);

    if (page === 1) {
        searchResult.innerHTML = "" // ให้ซ่อนปุ่ม Show More ถ้า search แล้วไม่เจอหรือยังไม่ได้ search
    }

    const results = data.results

    results.map((results) => {
        const image = document.createElement("img")
        image.src = results.urls.small
        const imageLink = document.createElement("a")
        imageLink.href = results.links.html
        imageLink.target = "_blank" // ทำให้เวลาคลิกที่รูปภาพให้มันขึ้น tab ใหม่

        imageLink.appendChild(image)
        searchResult.appendChild(imageLink)
    })

    moreBtn.style.display = "block" // แสดงปุ่ม Show More ถ้า search แล้วเจอ (จาก if ด้านบน)
}

searchForm.addEventListener("submit", function (form) {
    form.preventDefault()
    page = 1
    searchImage()
})

moreBtn.addEventListener("click", () => {
    page++
    searchImage()
})

