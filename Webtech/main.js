var article = document.getElementsByTagName("ARTICLE")[0];
var section;

choiceSpan = [];

var strong;  

var n = 0;
const titlearray = ["Where does the feature 'Voice Recognition' belong to?",
 "Where does the feature 'Colors with Good Contrast' belong to?",
 "To which main reason does this sentence belong to?",
 "What element should replace the dots?",
 "What element should replace the dots?"];
const answerarray = ["Physical disability", "Visual Disability","Commercial reasons","ul", "aside"];
const optionsarray = [["Visual Disability","Hearing Disability","Cognitive Disability","Physical Disability"],
["Visual Disability","Hearing Disability","Cognitive Disability","a"],
["Ethical reasons","Reputational reasons","Legal reasons","Commercial reasons"]];



class question{
    constructor(qtitle, qanswer)
    {
        this.title = qtitle;
        this.answer = qanswer;
    }
}

/*<label>
<input type="radio" name="question1">
<span class="design"></span>
<span>Visual Disability</span>
</label>*/

class multiplechoice extends question{
    constructor(qtitle, answer, optionss){
    super(qtitle, answer);
    this.options = optionss;
    }
}

multiplechoice.prototype.createOptions = function()
{
    var x = document.createTextNode(this.title);
    strong.appendChild(x);

    for(var i = 0; i < this.options.length; i++)
    {
        var label = document.createElement("LABEL");
        var input = document.createElement("INPUT");
        var spanCss = document.createElement("SPAN");
        choiceSpan[i] = document.createElement("SPAN");
        input.setAttribute("type", "radio");
        input.setAttribute("name", "qoptions");
        spanCss.setAttribute("class", "design");

        choiceSpan[i].appendChild(document.createTextNode(this.options[i]));

        label.appendChild(input);
        label.appendChild(spanCss);
        label.appendChild(choiceSpan[i]);

        section.appendChild(label);
    }
}

multiplechoice.prototype.changeOptions = function()
{
    var titleNode = document.createTextNode(this.title);
    strong.replaceChild(titleNode, strong.firstChild)
    for(var i = 0; i < this.options.length; i++)
    {
        var text = document.createTextNode(this.options[i]);
        choiceSpan[i].replaceChild(text, choiceSpan[i].firstChild);
    }
}


class fillin extends question{
    constructor(a){
        super()}
}



function layout()
{
    section = document.createElement("SECTION");
    article.appendChild(section);
    section.setAttribute("class", "question");

    var p = document.createElement("p");
    section.appendChild(p);

    strong = document.createElement("STRONG");
    p.appendChild(strong);
    

    question1 = new multiplechoice(titlearray[0], answerarray[0], optionsarray[0]);
    question1.createOptions();

    let a = document.createElement("INPUT");
    a.setAttribute("type", "button");
    a.setAttribute("value", "check");
    a.setAttribute("class", "qbutton1");

    let b = document.createElement("INPUT");
    b.setAttribute("type", "button");
    b.setAttribute("value", "previous");
    b.setAttribute("class", "qbutton2");

    let c = document.createElement("INPUT");
    c.setAttribute("type", "button");
    c.setAttribute("value", "next");
    c.setAttribute("class", "qbutton3");

    section.appendChild(a);
    section.appendChild(b);
    section.appendChild(c);
}

layout();


question2 = new multiplechoice(titlearray[1], answerarray[1], optionsarray[1]);
//question2.changeOptions();
question3 = new multiplechoice(titlearray[2], answerarray[2], optionsarray[2]);
question3.changeOptions();
/*question4 = new fillin(a[3], z[3]);
question5 = new fillin(a[4], z[4]);
questions = [{question1},{question2},{question3},{question4},{question5}];*/
function whichquestion()
{
    titel(questions[n].title);
}




