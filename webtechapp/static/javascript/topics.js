
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
    getTopics(url);
}

function createTopic(topic){
    let topicSection = document.createElement("SECTION");
    article.appendChild(topicSection);
    topicSection.setAttribute("class", "question");
    let subHeading = document.createElement("H2");
    topicSection.appendChild(subHeading);

    subHeading.appendChild(document.createTextNode("Topic " + topic.tid + " " + topic.Title));


    let createQuiz = document.createElement("BUTTON");
    createQuiz.addEventListener("click", function(){
        topicSection.remove(); //Should remove more than one topicSection...
        quizLayout();
    });
    topicSection.appendChild(createQuiz);
}

function getTopics(url){  //AJAX function
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            var jsonObj = JSON.parse(req.responseText);
            let topicArray = jsonObj.dbData;
            topicArray.forEach(Topic => {
               createTopic(Topic);
            });
        }
    }
    req.send();
}

topicsLayout();


// go to guiz
//console.log(heading.firstChild);
//quizLayout();