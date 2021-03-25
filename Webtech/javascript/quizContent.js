//Creation of the heading.
var article = document.getElementsByTagName("ARTICLE")[0];
var heading = document.createElement("H2");
var headingText = document.createTextNode("Questions");
heading.setAttribute("class", "first_heading");
heading.appendChild(headingText);
article.appendChild(heading);

//Declaration of the global variables and arrays.
var section, activeQuestion, strong; 
var choiceSpan = [], questions = []; 
var n = 0, progressBarCounter = 0;


//questionContent = {type: "mpc / fillin", title: "Title of The Quiz", problem: "Actual Question", image: "OPTIONAL, either src/"" ", options: ["ONLY FOR MPC", "1","2","3","4"]};
const imgArray = ["Resources/Afbeelding.png", "Resources/list.png"];
const titleArray = ["Question 1: Where does the feature 'Voice Recognition' belong to?",
 "Question 2: Where does the feature 'Colors with Good Contrast' belong to?",
 "Question 3: To which main reason does this sentence belong to?",
 "Question 4: What element should replace the dots?",
 "Question 5: What element should replace the dots?"];
const answerArray = ["Physical Disability", "Visual Disability","Commercial reasons", "aside","ul"];
const optionsArray = [["Visual Disability","Hearing Disability","Cognitive Disability","Physical Disability"],
["Visual Disability","Hearing Disability","Cognitive Disability","Physical Disability"],
["Ethical reasons","Reputational reasons","Legal reasons","Commercial reasons"]];


//The superclass of all the questions.
class question{
    constructor(qtype, qtitle, qproblem ,qanswer, qimage)
    {
        this.type = qtype;
        this.title = qtitle;
        this.problem = qproblem;
        this.answer = qanswer;
        this.image = qimage.img;
        this.imageClass = qimage.class;
        this.guess = {answer: null, correct: null};
    }
}
question.prototype.create = function(){};
question.prototype.change = function(){};
question.prototype.delete = function(){};

//A subclass of questions.
class multiplechoice extends question{
    constructor(qtype, qtitle, qproblem ,qanswer, qimage, qoptions){
    super(qtype, qtitle, qproblem ,qanswer, qimage);
    this.options = qoptions;
    }
}

//A subclass of questions.
class fillin extends question{
    constructor(qtype, qtitle, qproblem ,qanswer, qimage, qplaceholder){
        super(qtype, qtitle, qproblem ,qanswer, qimage);
        this.placeholder = qplaceholder;
    }
}

//This function creates the content for the multiplechoice questions.
multiplechoice.prototype.create = function()
{
    heading.replaceChild(document.createTextNode(this.title), heading.firstChild);
    var x = document.createTextNode(this.problem);
    strong.appendChild(x);
    var radioDiv = document.createElement("DIV");
    radioDiv.setAttribute("class", "radioBlock");
    var divider = document.getElementById("questionDivider");
    section.insertBefore(radioDiv, divider);

    for(var i = 0; i < this.options.length; i++)
    {
        var input = document.createElement("INPUT");
        input.setAttribute("type", "radio");
        input.setAttribute("name", "qoptions");
        input.setAttribute("id", i );

        

        if(this.guess.answer === null)
        {
            input.disabled = false;
            input.checked = false;
        }
        else if(this.guess.answer.id === input.id)
        {
            input.disabled = true;
            input.checked = true;
        }
        else
        {
            input.disabled = true;
            input.checked = false;
        }

        let label = document.createElement("LABEL");
        label.setAttribute("for", i);
        label.appendChild(document.createTextNode(this.options[i]));
        label.addEventListener("click", checkEnabled, false);
        
        radioDiv.appendChild(input);
        radioDiv.appendChild(label);
    }

    if(this.image != null)
    {
        var img = document.createElement("IMG");
        img.setAttribute("src", this.image);
        img.setAttribute("class", this.imageClass);
        section.insertBefore(img, radioDiv);
    }
};

