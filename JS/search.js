let searchResults = [];

window.onload = () => {
    buildNavBar();
    //let url = 'http://localhost:5000/games/search' + location.search.substring(1);
    let url = 'http://project2eb-env.eba-yrqmmmkh.us-east-2.elasticbeanstalk.com/games/search/' + location.search.substring(1);

    fetch(url)
        .then(response => response.json())
        .then(json => {
            searchResults = json;
            buildSearchResults();
        })
        .catch(err => console.log(err));    
}

function buildNavBar(){
    console.log("In buildNavBar");
    document.getElementById("logoImage").onclick = redirectHome;  
    
    document.getElementById("searchButton").onclick = redirectGameSearch;

    document.getElementById("userProfile").onclick = redirectUser;

    document.getElementById("searchBox").addEventListener("keydown", (e)=>{
        if(e.keyCode == 13){
            redirectGameSearch();
        }        
    });
}

function buildSearchResults() {
    console.log("In buildSearchResults");
    let sBox = document.getElementById("searchResultsBox");

    for (let i = 0; i < searchResults.length; i++){
        let section = document.createElement('section');
                section.setAttribute("class", "border col-md-12 search-result-item shadow-sm flex-md-row mb-1");
                section.setAttribute("name", searchResults[i].name);
                section.setAttribute("id", searchResults[i].name);

                let a = document.createElement('a');
                a.setAttribute("class", "image-link");
                // a.setAttribute("href", `game.html/name${favGame.name}`);

                    let image = document.createElement("img");
                    image.setAttribute("class", "image");
                    image.setAttribute("src", searchResults[i].background_image);
                    console.log(searchResults[i].background_image);
                    a.appendChild(image);
                
                section.appendChild(a);

                let textBox = document.createElement('div');
                textBox.setAttribute("class", "search-result-item-body ");
                    let rowBox = document.createElement('div');
                    rowBox.setAttribute("class", "row");
                        let colBox = document.createElement('div');
                        colBox.setAttribute("class", "col-sm-9");

                            let heading = document.createElement("h5");
                            heading.setAttribute("class", "search-result-item-heading");
                                let a2 = document.createElement('a');
                                a2.setAttribute("href", "#");
                                a2.innerHTML = searchResults[i].name;
                                // a2.setAttribute("href", `game.html/name${favGame.name}`);
                            heading.appendChild(a2);
                            let p = document.createElement('p');
                            p.setAttribute("class", "description m-md-0");
                            p.innerHTML = searchResults[i].description.substring(0, 300) + "...";
                        colBox.appendChild(heading);
                        colBox.appendChild(p);
                            // colBox.innerHTML = favGame.platforms[0];
                    rowBox.appendChild(colBox);
                textBox.appendChild(rowBox);

                section.appendChild(textBox);
                section.onclick = redirectGame;

                sBox.appendChild(section);
        //Whole result wrapper
        // let rBox = document.createElement('div');
        // rBox.setAttribute("class", "row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative");
        // rBox.setAttribute("id", searchResults[i].name);
        // rBox.onclick = redirectGame;

        // //Result Header
        // let resultHeader = document.createElement('div');
        // resultHeader.setAttribute("class", "col p-4 d-flex flex-column position-static");

        // let heading = document.createElement('h3');
        // heading.appendChild(document.createTextNode(searchResults[i].name));
        // resultHeader.appendChild(heading);

        // let description = document.createElement('p');
        // description.setAttribute("class", "card-text mb-auto")
        // let text = searchResults[i].description;
        // description.innerHTML = text.substring(0, 200) + "...";
        // resultHeader.appendChild(description);

        // rBox.appendChild(resultHeader);

        // //Result Image
        // let imageBox = document.createElement('div');
        // imageBox.setAttribute("class", "col-auto d-none d-lg-block");
        // imageBox.setAttribute("width", "200")

        // let svgB = document.createElement('svg');
        // svgB.setAttribute("class", "bd-placeholder-img");
        // svgB.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        // svgB.setAttribute("width", "200");
        // svgB.setAttribute("height", "190");
        // svgB.setAttribute("role", "img");
        // svgB.setAttribute("preserveAspectRatio", "xMidYMid slice");
        // // imageBox.appendChild(svgB);

        // let background = document.createElement('rect');
        // background.setAttribute("width", "100%");
        // background.setAttribute("height", "100%");
        // background.setAttribute("fill", "#000");
        // svgB.appendChild(background);


        // let image = document.createElement('image');
        // console.log(searchResults[i].background_image)
        // image.setAttribute("href", searchResults[i].background_image);
        // image.setAttribute("height", "200");
        // image.setAttribute("width", "200");
        // image.setAttribute("x", "0%");
        // image.setAttribute("y", "0%");
        // svgB.appendChild(image);
        

        // imageBox.appendChild(svgB);

        // rBox.appendChild(imageBox);

        // sBox.appendChild(rBox);

    }

}

function redirectHome(){
    window.location.href = "home.html"; 
}

function redirectUser(){
    window.location.href = "user.html"; 
}

function redirectGameSearch(){
    let searchGame = document.getElementById("searchBox").value;
    let gamePage = "search.html?" + searchGame;

    window.location.href = gamePage;
}

function redirectGame(){
    console.log("redirecting to " + this.id);
    let gamePage = "game.html?" + this.id;
    window.location.href = gamePage;
}