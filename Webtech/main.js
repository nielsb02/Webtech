var article = document.getElementsByTagName("ARTICLE")[0];
var section;

choiceSpan = [];

var strong;  

var n = 0;
const imgArray = ["Resources/Afbeelding.png", "Resources/list.png"];
const titlearray = ["Question 1: Where does the feature 'Voice Recognition' belong to?",
 "Question 2: Where does the feature 'Colors with Good Contrast' belong to?",
 "Question 3: To which main reason does this sentence belong to?",
 "Question 4: What element should replace the dots?",
 "Question 5: What element should replace the dots?"];
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
    var button = document.getElementById("check");

    for(var i = 0; i < this.options.length; i++)
    {
        var label = document.createElement("LABEL");
        var input = document.createElement("INPUT");
        var spanCss = document.createElement("SPAN");
        choiceSpan[i] = document.createElement("SPAN");
        input.setAttribute("type", "radio");
        input.setAttribute("name", "qoptions");
        spanCss.setAttribute("class", "design");
        label.addEventListener("click", checkEnabled, false);

        choiceSpan[i].appendChild(document.createTextNode(this.options[i]));

        label.appendChild(input);
        label.appendChild(spanCss);
        label.appendChild(choiceSpan[i]);
        section.insertBefore(label, button);
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

multiplechoice.prototype.deleteOptions = function()
{
    strong.removeChild(strong.childNodes[0]);
    for(var i = section.childNodes.length - 1; i > 0; i--)
    {
        if(section.childNodes[i].nodeName == "LABEL")
        {
            section.removeChild(section.childNodes[i]);
        }
    }
}


class fillin extends question{
    constructor(qtitle, answer, src, imgclass, placeholder){
        super(qtitle, answer);
        this.src = src;
        this.class = imgclass;
        this.placeholder = placeholder;
    }
}

fillin.prototype.createTextbox = function()
{

    var x = document.createTextNode(this.title);
    strong.appendChild(x);
    var textbox = document.createElement("INPUT");
    textbox.setAttribute("type","text");
    textbox.setAttribute("value","");
    textbox.setAttribute("class","textbox--styling");
    textbox.setAttribute("placeholder",this.placeholder);
    textbox.addEventListener("input", checkEnabled, false);
    textbox.addEventListener("change", checkDisabledTextbox, false);
    var button = document.getElementById("check");
    section.insertBefore(textbox, button);
    var img = document.createElement("IMG");
    img.setAttribute("src",this.src);
    img.setAttribute("class",this.class);
    section.insertBefore(img, textbox);
}

fillin.prototype.changeTextbox = function()
{
    var titleNode = document.createTextNode(this.title);
    strong.replaceChild(titleNode, strong.firstChild);
    var img = document.getElementsByTagName("IMG")[1];
    img.setAttribute("src",this.src);
    img.setAttribute("class",this.class);
}

fillin.prototype.deleteTextbox = function()
{
    strong.removeChild(strong.childNodes[0]);
    section.removeChild(section.childNodes[1]);
    section.removeChild(section.childNodes[1]);
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
    question4 = new fillin(titlearray[3], answerarray[3], imgArray[0], "layoutquestion", "Example: header");
    question5 = new fillin(titlearray[4], answerarray[4], imgArray[1], "elementquestion", "Example: header");
    questions = [question1, question2, question3, question4, question5];
    question1.createOptions();

    let a = document.createElement("INPUT");
    a.addEventListener("click", check, false);
    a.setAttribute("type", "button");
    a.setAttribute("value", "check");
    a.setAttribute("class", "qbutton--disabled");
    a.setAttribute("id","check");

    let b = document.createElement("INPUT");
    b.addEventListener("click", previous, false);
    b.setAttribute("type", "button");
    b.setAttribute("value", "previous");
    b.setAttribute("class", "qbutton--disabled");
    b.setAttribute("id","previous");

    let c = document.createElement("INPUT");
    c.addEventListener("click", next, false);
    c.setAttribute("type", "button");
    c.setAttribute("value", "next");
    c.setAttribute("class", "qbutton--enabled");
    c.setAttribute("id","next");

    section.appendChild(a);
    section.appendChild(b);
    section.appendChild(c);
}

layout();

function checkEnabled()
{
    var x = document.getElementById("check");
    x.setAttribute("class","qbutton--enabled");
}

function checkDisabled()
{
    var y = document.getElementById("check");
    y.setAttribute("class","qbutton--disabled");
}

function checkDisabledTextbox()
{
    var x = document.getElementsByClassName("textbox--styling")[0].value;
    if(x.length == 0)
    {
        var y = document.getElementById("check");
        y.setAttribute("class","qbutton--disabled");
    }
}
function clearOptionsRadio()
{
    var x = document.getElementsByName("qoptions");
    for(var i=0 ; i < x.length ; i++)
    {
        x[i].checked = false;
    }
}

function clearTextbox()
{

}

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
        case n < 3:
            if(n == 1)
            {
                var x = document.getElementById("previous");
                x.setAttribute("class","qbutton--disabled");
            }
            n--;
            var l = questions[n];
            l.changeOptions();
            clearOptionsRadio();
            checkDisabled();
            section.setAttribute("class","question");
            break;
        case n == 3:
            var b = questions[n];
            b.deleteTextbox();
            n--;
            var c = questions[n];
            c.createOptions();
            section.setAttribute("class","question");
            break;
        case n > 3:
            if(n == 4)
            {
                var x = document.getElementById("next");
                x.setAttribute("class","qbutton--enabled");
            }
            n--;
            var d = questions[n];
            d.changeTextbox();
            section.setAttribute("class","question");
            var textbox = document.getElementsByClassName("textbox--styling")[0];
            textbox.value = "";
            break;
    }
}

function next()
{
    
    
    switch(true)
    {
        case n < 2:
            if(n == 0)
            {
                var x = document.getElementById("previous");
                x.setAttribute("class","qbutton--enabled");
            }
            n++;
            var k = questions[n];
            k.changeOptions();
            clearOptionsRadio();
            checkDisabled();
            section.setAttribute("class","question");
            break;
        case n == 2:
            var p = questions[n];
            p.deleteOptions();
            n++;
            var s = questions[n];
            s.createTextbox();
            section.setAttribute("class","question");
            break;
        case n > 2:
            if(n == 3)
            {
                var x = document.getElementById("next");
                x.setAttribute("class","qbutton--disabled");
            }
            n++;
            var t = questions[n];
            t.changeTextbox();
            section.setAttribute("class","question");
            var textbox = document.getElementsByClassName("textbox--styling")[0];
            textbox.value = "";
            break;
        case n == 4:
            break;
    }
}