//This function replaces the content with the content of a new multiplechoice question.
multiplechoice.prototype.change = function()
{
    strong.replaceChild(document.createTextNode(this.problem), strong.firstChild);
    var input = document.getElementsByTagName("INPUT");
    var label = document.getElementsByTagName("LABEL");
    var radioDiv = section.getElementsByClassName("radioBlock")[0];
    document.getElementById("check").setAttribute("class", "qbutton--disabled");

    for(var i = 0; i < this.options.length; i++)
    {
        var text = document.createTextNode(this.options[i]);
        label[i].replaceChild(text, label[i].firstChild);
        if(this.guess.answer === null)
        {
            input[i].disabled = false;
            input[i].checked = false;
        }
        else if(this.guess.answer.id === input[i].id)
        {
            input[i].disabled = true;
            input[i].checked = true;
        }
        else
        {
            input[i].disabled = true;
        }
    }
    if(this.image != null)
    {
        var img = section.getElementsByTagName("IMG")[0];
        if(!img)
        {
            var img = document.createElement("IMG");
            section.insertBefore(img, radioDiv);
        }
        img.setAttribute("src",this.image);
        img.setAttribute("class",this.imageClass);
    }
    else
    {
        var img = section.getElementsByTagName("IMG")[0];
        if(img)
        {
            img.remove();
        }
    }
};

//This function deletes the content of the multiplechoice questions.
multiplechoice.prototype.delete = function()
{
    strong.removeChild(strong.childNodes[0]);
    var radioDiv = section.getElementsByClassName("radioBlock")[0];
    radioDiv.remove();

    var img = section.getElementsByTagName("IMG")[0];
    if(img)
    {
        img.remove();
    }
};

//This function creates the content for fill-in-the-blank questions.
fillin.prototype.create = function()
{
    var x = document.createTextNode(this.problem);
    strong.appendChild(x);
    document.getElementById("check").setAttribute("class", "qbutton--disabled");

    var textBox = document.createElement("INPUT");
    textBox.setAttribute("type","text");

    if(this.guess.answer !== null)
    {
        textBox.setAttribute("value", this.guess.answer);
        textBox.disabled = true;
    }
    else
    {
        textBox.setAttribute("value", "");
        textBox.disabled = false;
    }
    
    textBox.setAttribute("class","textbox--styling");
    textBox.setAttribute("placeholder",this.placeholder);
    textBox.addEventListener("input", checkEnabled, false);
    textBox.addEventListener("change", checkDisabledTextbox, false);

    var divider = document.getElementById("questionDivider");
    section.insertBefore(textBox, divider);

    if(this.image != null)
    {
        var img = document.createElement("IMG");
        img.setAttribute("src",this.image);
        img.setAttribute("class",this.imageClass);
        section.insertBefore(img, textBox);
    }
};

//This function changes the content for the fill-in-the-blank questions.
fillin.prototype.change = function()
{
    var textBox = document.getElementsByClassName("textbox--styling")[0];
    strong.replaceChild(document.createTextNode(this.problem), strong.firstChild);
    document.getElementById("check").setAttribute("class", "qbutton--disabled");

    console.log(this.guess);

    if(this.guess.answer == null)
    { 
        textBox.value = '';
        console.log('has not been answered');
        textBox.setAttribute("placeholder", this.placeholder);
        textBox.disabled = false;
    }
    else
    {
        textBox.value = this.guess.answer;
        textBox.disabled = true;
        if(this.guess.correct)
        {
            textBox.setAttribute("class","textbox--styling");
        }
        else
        {
            textBox.setAttribute("class","textbox--styling");
        }
    }


    if(this.image != null)
    {
        var img = section.getElementsByTagName("IMG")[0];
        if(!img)
        {
            var img = document.createElement("IMG");
            section.insertBefore(img, textBox);
        }
        img.setAttribute("src",this.image);
        img.setAttribute("class",this.imageClass);
    }
    else
    {
        var img = section.getElementsByTagName("IMG")[0];
        if(img)
        {
            img.remove();
        }
    }
};

