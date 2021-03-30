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
    let section = document.createElement("SECTION");
    article.appendChild(section);
    section.setAttribute("class", "question");
    let subHeading = document.createElement("H2");
    section.appendChild(subHeading);

    subHeading.appendChild(document.createTextNode("Topic 1"));

    

    
}

topicsLayout();


// go to guiz
//console.log(heading.firstChild);
//quizLayout();