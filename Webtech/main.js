var article = document.getElementsByTagName("ARTICLE")[0];
var section = document.createElement("SECTION");
article.appendChild(section);

var p = document.createElement("p");
var strong = document.createElement("STRONG");
var em = document.createElement("EM");
var d = document.createTextNode("Voice Recognition");
em.appendChild(d);
p.appendChild(strong);
var c = document.createTextNode("Where does the feature" + d + "belong to?");
strong.appendChild(c);
section.appendChild(p);
section.setAttribute("class", "question");