//This function deletes the content of the fill-in-the-blank questions.
fillin.prototype.delete = function()
{
    document.getElementsByClassName("textbox--styling")[0].remove();
    strong.removeChild(strong.childNodes[0]);

    var img = section.getElementsByTagName("IMG")[0];
    if(img)
    {
        img.remove();
    }
};
function createButton(questionButton, index, div)
{
    var button = document.createElement("INPUT");
    button.setAttribute("type", "button");
    button.setAttribute("value", index + 1);
    if(index !== 0)
    {
        button.setAttribute("class", "questionButton--default");
    }
    else
    {
        button.setAttribute("class", "questionButton--selected");
    }
    button.setAttribute("id", index); 

    div.appendChild(button);
}

//This function creates the layout of the section.
function layout()
{
    section = document.createElement("SECTION");
    article.appendChild(section);
    section.setAttribute("class", "question");
    let paragraph = document.createElement("p");
    paragraph.setAttribute("class", "question_problem")
    section.appendChild(paragraph);
    strong = document.createElement("STRONG");
    paragraph.appendChild(strong);


    //questionContent = {type: "mpc / fillin", title: "Title of The Quiz", problem: "Actual Question", answer: "single value" 
        //image: "OPTIONAL, either src/"" ", options: ["ONLY FOR MPC", "answer","2","3","4"] (must contain answer)};
    //The questions are created as objects.
    var question1 = new multiplechoice("mpc", "General Quiz", titleArray[0], answerArray[0], {img: null, class: null}, optionsArray[0]);
    var question2 = new multiplechoice("mpc", "General Quiz", titleArray[1], answerArray[1], {img: null, class: null}, optionsArray[1]);
    var question3 = new multiplechoice("mpc", "General Quiz", titleArray[2], answerArray[2], {img: null, class: null}, optionsArray[2]);
    var question4 = new fillin("fillin", "General Quiz", titleArray[3], answerArray[3], {img: imgArray[0], class: "layoutquestion"}, "Example: header");
    var question5 = new fillin("fillin", "General Quiz", titleArray[4], answerArray[4], {img: imgArray[1], class: "elementquestion"}, "Example: header");
    var question6 = new fillin("fillin", "General Quiz", titleArray[4], answerArray[4], {img: null, class: null}, "Example: header");
    var question7 = new multiplechoice("fillin", "General Quiz", titleArray[4], answerArray[4], {img: null, class: null}, optionsArray[2]);
    var question8 = new multiplechoice("mpc", "General Quiz", titleArray[0], answerArray[0], {img: imgArray[1], class: "elementquestion"}, optionsArray[0]);
    questions = [question1, question2, question3, question4, question5, question6, question7, question8];
    activeQuestion = questions[0];
    
    let hr = document.createElement("HR");
    hr.setAttribute("id", "questionDivider");
    section.appendChild(hr);

    //The check, previous and next buttons are created here.
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
    
    section.appendChild(document.createElement("HR"));

    var numberedButtonsDiv = document.createElement("DIV");
    numberedButtonsDiv.setAttribute("id","numberedButtons");
    numberedButtonsDiv.addEventListener("click", event => {
        if (event.target.tagName === "INPUT")
            {
                newQuestion(questions.indexOf(activeQuestion), parseInt(event.target.getAttribute("id")));
            }}, false);
    section.appendChild(numberedButtonsDiv);

    questions.forEach((item, index) => createButton(item, index, numberedButtonsDiv));
    
   activeQuestion.create();
}

//The function above is called here.
layout();

function calculateResult()
{
    var count = {correct : 0.0, incorrect: 0.0, unanswered: 0.0};
    questions.forEach(quest => {
        if (quest.guess.correct)
        {
            count.correct++;
        }
        else if (quest.guess.correct == false)
        {
            count.incorrect++;
        }
        else
        {
            count.unanswered++;
        }
    });

    
    return [count.correct, count.incorrect, count.unanswered];
}

