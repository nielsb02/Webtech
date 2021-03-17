//creating the heading
var article = document.getElementsByTagName("ARTICLE")[0];
var heading = document.createElement("H1");
var headingText = document.createTextNode("Questions");
heading.setAttribute("class", "first_heading");
heading.appendChild(headingText);
article.appendChild(heading);

//declaration of the global variables and arrays
var section;
choiceSpan = [];
var strong;  
var n = 0;
const imgArray = ["Resources/Afbeelding.png", "Resources/list.png"];
const titleArray = ["Question 1: Where does the feature 'Voice Recognition' belong to?",
 "Question 2: Where does the feature 'Colors with Good Contrast' belong to?",
 "Question 3: To which main reason does this sentence belong to?",
 "Question 4: What element should replace the dots?",
 "Question 5: What element should replace the dots?"];
const answerArray = ["Physical Disability", "Visual Disability","Commercial reasons","ul", "aside"];
const optionsArray = [["Visual Disability","Hearing Disability","Cognitive Disability","Physical Disability"],
["Visual Disability","Hearing Disability","Cognitive Disability","Physical Disability"],
["Ethical reasons","Reputational reasons","Legal reasons","Commercial reasons"]];


//this is the superclass of all the questions
class question{
    constructor(qtitle, qanswer)
    {
        this.title = qtitle;
        this.answer = qanswer;
    }
}

//this is a subclass of questions
class multiplechoice extends question{
    constructor(qtitle, answer, options){
    super(qtitle, answer);
    this.options = options;
    }
}

//this functions creates the radiobuttons for the multiplechoice questions
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

//this function replaces all the options for every question
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

//this functions deletes all the options from the multiplechoice questions
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

//this is a subclass of questions
class fillin extends question{
    constructor(qtitle, answer, src, imgclass, placeholder){
        super(qtitle, answer);
        this.src = src;
        this.class = imgclass;
        this.placeholder = placeholder;
    }
}

//this function creates a textbox for fill in the blank questions
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

//this function changes the textboxes of the questions
fillin.prototype.changeTextbox = function()
{
    var titleNode = document.createTextNode(this.title);
    strong.replaceChild(titleNode, strong.firstChild);
    var img = document.getElementsByTagName("IMG")[1];
    img.setAttribute("src",this.src);
    img.setAttribute("class",this.class);
}

//this function deletes textboxes
fillin.prototype.deleteTextbox = function()
{
    strong.removeChild(strong.childNodes[0]);
    section.removeChild(section.childNodes[1]);
    section.removeChild(section.childNodes[1]);
}

//this function creates the layout of the section
function layout()
{
    section = document.createElement("SECTION");
    article.appendChild(section);
    section.setAttribute("class", "question");
    var paragraph = document.createElement("p");
    section.appendChild(paragraph);
    strong = document.createElement("STRONG");
    paragraph.appendChild(strong);

    //the questions are created as objects
    question1 = new multiplechoice(titleArray[0], answerArray[0], optionsArray[0]);
    question2 = new multiplechoice(titleArray[1], answerArray[1], optionsArray[1]);
    question3 = new multiplechoice(titleArray[2], answerArray[2], optionsArray[2]);
    question4 = new fillin(titleArray[3], answerArray[3], imgArray[0], "layoutquestion", "Example: header");
    question5 = new fillin(titleArray[4], answerArray[4], imgArray[1], "elementquestion", "Example: header");
    questions = [question1, question2, question3, question4, question5];
    question1.createOptions();

    //the check, previous and next buttons are created here
    let inputA = document.createElement("INPUT");
    inputA.addEventListener("click", check, false);
    inputA.setAttribute("type", "button");
    inputA.setAttribute("value", "check");
    inputA.setAttribute("class", "qbutton--disabled");
    inputA.setAttribute("id","check");

    let inputB = document.createElement("INPUT");
    inputB.addEventListener("click", previous, false);
    inputB.setAttribute("type", "button");
    inputB.setAttribute("value", "previous");
    inputB.setAttribute("class", "qbutton--disabled");
    inputB.setAttribute("id","previous");

    let inputC = document.createElement("INPUT");
    inputC.addEventListener("click", next, false);
    inputC.setAttribute("type", "button");
    inputC.setAttribute("value", "next");
    inputC.setAttribute("class", "qbutton--enabled");
    inputC.setAttribute("id","next");

    section.appendChild(inputA);
    section.appendChild(inputB);
    section.appendChild(inputC);
}

//the function above is called here
layout();

//this function styles the Css for the enabled check button
function checkEnabled()
{
    let checkCss = document.getElementById("check");
    checkCss.setAttribute("class","qbutton--enabled");
}

//this function styles the Css for the disabled check button
function checkDisabled()
{
    let checkCss = document.getElementById("check");
    checkCss.setAttribute("class","qbutton--disabled");
}

//if the textbox is empty, the checkbutton will be disabled.
function checkDisabledTextbox()
{
    let textboxInput = document.getElementsByClassName("textbox--styling")[0].value;
    if(textboxInput.length == 0)
    {
        let check = document.getElementById("check");
        check.setAttribute("class","qbutton--disabled");
    }
}

//this function resets the radiobuttons
function clearOptionsRadio()
{
    let radioButtons = document.getElementsByName("qoptions");
    for(var i=0 ; i < radioButtons.length ; i++)
    {
        radioButtons[i].checked = false;
    }
}

//this function checks wether the input is correct or incorrect
function check()
{
    if(n<3)
    {
    var selected = document.getElementsByName('qoptions');
    for(var i = 0; i < selected.length; i++)
    {
        if(selected[i].checked)
        {
            var x = selected[i].nextSibling;
            var y = x.nextSibling;
            if(y.childNodes[0].nodeValue == answerArray[n])
            {
                section.setAttribute("class","correct");
            }
            else
            {
                section.setAttribute("class","incorrect");
            }
        }
    }
    }
    if(n>=3)
    {
        var input = document.getElementsByClassName("textbox--styling")[0].value;
        if(n==3 && input == "aside")
        {
            section.setAttribute("class","correct");
        }
        else if(n==4 && input == "ul")
            {
                section.setAttribute("class","correct");
            }
            else
            {
                section.setAttribute("class","incorrect");
            }
    }
}

//this function controls the buttons if the previous button is clicked on
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

//this function controls the buttons if the next button is clicked on
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
