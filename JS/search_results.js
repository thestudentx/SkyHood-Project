document.addEventListener("DOMContentLoaded", function () {
    let params = new URLSearchParams(window.location.search);
    let query = params.get("q");

    // Update query text
    document.getElementById("queryText").innerText = query ? query : "Nothing";

    let pages = [
        { title: "NASA Discovers a New Exoplanet", link: "News.html" },
        { title: "SpaceX's New Mars Mission", link: "News.html" },
        { title: "James Webb Captures Stunning Nebula", link: "News.html" },
        { title: "Explore the Cosmos", link: "Explore.html" }
    ];

    let resultsList = document.getElementById("resultsList");
    resultsList.innerHTML = "";  // Clear previous results

    if (query) {
        let results = pages.filter(page => page.title.toLowerCase().includes(query.toLowerCase()));

        if (results.length > 0) {
            results.forEach(result => {
                let li = document.createElement("li");
                let a = document.createElement("a");
                a.href = result.link;
                a.innerText = result.title;
                li.appendChild(a);
                resultsList.appendChild(li);
            });
        } else {
            resultsList.innerHTML = "<li>No results found.</li>";
        }
    } else {
        resultsList.innerHTML = "<li>Please enter a search query.</li>";
    }
});