function resultBar(barArray, resultArray, heading, lastBar)
{
    var move = true;
    var bar = barArray[0];
    var result = resultArray[0] / questions.length * 100;

    if (move) {
        move = false;

        var width = 0;
        var string = "";
        var bool = false;
        var id = setInterval(frame, 30);
        //bar.innerHTML = width  + "%";

        function frame() 
        {
            if (width >= result -1) 
            {
                bar.style.width = result + "%";
                
                bar.innerHTML = result.toString() + "%";
                clearInterval(id);
                move = true;
                
                if(lastBar)
                {
                    heading.replaceChild(document.createTextNode("Result:"), heading.firstChild);
                }
                
                if(barArray.length > 2)
                {
                    barArray.shift(); 
                    resultArray.shift();
                    resultBar(barArray, resultArray, heading, false);
                }
                else if(barArray.length == 2)
                {
                    barArray.shift(); 
                    resultArray.shift();
                    resultBar(barArray, resultArray, heading, true);
                }
                else
                {
                    return;
                }
            } 
            else
            {
                if (result < 50)
                {
                    width += 0.5;
                    if(bool)
                        bool = false;
                    else
                        bool = true;
                }
                else
                {
                    width++;
                    bool = true;
                }
                
                
                bar.style.width = width + "%";

                if(bool)
                {
                    bar.innerHTML = width  + "%";
                }

                /*
                if(string === "......")
                {
                    string = "";
                }
                else
                {
                string += ".";
                }

                
                let calculating = document.createTextNode("Calculating Result" + string);
                heading.replaceChild(calculating, heading.firstChild);
                */
            }
        }
    }
}

function createResults()
{   
    while (section.lastElementChild) {
        section.removeChild(section.lastElementChild);
    }

    section.setAttribute("class", "question");

    heading = document.createElement("H2");
    heading.setAttribute("class", "result_heading");
    headingText = document.createTextNode("Calculating Result...");
    heading.appendChild(headingText);
    section.appendChild(heading);

    var progressBar = document.createElement("DIV");
    progressBar.setAttribute("class", "progress_bar");
    var resultCorrect = document.createElement("DIV");
    resultCorrect.setAttribute("class", "result_bar correct--percentage");
    var resultIncorrect = document.createElement("DIV");
    resultIncorrect.setAttribute("class", "result_bar incorrect--percentage");
    var resultUnanswered = document.createElement("DIV");
    resultUnanswered.setAttribute("class", "result_bar unanswered--percentage");

    progressBar.appendChild(resultCorrect);
    progressBar.appendChild(resultIncorrect);
    progressBar.appendChild(resultUnanswered);

    section.appendChild(progressBar);

    let result = calculateResult();
    let bar = [resultCorrect, resultIncorrect, resultUnanswered];
    resultBar(bar, result, heading, false);

    var paragraph = document.createElement("P");

    section.appendChild(paragraph);
}

//This function styles the Css for the enabled check button.
function checkEnabled()
{
    if(activeQuestion.guess.answer === null)
    {
        let checkCss = document.getElementById("check");
        checkCss.setAttribute("class","qbutton--enabled");
    }
}

//This function styles the Css for the disabled check button.
function checkDisabled()
{
    let checkCss = document.getElementById("check");
    checkCss.setAttribute("class","qbutton--disabled");
}

//If the textbox is empty, the checkbutton will be disabled.
function checkDisabledTextbox()
{
    let textboxInput = document.getElementsByClassName("textbox--styling")[0].value;
    if(textboxInput.length == 0)
    {
        let check = document.getElementById("check");
        check.setAttribute("class","qbutton--disabled");
    }
}

