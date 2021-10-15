//Creation of the navbar.
function createList(element, list, type)
{
    var unorderedList = document.createElement("UL");
    var length = list[Object.keys(list)[0]].length;
    for(var i = 0; i < length; i++)
    {
        var listElement = document.createElement("LI");
        var a = document.createElement("A");

        if(type === "nav")
        {
            listElement.appendChild(a);
            if(list.text[i] == "Account")
            {
                if(document.title !== "Quiz")
                {
                    a.setAttribute("href", "assessment.html");
                }
                listElement.setAttribute("class", "login_li");
                a.setAttribute("class", "login");
                a.setAttribute("tabindex", "0");

                let img = document.createElement("IMG");
                img.setAttribute("src", "Resources/user-selected.jpg");
                img.setAttribute("class", "login_img");
                img.setAttribute("alt", "User Icon, to redirect to login page.");
                img.setAttribute("id", "logImg");
                a.appendChild(img);

                img.setAttribute("src", "Resources/user.jpg");

                let account_div = document.createElement("DIV");
                account_div.setAttribute("id", "log");
                account_div.setAttribute("class", "login_screen");
                account_div.appendChild(document.createElement("P").appendChild(document.createTextNode("Already have an Account? Log in...")));
                listElement.appendChild(account_div);

                let username = document.createElement("INPUT");
                username.setAttribute("type", "text");
                username.setAttribute("name", "");
                username.setAttribute("class", "login_input--popup");
                username.setAttribute("id", "username_input");
                username.setAttribute("placeholder", "Username or Email");
                account_div.appendChild(username);
            
                let password = document.createElement("INPUT");
                password.setAttribute("type", "password");
                password.setAttribute("name", "");
                password.setAttribute("class", "login_input--popup");
                password.setAttribute("id", "password_input");
                password.setAttribute("placeholder", "Password");
                account_div.appendChild(password);

                let showPass = document.createElement("INPUT");
                showPass.setAttribute("type", "checkbox");
                showPass.appendChild(document.createTextNode("Show Password"));
                showPass.setAttribute("id", "showPass");
                account_div.appendChild(showPass);
                account_div.appendChild(document.createTextNode("Show Password"));

            
                let logButton = document.createElement("BUTTON");
                logButton.setAttribute("class", "login_input--popup");
                logButton.appendChild(document.createTextNode("Log In"));
                logButton.setAttribute("id", "login_button")
                account_div.appendChild(logButton);
            
                let create = document.createElement("BUTTON");
                create.setAttribute("class", "login_input--popup");
                create.setAttribute("id", "create_acc_button");
                create.appendChild(document.createTextNode("Or create an account"));
                account_div.appendChild(create);
            }
            else
            {
                
                a.setAttribute("href", list.href[i]);
                var text = document.createTextNode(list.text[i]);
                
                if(document.title == list.text[i])
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
        else if (type === "aside")
        {
            a.setAttribute("href", list.href[i]);
            a.setAttribute("target", "_blank");

            let img = document.createElement("IMG");
            img.setAttribute("src", list.src[i]);
            img.setAttribute("alt", list.alt[i]);
            img.setAttribute("class", "imgaside");

            a.appendChild(img);
            element.appendChild(a);
        }
        else if(type === "footer")
        {
            let text = document.createTextNode(list.text[i]);
            a.setAttribute("title", list.title[i]);
            a.setAttribute("href", list.href[i]);
            if(i!==0)
            {
                a.setAttribute("target", "_blank");
            }
            a.appendChild(text);
            listElement.appendChild(a);
            unorderedList.appendChild(listElement);
        }
    }
    if(type !== "aside")
        element.appendChild(unorderedList);
}

//creates the general layout of the website.
function createLayout()
{
    var header = document.getElementsByTagName("HEADER")[0];
    var heading = document.createElement("H1");
    var headerName;
    
    if(document.title == "Quiz")
    {
        headerName = document.createTextNode("Quiz");
    }
    else if(document.title == "Account")
    {
        headerName = document.createTextNode("Account");
    }
    var headerImg = document.createElement("IMG");
    headerImg.setAttribute("src", "Resources/headerbgr1.png");
    headerImg.setAttribute("alt", "Web Accesibility Banner");
    heading.appendChild(headerName);
    header.appendChild(heading);
    header.appendChild(headerImg);

    var body = document.getElementsByTagName("BODY")[0];
    body.setAttribute("id", "body");
    body.setAttribute("class", "body--default block--medium_font");

    var nav = document.getElementsByTagName("NAV")[0];
    var navList = {
        text: ["Home", "Importance", "Perspectives", "Standards", "Basic Guidelines", "Quiz", "Account"],
        href: ["index.html", "why.html", "perspectives.html", "standards.html", "guidelines.html", "assessment.html", "account.html"],
        img: ["Resources/user.jpg"]
    };
    createList(nav, navList, "nav");

    var aside = document.getElementsByTagName("ASIDE")[0];
    var paragraph = document.createElement("P");
    paragraph.setAttribute("class", "text");
    var socialMedia = document.createTextNode("Share on Instagram, Facebook, or Twitter!");
    paragraph.appendChild(socialMedia);
    aside.appendChild(paragraph);

    var asideList = {
        alt: ["picture of the instagram logo", "picture of the facebook logo", "picture of the twitter logo", "picture of the linkedIn logo"],
        href: ["https://www.instagram.com/", "https://www.facebook.com/sharer/sharer.php?u=https://webtech.nblonk.nl/Webtech/index.html", "https://twitter.com/intent/tweet?url=https://webtech.nblonk.nl/Webtech/index.html&text=", "https://www.linkedin.com/shareArticle?mini=true&url=https://webtech.nblonk.nl/Webtech/index.html"],
        src:["Resources/insta.png", "Resources/facebook.png", "Resources/twitter.png", "Resources/LinkedIn.png"]
    };
    createList(aside, asideList, "aside"); 

    var footer = document.getElementsByTagName("FOOTER")[0];
    var hr = document.createElement("HR");
    hr.setAttribute("id", "footerDivider");
    footer.appendChild(hr);

    var footerList = {
        title: ["Back to top", "Cookies Policy", "terms of use", "webtechnolgies Utrecht", "Contact"],
        href: ["#body", "https://www.termsfeed.com/live/023163d7-5810-4d74-815a-bc41a6fafc2e", "https://www.termsofusegenerator.net/live.php?token=bqIFkZ18svcfGGWGhp30vbO1juMjOMqx", "http://www.cs.uu.nl/education/vak.php?vak=INFOB2WT", "mailto:g.shamon@students.uu.nl"],
        text:["Back to top", "Cookies", "Terms of use", "Webtechnolgies UU", "contact"]
    };

    createList(footer, footerList, "footer");

    var copyright = document.createElement("P");
    var copyrightText = document.createTextNode("© 2021 - All Rights Reserved.");
    copyright.appendChild(copyrightText);
    copyright.setAttribute("id", "copyright");
    footer.appendChild(copyright);
}
createLayout();
