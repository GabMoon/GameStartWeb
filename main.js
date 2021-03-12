let allGames = [];

window.onload = () => {
    //let promise = fetch('https://localhost:5000/games')
    
    let promise = fetch('http://project2eb-env.eba-yrqmmmkh.us-east-2.elasticbeanstalk.com/games')
           .then(response => response.json())
            .then(json => {
                allGames = json;
                buildGames();
            })
            .catch(err => console.log(err));
}

function buildGames(){
    console.log("In build Games");
    console.log(allGames.length);
    let allGamesList = document.createElement('ol');
    allGamesList.setAttribute("class", "gs-searchResult")
    
   //Append Details for loop
   let NameItem, NameText
   for (const cur in allGames){
        //Individual Game
        let GameDetailsList = document.createElement('ul');
        console.log("In Game for loop");
        NameItem = document.createElement('li');
        NameText = document.createTextNode(allGames[cur].name);
        NameItem.appendChild(NameText);
        GameDetailsList.appendChild(NameItem);

        // let AnswersList = document.createElement('ul');
        // AnswersList.setAttribute("name", quizQuestions[cur].questionId);
    
        // //Append Answer for loop
        // let AnswerItem, AnswerText, radial;
        // for (const i in quizQuestions[0].questionAnswers){
        //     AnswerItem = document.createElement('li');
        //     radial = document.createElement('input');
        //     radial.setAttribute("type", "radio");
        //     radial.setAttribute("name", quizQuestions[cur].questionText);

        //     radial.setAttribute("value", i);
        //     //radial.setAttribute("value",quizQuestions[cur].answers[i]);
        //     AnswerItem.appendChild(radial);
        //     AnswerText = document.createTextNode(quizQuestions[cur].questionAnswers[i]);
        //     AnswerItem.appendChild(AnswerText);
        //     AnswersList.appendChild(AnswerItem);
        // }

    // QuestionList.appendChild(AnswersList);
    allGamesList.appendChild(GameDetailsList);
   }

   let resultsDiv = document.getElementById("div-search-box");
   resultsDiv.appendChild(allGamesList);
}