//This function checks whether the input is correct or incorrect.
function check()
{   
    if(activeQuestion.guess.answer !== null)
    {
        return
    }

    
    var correctQuestion = null; 
    var notBlank = false;

    if(activeQuestion instanceof multiplechoice)
    {
        var radioDiv = document.getElementsByClassName("radioBlock")[0];
        var selected = radioDiv.getElementsByTagName("INPUT");

        for(var i = 0; i < selected.length; i++)
        {
            selected[i].disabled = true;
            if(selected[i].checked)
            {
                notBlank = true;
                activeQuestion.guess.answer = selected[i];
                if(selected[i].nextSibling.childNodes[0].nodeValue == activeQuestion.answer)
                {
                    section.setAttribute("class","correct");
                    correctQuestion = true;
                }
                else
                {
                    section.setAttribute("class","incorrect");
                    correctQuestion = false;
                }
            }
        }
        if(!notBlank)
        {
            for(var i = 0; i < selected.length; i++)
            {
                selected[i].disabled = false;
            }
        }
    }
    else if(activeQuestion instanceof fillin && document.getElementsByClassName("textbox--styling")[0].value !== "")
    {
        notBlank = true;
        document.getElementsByClassName("textbox--styling")[0].disabled = true;

        var input = document.getElementsByClassName("textbox--styling")[0].value;
        if(activeQuestion.answer == input)
        {
            section.setAttribute("class","correct");
            correctQuestion = true;
            activeQuestion.guess.answer = input;
        }
        else if(!input)
        {
            correctQuestion = null;
        }
        else
        {
            section.setAttribute("class","incorrect");
            correctQuestion = false;
            activeQuestion.guess.answer = input;
        }  
    }

    if(notBlank)
    {
        document.getElementById("check").setAttribute("class", "qbutton--disabled");

        var index = questions.indexOf(activeQuestion);
        var numberedButtons = document.getElementById("numberedButtons");

        if(correctQuestion)
        {
            numberedButtons.childNodes[index].classList.add("questionButton--correct");
            activeQuestion.guess.correct = true;
        }
        else if(!correctQuestion && correctQuestion !== null)
        {
            numberedButtons.childNodes[index].classList.add("questionButton--false");
            activeQuestion.guess.correct = false;
        }
    }
    
    
}

//This function controls the actions that need to happen if the previous button is clicked.

function newQuestion(index, newIndex){
    if(index === newIndex)
    {
        return;
    }
    
    activeQuestion = questions[newIndex];
    var previousCss = document.getElementById("previous");
    var nextCss = document.getElementById("next");
    nextCss.value = "next";
    
    if(newIndex === 0)
    {
        console.log("first question");
        previousCss.setAttribute("class","qbutton--disabled");
    }
    else if(newIndex === questions.length - 1)
    {
        previousCss.setAttribute("class","qbutton--enabled");
        nextCss.value = "end quiz";
    }
    else
    {
        previousCss.setAttribute("class","qbutton--enabled");
        nextCss.setAttribute("class","qbutton--enabled");
    }

    if(activeQuestion.constructor.name == questions[index].constructor.name)
    {
        activeQuestion.change();
    }
    else 
    {
        questions[index].delete();
        activeQuestion.create();
    }

    if(activeQuestion.guess.correct !== null)
    {
        if(activeQuestion.guess.correct)
        {
            section.setAttribute("class", "correct");
        }
        else
        {
            section.setAttribute("class", "incorrect");
        }
    }
    else
    {
        section.setAttribute("class", "question");
    }

    var numberedButtons = document.getElementById("numberedButtons");
    numberedButtons.childNodes[index].classList.remove("questionButton--selected");
    numberedButtons.childNodes[index].classList.add("questionButton--default");
    numberedButtons.childNodes[newIndex].classList.remove("questionButton--default");
    numberedButtons.childNodes[newIndex].classList.add("questionButton--selected");
}

function previous()
{
    var index = questions.indexOf(activeQuestion);
    var newIndex

    if(index == 0)
    {
        return
    }
    else
    {    
        newIndex = index - 1;
        newQuestion(index, newIndex);
    }
}

//This function controls the actions that need to happen if the next button is clicked.
function next()
{
    var nextCss = document.getElementById("next");

    if(nextCss.value === "next")
    {
        var index = questions.indexOf(activeQuestion);
        var newIndex;

        if(index >= questions.length)
        { 
            return
        }
        else
        {    
            newIndex = index + 1;
            newQuestion(index, newIndex);
        }
    }
    else if(nextCss.value === "end quiz")
    {
        activeQuestion.delete();
        createResults();
    }
}
