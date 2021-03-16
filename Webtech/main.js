var article = document.getElementsByTagName("ARTICLE")[0];
var section = document.createElement("SECTION");
article.appendChild(section);
var p = document.createElement("p");
var strong = document.createElement("STRONG");
p.appendChild(strong);
section.appendChild(p);
section.setAttribute("class", "question");
var a = ["Where does the feature 'Voice Recognition' belong to?",
 "Where does the feature 'Colors with Good Contrast' belong to?",
 "To which main reason does this sentence belong to?",
 "What element should replace the dots?",
 "What element should replace the dots?"];

class question{
    constructor(a)
    {
        this.title = a;
    }
}
question1 = new question(a[0]);
question2 = new question(a[1]);
question3 = new question(a[2]);
question4 = new question(a[3]);
question5 = new question(a[4]);
questions = [{question1},{question2},{question3},{question4},{question5}];

function whichquestion()
{


    titel(question1.title);

    titel(question2.title);

    titel(question3.title);

    titel(question4.title);

    titel(question5.title);

}

function titel(titel1)
{
    var x = document.createTextNode(titel1);
    strong.appendChild(x);
}
class multiplechoice{}
class fillin{}