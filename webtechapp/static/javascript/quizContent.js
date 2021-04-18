//Declaration of the global variables and arrays.
var section, activeQuestion, strong, quiz, loggedIn; 
var questions, n, progressBarCounter;

//The superclass of all the questions.
class question{
    constructor(qid, qtype, qtitle, qproblem, qQuote, qimage)
    {
        this.id = qid;
        this.type = qtype;
        this.title = qtitle;
        this.problem = qproblem;
        this.quote = qQuote;
        this.image = qimage.img;
        this.imageClass = qimage.class;
        this.guess = {answer: null, correct: null};
    }
}
question.prototype.create = function(){};
question.prototype.delete = function(){};

//A subclass of questions.
class multiplechoice extends question{
    constructor(qid, qtype, qtitle, qproblem ,qQuote, qimage, qoptions){
    super(qid, qtype, qtitle, qproblem ,qQuote, qimage);
    this.options = qoptions;
    }
}

//A subclass of questions.
class fillin extends question{
    constructor(qid, qtype, qtitle, qproblem, qQuote, qimage, qplaceholder){
        super(qid, qtype, qtitle, qproblem, qQuote, qimage);
        this.placeholder = qplaceholder;
    }
}

//This function creates the content for the multiplechoice questions.
multiplechoice.prototype.create = function()
{
    if(loggedIn)
    {
     document.getElementById("retry").setAttribute("class", "qbutton--enabled");
    }

    heading.replaceChild(document.createTextNode(this.title), heading.firstChild);
    var x = document.createTextNode(this.problem);
    strong.appendChild(x);
    var radioDiv = document.createElement("DIV");
    radioDiv.setAttribute("class", "radioBlock");
    var divider = document.getElementById("questionDivider");
    section.insertBefore(radioDiv, divider);
    document.getElementById("check").setAttribute("class", "qbutton--disabled");


    let url = "./getUserAnswer.js?userID="+2+"&questionID="+this.id;
    var await = new Promise((resolve, reject) => 
    {
        getFromDB(url, function(obj){
            resolve(obj.dbData); 
        });
    });

    
    await.then((userAnswerArray) => {
        
        for(var i = 0; i < this.options.length; i++)
        {
            var input = document.createElement("INPUT");
            input.setAttribute("type", "radio");
            input.setAttribute("name", "qoptions");
            input.setAttribute("id", i );
            if(loggedIn)
            {
                if(!userAnswerArray[0])
                {
                    input.disabled = false;
                    input.checked = false;
                }
                else if(userAnswerArray[0].OptionID === this.options[i].OptionID)
                {
                    
                    if(userAnswerArray[0].Is_correct)
                    {
                        
                        section.setAttribute("class", "correct");
                    }
                    else
                    {
                        
                        section.setAttribute("class", "incorrect");
                    }
                    input.disabled = true;
                    input.checked = true;
                }
                else
                {
                    input.disabled = true;
                    input.checked = false;
                }
            }
            else
            {
                input.disabled = true;
            }
            let label = document.createElement("LABEL");
            label.setAttribute("for", i);
            label.appendChild(document.createTextNode(this.options[i].option));
            label.addEventListener("click", checkEnabled, false);
            
            radioDiv.appendChild(input);
            radioDiv.appendChild(label);
        }
        if(this.quote != null)
        {
            let quote = document.createElement("P");
            quote.setAttribute("id", "quote");
            let em = document.createElement("EM");
            em.appendChild(document.createTextNode(this.quote));
            quote.appendChild(em);
            section.insertBefore(quote, radioDiv);
        }

        if(this.image != null)
        {
            var img = document.createElement("IMG");
            img.setAttribute("src", this.image);
            img.setAttribute("class", this.imageClass);
            section.insertBefore(img, radioDiv);
        }
        
            
            var check;
            var sectionLink = document.getElementsByTagName("section")[0];
            var removeLink = sectionLink.getElementsByTagName("a")[0];
            if(!removeLink){
                let inputE = document.createElement("A");
                inputE.setAttribute("class", "hiddenLink");
                let image = document.createElement("IMG");
                image.setAttribute("src", "resources/information.png");
                inputE.appendChild(image);
                section.appendChild(inputE);
            }
            if(userAnswerArray)
            {
                check = false;
                for(var i = 0; i < userAnswerArray.length; i++)
                {
                    if(userAnswerArray[i].Is_correct == true)
                    {
                    }
                    else
                    {
                        check = true;
                    }
                }
                if(check)
                {
                    console.log("useranswerarray 3:", check);
                    link();
                }
            }
       
    });          
};

