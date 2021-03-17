//Header
var header = document.getElementsByTagName("HEADER")[0];
var heading = document.createElement("H1");
var headerName = document.createTextNode("Quiz");
var img = document.createElement("IMG");
img.setAttribute("src", "Resources/headerbgr1.png");
img.setAttribute("alt", "Web Accesibility Banner");
heading.appendChild(headerName);
header.appendChild(heading);
header.appendChild(img);

//nav
var nav = document.getElementsByTagName("NAV")[0];
var navList = {text: ["Home", "Why is Web Accessibility important?", "Perspectives of Web Accessibility", "Standards for Web Accessibility", "Basic Web Accessibility Guidelines", "Quiz"],
href: ["index.html", "why.html", "perspectives.html", "standards.html", "guidelines.html", "assessment.html"],
selected:["assessment.html"]};
function createList(element, list, isNav)
{
    var unorderedList = document.createElement("UL");
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
    unorderedList.appendChild(listElement);
}
element.appendChild(unorderedList);
}
createList(nav, navList, true);

//aside
var aside = document.getElementsByTagName("ASIDE")[0];
var paragraph = document.createElement("P");
paragraph.setAttribute("class", "text");
var socialMedia = document.createTextNode("Share on Instagram, Facebook, or Twitter!");
paragraph.appendChild(socialMedia);
aside.appendChild(paragraph);

var asideList = {alt: ["picture of the instagram logo", "picture of the facebook logo", "picture of the twitter logo", "picture of the linkedIn logo"],
href: ["https://www.instagram.com/", "https://www.facebook.com/sharer/sharer.php?u=https://webtech.nblonk.nl/Webtech/index.html", "https://twitter.com/intent/tweet?url=https://webtech.nblonk.nl/Webtech/index.html&text=", "https://www.linkedin.com/shareArticle?mini=true&url=https://webtech.nblonk.nl/Webtech/index.html"],
src:["Resources/insta.png", "Resources/facebook.png", "Resources/twitter.png", "Resources/LinkedIn.png"]};

function createAside(element, list, isaside)
{
    for(var i = 0; i<list.alt.length; i++)
    {
    if(aside)
    {
        let a = document.createElement("A");
        a.setAttribute("href", list.href[i]);
        a.setAttribute("target", "_blank")
        let img = document.createElement("IMG");
        img.setAttribute("src", list.src[i]);
        img.setAttribute("alt", list.alt[i]);
        img.setAttribute("class", "imgaside");
        a.appendChild(img);
        element.appendChild(a);
    }
    }
}
createAside(aside, asideList, true)

//footer
var body = document.getElementsByTagName("BODY")[0];
body.setAttribute("id", "body");
var footer = document.getElementsByTagName("FOOTER")[0];
var hr = document.createElement("HR");
footer.appendChild(hr);


var footerList = {title: ["Back to top", "Cookies Policy", "terms of use", "webtechnolgies Utrecht", "Contact"],
href: ["#body", "https://www.termsfeed.com/live/023163d7-5810-4d74-815a-bc41a6fafc2e", "https://www.termsofusegenerator.net/live.php?token=bqIFkZ18svcfGGWGhp30vbO1juMjOMqx", "http://www.cs.uu.nl/education/vak.php?vak=INFOB2WT", "mailto:g.shamon@students.uu.nl"],
text:["Back to top", "Cookies", "Terms of use", "Webtechnolgies UU", "contact"]};
function createFooter(element, list, isFooter)
{
    var ul = document.createElement("UL");
    for(var i = 0; i<list.title.length; i++)
    {
    if(isFooter)
    {
        let li = document.createElement("LI");
        let a = document.createElement("A");
        let text = document.createTextNode(list.text[i]);
        a.setAttribute("title", list.title[i]);
        a.setAttribute("href", list.href[i]);
        if(i!==0)
        {
            a.setAttribute("target", "_blank");
        }
        a.appendChild(text);
        li.appendChild(a);
        ul.appendChild(li);
    }
    }
    element.appendChild(ul);
}
createFooter(footer, footerList, true);
var copyright = document.createElement("P");
var copyrightText = document.createTextNode("© 2021 - All Rights Reserved.");
copyright.appendChild(copyrightText);
copyright.setAttribute("id", "copyright");
footer.appendChild(copyright);
