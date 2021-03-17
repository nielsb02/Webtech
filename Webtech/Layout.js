//Header
var header = document.getElementsByTagName("HEADER")[0];
var heading = document.createElement("H1");
var headername = document.createTextNode("Quiz");
var img = document.createElement("IMG");
img.setAttribute("src", "Resources/headerbgr1.png");
img.setAttribute("alt", "Web Accesibility Banner");
heading.appendChild(headername);
header.appendChild(heading);
header.appendChild(img);

//nav
var nav = document.getElementsByTagName("NAV")[0];
var navList = {text: ["Home", "Why is Web Accessibility important?", "perspectives.html"],
href: ["index.html", "why.html"],
selected:["assessment.html"]};
function createList(element, list, isNav)
{
    var ul = document.createElement("UL");
for(var i = 0; i<list.text.length; i++)
{
    var listElement = document.createElement("LI");
    if(isNav)
    {
     var a = document.createElement("A");
     listElement.appendChild(a);
     a.setAttribute("href", list.href[i]);
     var text = document.createTextNode(list.text[i])
     if(list.selected[0] == list.href[i])
     {
         a.setAttribute("class", "active");
          var strong = document.createElement("STRONG");
          var em = document.createElement("EM");
          em.appendChild(text);
          strong.appendChild(em);
          a.appendChild(strong);
     }
     else
     {
     a.appendChild(text);
     }
    }
    ul.appendChild(listElement);
}
element.appendChild(ul);
}
createList(nav, navList, true);
