
//Creation of the heading.
var article = document.getElementsByTagName("ARTICLE")[0];
var heading = document.createElement("H2");
var headingText = document.createTextNode("Topics");
heading.setAttribute("class", "first_heading");
heading.appendChild(headingText);
article.appendChild(heading);
var section;

function topicsLayout()
{   
    let url = "gettopics.js";
    getFromDB(url, function(obj){
        let topicArray = obj.dbData;
        topicArray.forEach(Topic => {
           createTopic(Topic);
        });
    });
}

function createTopic(topic){
    let topicSection = document.createElement("SECTION");
    article.appendChild(topicSection);
    topicSection.setAttribute("class", "question");
    let subHeading = document.createElement("H2");
    topicSection.appendChild(subHeading);

    subHeading.appendChild(document.createTextNode("Topic " + topic.tid + ": " + topic.Title));

    let hiddenDiv = document.createElement("DIV");
    hiddenDiv.setAttribute("class", "hideTopic");
    topicSection.addEventListener("click", function(){
        console.log(hiddenDiv.getAttribute("class"));
        if(hiddenDiv.getAttribute("class") == "hideTopic")
        {
            hiddenDiv.setAttribute("class", "showTopic");
        }
        else    
        {
            hiddenDiv.setAttribute("class", "hideTopic");
        }
    });

    topicSection.appendChild(hiddenDiv);

    

    let url = "getQuiz.js?topicID=" + topic.tid;
    getFromDB(url, function(obj){
        let quizArray = obj.dbData;
        console.log(quizArray);
        quizArray.forEach(Quiz => {
            let description = document.createElement("A");
            description.setAttribute("href", Quiz.linkDescription);
            let image = document.createElement("IMG");
            image.setAttribute("src", "resources/information.png");
            
            description.appendChild(image);
            hiddenDiv.appendChild(description);
            let createQuiz = document.createElement("BUTTON");
            createQuiz.appendChild(document.createTextNode(Quiz.title));
            
            createQuiz.addEventListener("click", function(){
                article.remove();
                quizLayout(Quiz.QuizID, Quiz.title);
            });
            hiddenDiv.appendChild(createQuiz);
        });
    });
}


topicsLayout();


// go to guiz
//console.log(heading.firstChild);
//quizLayout();