//This function deletes the content of the multiplechoice questions.
multiplechoice.prototype.delete = function()
{
    strong.removeChild(strong.childNodes[0]);
    var radioDiv = section.getElementsByClassName("radioBlock")[0];
    radioDiv.remove();
    var sectionLink = document.getElementsByTagName("section")[0];
    var removeLink = sectionLink.getElementsByTagName("a")[0];
    removeLink.remove();
    
    var quote = document.getElementById("quote");
    if(quote)
    {
        quote.remove();
    }

    var img = section.getElementsByTagName("IMG")[0];
    if(img)
    {
        img.remove();
    }
};

//This function creates the content for fill-in-the-blank questions.
fillin.prototype.create = function()
{
    if(loggedIn)
    {
     document.getElementById("retry").setAttribute("class", "qbutton--enabled");
    }
    heading.replaceChild(document.createTextNode(this.title), heading.firstChild);

    var x = document.createTextNode(this.problem);
    strong.appendChild(x);
    document.getElementById("check").setAttribute("class", "qbutton--disabled");

    var textBox = document.createElement("INPUT");
    textBox.setAttribute("type","text");
   
    if(loggedIn)
    {
        textBox.setAttribute("disabled", "false");
    }
  

    var await = new Promise((resolve, reject) => 
    {
        let url = "/getFillUserAnswer.js?userID="+2+"&questionID="+this.id;
        getFromDB(url, function(obj){
            resolve(obj.dbData); 
        });
    });

    await.then((userAnswer) => {
        if(userAnswer[0])
        {
            textBox.setAttribute("value", userAnswer[0].Option.toString());
            textBox.disabled = true;
            if(userAnswer[0].OptionID !== null)
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
            textBox.setAttribute("value", "");
            textBox.disabled = false;
        }
        
        textBox.setAttribute("class","textbox--styling");
        textBox.setAttribute("placeholder",this.placeholder);
        textBox.setAttribute("disabled", "true");
        textBox.addEventListener("input", checkEnabled, false);
        textBox.addEventListener("change", checkDisabledTextbox, false);

        var divider = document.getElementById("questionDivider");
        section.insertBefore(textBox, divider);

        if(this.quote != null)
        {
            let quote = document.createElement("P");
            quote.setAttribute("id", "quote");
            let em = document.createElement("EM");
            em.appendChild(document.createElement(this.quote));
            quote.appendChild(em);
            section.insertBefore(quote, textBox);
        }
        if(this.image != null)
        {
            var img = document.createElement("IMG");
            img.setAttribute("src",this.image);
            img.setAttribute("class",this.imageClass);
            section.insertBefore(img, textBox);
        }
    });
};

//This function deletes the content of the fill-in-the-blank questions.
fillin.prototype.delete = function()
{
    document.getElementsByClassName("textbox--styling")[0].remove();
    strong.removeChild(strong.childNodes[0]);

    var quote = document.getElementById("quote");
    if(quote)
    {
        quote.remove();
    }

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

    let url = "./getUserAnswer.js?userID="+2+"&questionID="+questionButton.id;
    getFromDB(url, function(obj){
        if(obj.dbData[0])
        {
            if(obj.dbData[0].Is_correct)
            {
                button.classList.add("questionButton--correct");
            }
            else
            {
                button.classList.add("questionButton--false");
            }
        }
    });

}

