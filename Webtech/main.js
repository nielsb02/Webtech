var article = document.getElementsByTagName("ARTICLE")[0];
var section;

choiceSpan = [];

var strong;  

var n = 0;
const imgArray = ["Resources/Afbeelding.png", "Resources/list.png"];
const titlearray = ["Where does the feature 'Voice Recognition' belong to?",
 "Where does the feature 'Colors with Good Contrast' belong to?",
 "To which main reason does this sentence belong to?",
 "What element should replace the dots?",
 "What element should replace the dots?"];
const answerarray = ["Physical Disability", "Visual Disability","Commercial reasons","ul", "aside"];
const optionsarray = [["Visual Disability","Hearing Disability","Cognitive Disability","Physical Disability"],
["Visual Disability","Hearing Disability","Cognitive Disability","Physical Disability"],
["Ethical reasons","Reputational reasons","Legal reasons","Commercial reasons"]];



class question{
    constructor(qtitle, qanswer)
    {
        this.title = qtitle;
        this.answer = qanswer;
    }
}


class multiplechoice extends question{
    constructor(qtitle, answer, options){
    super(qtitle, answer);
    this.options = options;
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
    constructor(qtitle, answer, src){
        super(qtitle, answer);
        this.src = src;
    }
}

fillin.prototype.createTextbox = function()
{

    var x = document.createTextNode(this.title);
    strong.appendChild(x);
    var img = document.createElement("IMG");
    img.setAttribute("src",this.src);
    section.appendChild(img);
    var textbox = document.createElement("INPUT");
    textbox.setAttribute("type","text");
    var br = document.createElement("BR");
    textbox.setAttribute("class","textbox--styling");
    section.appendChild(textbox);
}

fillin.prototype.changeTextbox = function()
{
    var titleNode = document.createTextNode(this.title);
    strong.replaceChild(titleNode, strong.firstChild);
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
    question2 = new multiplechoice(titlearray[1], answerarray[1], optionsarray[1]);
    question3 = new multiplechoice(titlearray[2], answerarray[2], optionsarray[2]);
    question4 = new fillin(titlearray[3], answerarray[3], imgArray[0]);
    question5 = new fillin(titlearray[4], answerarray[4], imgArray[1]);
    questions = [question1, question2, question3, question4, question5];
    question1.createOptions();

    let a = document.createElement("INPUT");
    a.addEventListener("click", check, false);
    a.setAttribute("type", "button");
    a.setAttribute("value", "check");
    a.setAttribute("class", "qbutton1");

    let b = document.createElement("INPUT");
    b.addEventListener("click", previous, false);
    b.setAttribute("type", "button");
    b.setAttribute("value", "previous");
    b.setAttribute("class", "qbutton2");

    let c = document.createElement("INPUT");
    c.addEventListener("click", next, false);
    c.setAttribute("type", "button");
    c.setAttribute("value", "next");
    c.setAttribute("class", "qbutton3");

    section.appendChild(a);
    section.appendChild(b);
    section.appendChild(c);
}

layout();

function check()
{
    
    var selected = document.getElementsByName('qoptions');
    for(var i = 0; i < selected.length; i++)
    {
        if(selected[i].checked)
        {
            var x = selected[i].nextSibling;
            var y = x.nextSibling;
            if(y.childNodes[0].nodeValue == answerarray[n])
            {
                section.setAttribute("class","correct");
                window.alert("goeie saus");
            }
            else
            {
                section.setAttribute("class","incorrect");
            }
            
        }
    }
   

}

function previous()
{
    
    switch(true)
    {
        case n == 0:
            break;
        case n <= 3:
            n--;
            var l = questions[n];
            l.changeOptions();
            section.setAttribute("class", "question");
            break;
    }
}

function next()
{
    switch(true)
    {
        case n == 4:
            break;
        case n < 2:
            n++;
            var k = questions[n];
            k.changeOptions();
            section.setAttribute("class", "question");
            break;
        case n >= 2:
            break;
    }
}


