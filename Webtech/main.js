var article = document.getElementsByTagName("ARTICLE")[0];
var section = document.createElement("SECTION");
article.appendChild(section);
var p = document.createElement("p");
var strong = document.createElement("STRONG");
p.appendChild(strong);
section.appendChild(p);
section.setAttribute("class", "question");
var n = 0;
const titlearray = ["Where does the feature 'Voice Recognition' belong to?",
 "Where does the feature 'Colors with Good Contrast' belong to?",
 "To which main reason does this sentence belong to?",
 "What element should replace the dots?",
 "What element should replace the dots?"];
const answerarray = ["Physical disability", "Visual Disability","Commercial reasons","ul", "aside"];
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

/*<label>
<input type="radio" name="question1">
<span class="design"></span>
<span>Visual Disability</span>
</label>*/

class multiplechoice extends question{
    constructor(title, answer, options){
    super(title, answer);
    this.options = options;
    this.label = document.createElement("LABEL");
    this.input = document.createElement("INPUT");
    this.spanCss = document.createElement("SPAN");
    this.spanText = document.createElement("SPAN");
    let e = document.createTextNode(options[0]);
    let f = document.createTextNode(options[1]);
    let g = document.createTextNode(options[2]);
    let h = document.createTextNode(options[3]);
    this.input.setAttribute("type", "radio");
    this.input.setAttribute("name", "qoptions");
    this.spanCss.setAttribute("class", "design");
    d.appendChild(e);
    a.appendChild(b);
    a.appendChild(c);
    a.appendChild(d);
    section.appendChild(a);
    let x = a.cloneNode(true);
    let y = x.getElementsByTagName("SPAN")[1];
    let z = y.childNodes[0];
    y.replaceChild(f, z);
    section.appendChild(x);
    let o = a.cloneNode(true);
    let p = o.getElementsByTagName("SPAN")[1];
    let l = p.childNodes[0];
    p.replaceChild(g, l);
    section.appendChild(o);
    let om = a.cloneNode(true);
    let pm = om.getElementsByTagName("SPAN")[1];
    let lm = pm.childNodes[0];
    pm.replaceChild(h, lm);
    section.appendChild(om);

  /*  d.replaceChild(g);
    section.appendChild(a);
    d.replaceChild(h);
    section.appendChild(a);*/
    }

}

multiplechoice.prototype.CreateOptions = function()
{

}


class fillin extends question{
    constructor(a){
        
        super()}

}
question1 = new multiplechoice(titlearray[0], answerarray[0], optionsarray[0]);
//question2 = new multiplechoice(titlearray[1], answerarray[1], optionsarray[1]);
//question3 = new multiplechoice(titlearray[2], answerarray[2], optionsarray[2]);
/*question4 = new fillin(a[3], z[3]);
question5 = new fillin(a[4], z[4]);
questions = [{question1},{question2},{question3},{question4},{question5}];*/

titel(question2.title);

function whichquestion()
{
    
    titel(questions[n].title);

}

function titel(titel1)
{
    var x = document.createTextNode(titel1);
    strong.appendChild(x);

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