//This function creates the layout of the section.
function quizLayout(quizID, quizTitle)
{
    // get quiz out of database by quiz id
    questions = []; 
    n = 0;
    progressBarCounter = 0;
    quiz = quizID;
    logedIn = false;
    let url = "getQuestion.js?quizID=" + quizID;
    getFromDB(url, function(obj){
        let questionArray = obj.dbData;        
        
        var await = new Promise((resolve, reject) => {
            questionArray.forEach((quest, index, array) => { 
                var q;
                if(quest.Type == "mcq")
                {
                    q = new multiplechoice(quest.QuestionID, quest.Type, quizTitle, "question " + (index + 1) + ": " + quest.Question, quest.Quote, {img: null, class: null}, null);
                    questions.push(q);

                    let url = "getOptions.js?questionID=" + quest.QuestionID;
                    getFromDB(url, function(obj){
                        let optionArray = obj.dbData;
                        q.options = optionArray;
            
            
                        if (index === array.length -1) 
                            resolve();
                    });
            
                    
                }
                else if (quest.Type == "fillin")
                {
                    q = new fillin(quest.QuestionID, quest.Type, quizTitle, "question " + (index + 1) + ": " + quest.Question, quest.Quote, {img: null, class: null}, " ");
                    questions.push(q);
                    
                    if (index === array.length -1) 
                        resolve();
                }

                if(q)
                {
                    if(quest.Source !== null)
                    {
                        q.image = "Resources/" + quest.Source;
                        var img = new Image();
                        // 2/1 height pixel verhouding
                        img.onload = function() {

                            if(this.height / this.width > 0.65)
                            {
                                q.imageClass = "quiz-image--smaller";
                            }
                            else
                            {
                                q.imageClass = "quiz-image--wide";
                            }
                        }
                        img.src = "Resources/" + quest.Source;
                    }
                    if(quest.Quote !== null)
                    {
                        q.quote = quest.Quote;
                    }
                }
            });
        });
        
        await.then(() => {
            activeQuestion = questions[0];
            
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
        });
    });

    section = document.createElement("SECTION");
    let article = document.createElement("ARTICLE")
    article.appendChild(section);
    let body = document.getElementsByTagName("BODY")[0];
    body.insertBefore(article, document.getElementsByTagName("FOOTER")[0]);

    section.setAttribute("class", "question");
    let paragraph = document.createElement("p");
    paragraph.setAttribute("class", "question_problem")
    section.appendChild(paragraph);
    strong = document.createElement("STRONG");
    paragraph.appendChild(strong);
    
    let hr = document.createElement("HR");
    hr.setAttribute("id", "questionDivider");
    section.appendChild(hr);

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

    let inputD = document.createElement("INPUT");
    inputD.addEventListener("click", retry, false);
    inputD.setAttribute("type", "button");
    inputD.setAttribute("value", "retry");
    inputD.setAttribute("class", "qbutton--disabled");
    inputD.setAttribute("id","retry");

    section.appendChild(inputA);
    section.appendChild(inputB);
    section.appendChild(inputC);
    section.appendChild(inputD);
    
    
    section.appendChild(document.createElement("HR"));
}

//The function above is called here.

