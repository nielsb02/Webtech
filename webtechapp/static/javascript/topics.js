
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
            let createQuiz = document.createElement("BUTTON");
            createQuiz.appendChild(document.createTextNode(Quiz.linkDescription));
            createQuiz.addEventListener("click", function(){
                article.remove();
                quizLayout(Quiz.QuizID);
            });
            hiddenDiv.appendChild(createQuiz);
        });
    });
}

function getFromDB(url, callback){  //AJAX function
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            var obj = JSON.parse(req.responseText);
            callback(obj);
        }
    }
    req.send();
}

topicsLayout();


// go to guiz
//console.log(heading.firstChild);
//quizLayout();