function calculateResult(bar)
{
    let url = "/getQuizResults?userID="+2+"&quizID="+quiz;
    getFromDB(url, function(obj){
        var count = {correct : 0.0, incorrect: 0.0, unanswered: 0.0};
        var questionArray = obj.dbData;
        for(let index = 0; index <questions.length; index++){
            if(questionArray[index])
            {
                if (questionArray[index].Is_correct === 1)
                {
                    count.correct++;
                }
                else if (questionArray[index].Is_correct === 0)
                {
                    count.incorrect++;
                }
            }
            else
            {
                count.unanswered++;
            }
        };
        let result = [count.correct, count.incorrect, count.unanswered];
        resultBar(bar, result, heading, false);
    });
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

        function frame() 
        {
            if (width >= result -1) 
            {
                bar.style.width = result + "%";
                if(result != 0)
                    bar.innerHTML = result.toString() + "%";
                else
                    bar.innerHTML = "";
                    
                
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

    let bar = [resultCorrect, resultIncorrect, resultUnanswered];
    let result = calculateResult(bar);

    var paragraph = document.createElement("P");

    section.appendChild(paragraph);
}

//This function styles the Css for the enabled check button.
function checkEnabled()
{
    if(loggedIn)
    {
        let url = "./getUserAnswer.js?userID="+2+"&questionID="+activeQuestion.id;
        getFromDB(url, function(obj){
        var userAnswerArray = obj.dbData;
        if(!userAnswerArray[0])
        {
            let checkCss = document.getElementById("check");
            checkCss.setAttribute("class","qbutton--enabled");
        }});
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
function link()
{
    let url = "getActiveQuiz.js?quizID=" + quiz;
     getFromDB(url, function(obj){
        let activeQuizArray = obj.dbData;
        var sectionLink = document.getElementsByTagName("section")[0];
        var removeLink=sectionLink.getElementsByTagName("a")[0];
        //let removeLink = document.getElementsByClassName("hiddenLink")[0];
        removeLink.setAttribute("href", activeQuizArray[0].linkDescription);
        removeLink.setAttribute("class", "showLink");
            });
}
//This function checks whether the input is correct or incorrect.
function check()
{   
    if(loggedIn)
    {
        var correctQuestion = null; 
        var notBlank = false;
        let url = "checkUserAnswered.js?userID="+ 2 +"&questionID="+activeQuestion.id;
        var await = new Promise((resolve, reject) => { 
                getFromDB(url, function(obj){
                if(obj.dbData[0].bool == 1) //already answered...
                {
                    resolve(true);
                }
                else
                {                
                    resolve(false);
                }
            })
        });

        await.then((bool) => {
            if(bool)
            {
                return;
            }
            let url = "getAnswer.js?questionID=" + activeQuestion.id;
            getFromDB(url, function(obj)
            {
                var optionArray = obj.dbData;
                var selectedoption = {id: null, option: " "};
                var answer;

                if(optionArray[0].option)
                {
                    answer = optionArray[0].option;
                }
                else
                {
                    answer = null;
                    
                }
            

                if(activeQuestion instanceof multiplechoice)
                {
                    var radioDiv = document.getElementsByClassName("radioBlock")[0];
                    var selected = radioDiv.getElementsByTagName("INPUT"); 

                    for(var i = 0; i < selected.length; i++)
                    {
                        selected[i].disabled = true;
                        if(selected[i].checked)
                        {
                            selectedoption.id = activeQuestion.options[i].OptionID; 
                            selectedoption.option = selected[i].nextSibling.childNodes[0].nodeValue;
                            notBlank = true;
                            if(selected[i].nextSibling.childNodes[0].nodeValue == answer)
                            {
                                section.setAttribute("class","correct");
                                correctQuestion = true;
                            }
                            else
                            {
                                section.setAttribute("class","incorrect");
                                correctQuestion = false;
                                link();
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
                    selectedoption.option = input;
                    if(answer == input)
                    {
                        selectedoption.id = optionArray[0].OptionID;
                        section.setAttribute("class","correct");
                        correctQuestion = true;
                    }
                    else if(!input)
                    {
                        correctQuestion = null;
                    }
                    else
                    {
                        section.setAttribute("class","incorrect");
                        correctQuestion = false;
                    } 
                }

                if(notBlank)
                {
                    document.getElementById("check").setAttribute("class", "qbutton--disabled");

                    var index = questions.indexOf(activeQuestion);
                    var numberedButtons = document.getElementById("numberedButtons");

                    let url = "/storeUserAnswer.js";
                    sendToDB(url, {userID: 2, QuestionID: activeQuestion.id, optionID: selectedoption.id, option: selectedoption.option});

                    if(correctQuestion)
                    {
                        numberedButtons.childNodes[index].classList.add("questionButton--correct");
                    }
                    else if(!correctQuestion && correctQuestion !== null)
                    {
                        numberedButtons.childNodes[index].classList.add("questionButton--false");
                    }
                }
            });
        });
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
        previousCss.setAttribute("class","qbutton--disabled");
    }
    else if(newIndex === questions.length - 1)
    {
        previousCss.setAttribute("class","qbutton--enabled");
        if(loggedIn)
        {
            nextCss.value = "end quiz";
        }
    }
    else
    {
        previousCss.setAttribute("class","qbutton--enabled");
        nextCss.setAttribute("class","qbutton--enabled");
    }

    
    questions[index].delete();
    activeQuestion.create();

    if(activeQuestion.guess.correct !== null && loggedIn)
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
function retry()
{
    if(loggedIn)
    {
    let url = "/clearAnswer.js";
    sendToDB(url, {userID: 2, QuestionID: activeQuestion.id});
    activeQuestion.delete();
    setTimeout(function cb(){
        activeQuestion.create();
        var sectionclass = document.getElementsByTagName("section")[0];
        sectionclass.setAttribute("class", "question");
        numberedButtons.childNodes[questions.indexOf(activeQuestion)].classList.remove("questionButton--correct");
        numberedButtons.childNodes[questions.indexOf(activeQuestion)].classList.remove("questionButton--false");
    }, 50);
    
    
setTimeout(function cb(){
    if(activeQuestion.type.toString() == "mcq")
    {
        var radioDiv = document.getElementsByClassName("radioBlock")[0];
        let selected = radioDiv.getElementsByTagName("INPUT");
        for(var i = 0; i < selected.length; i++)
        {
          selected[i].checked = false;
          selected[i].disabled = false;
        }
    }

    else
    {
        var questionbox = document.getElementsByClassName("textbox--styling")[0];
        questionbox.disabled = false;
        questionbox.value = "";
    }
        
    section.setAttribute("class", "question");
}, 100);
    }
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

        if(index >= questions.length-1)
        { 
            let art = document.getElementsByTagName("ARTICLE")[0];
            art.remove();
            questions = [];
            let aside = document.getElementsByTagName("ASIDE")[0];
            let body = document.getElementsByTagName("BODY")[0];
            article = body.insertBefore(document.createElement("ARTICLE"), aside);
            topicsLayout();
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
