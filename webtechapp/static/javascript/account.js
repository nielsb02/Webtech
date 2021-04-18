var article;
if(document.getElementsByTagName("ARTICLE")[0])
        article = document.getElementsByTagName("ARTICLE")[0];
else 
{
    let aside = document.getElementsByTagName("ASIDE")[0];
    let body = document.getElementsByTagName("BODY")[0];
    article = body.insertBefore(document.createElement("ARTICLE"), aside);
}
var section, secondSection, heading;
var status;

function getCookie(cookieName, callback) {
    var name = cookieName + "=";
    var cookieArray = document.cookie.split(';');
    console.log(document.cookie);
    for(var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            console.log("cookie found", cookie);
            callback(cookie);
        }
    }
    return;
}

function logIn()
{
    let logInput = document.getElementById("username_input");
    let passInput = document.getElementById("password_input");

    console.log(logInput.value, passInput.value);
    let data = {logIn: logInput, password: passInput};
    let url = "/logIn.js"

    /*checkLogin(url, data, function(succes, data){
        if(succes)
        {
            
        }
        else
        {

        }
    });*/
}

function logOut(){
    if(document.title == "Quiz")
    {
        //status = LoggedIn;
        sessionStorage.setItem("status","LogIn");
        element = document.getElementsByTagName("SECTION");
        for (index = element.length - 1; index >= 0; index--) {
            element[index].remove();
        }
        section = document.createElement("SECTION");
        article.appendChild(section);
        logInLayout();
    }
}

function Results()
{
    
}

function createAcc(){
    var res;
    var pass = document.getElementById("password_input").value;

            switch(pass) {
                case pass.match(/[a-z]/g):
                    res += " A password should contain at least one lowercase character"
                  break;
                case pass.match(/[A-Z]/g):
                    res += " A password should contain at least one uppercase character"
                  break;
                case pass.match(/[0-9]/g):
                    res += " A password should contain at least one digit"
                  break;
                case  pass.length >= 7:
                    res += " A password should contain at least 7 characters"
                    break;
                default: console.log("account created bitcheezzzz")
            }
    console.log(res);
}

function logedInLayout()
{
    let headingText = document.createTextNode("Manage Account");
    if(heading.firstChild)
    {
        heading.replaceChild(headingText, heading.firstChild);
    }
    else
    {
        heading.appendChild(headingText);
        
    }

    section.setAttribute("class", "login_section");
    let paragraph = document.createElement("P");
    paragraph.setAttribute("class", "question_problem");
    section.appendChild(paragraph);

    let strong = document.createElement("STRONG");
    strong.appendChild(document.createTextNode("Hello ---USER---"));
    paragraph.appendChild(strong);

    let secondParagaph = document.createElement("p");
    secondParagaph.appendChild(document.createTextNode("Username: ---USERNAME---, Password: ---HIDDEN---")); //press to view
    section.appendChild(secondParagaph);

    let logOutButton = document.createElement("BUTTON");
    logOutButton.appendChild(document.createTextNode("Log Out"));
    logOutButton.addEventListener("click", logOut);
    section.appendChild(logOutButton);

    secondSection = document.createElement("SECTION");
    secondSection.setAttribute("class", "login_section");
    article.appendChild(secondSection);

    let secondParagraph = document.createElement("P");
    secondParagraph.setAttribute("class", "question_problem");
    secondSection.appendChild(secondParagraph);

    let secondStrong = document.createElement("STRONG");
    secondStrong.appendChild(document.createTextNode("Yout Results:"));
    secondParagraph.appendChild(secondStrong);

    //createResults();
}

function logInLayout()
{
    let headingText = document.createTextNode("Log In");
    if(heading.firstChild)
    {
        heading.replaceChild(headingText, heading.firstChild);
    }
    else
    {
        heading.appendChild(headingText);
        
    }

    section.setAttribute("class", "login_section");
    let paragraph = document.createElement("p");
    paragraph.setAttribute("class", "question_problem");
    section.appendChild(paragraph);

    let strong = document.createElement("STRONG");
    paragraph.appendChild(strong);
    strong.appendChild(document.createTextNode("Already have an account? Log in..."));

    let username = document.createElement("INPUT");
    username.setAttribute("type", "text");
    username.setAttribute("name", "");
    username.setAttribute("class", "login_input");
    username.setAttribute("id", "username_input--article");
    username.setAttribute("placeholder", "Username or Email");
    username.addEventListener("keyup", function(event) {
        if (event.code === "Enter") {
            event.target.nextElementSibling.focus();
        }
      }); 
    section.appendChild(username);

    let password = document.createElement("INPUT");
    password.setAttribute("type", "password");
    password.setAttribute("name", "");
    password.setAttribute("class", "login_input");
    password.setAttribute("id", "password_input--article");
    password.setAttribute("placeholder", "Password");
    password.addEventListener("keyup", function(event) {
        if (event.code === "Enter") {
          logIn();
        }
      }); 
    section.appendChild(password);

    let showPass = document.createElement("INPUT");
    showPass.setAttribute("type", "checkbox");
    showPass.appendChild(document.createTextNode("Show Password"));
    showPass.setAttribute("id", "showPass");
    showPass.addEventListener("click", function(){
        var x = document.getElementById("password_input");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    });
    section.appendChild(document.createTextNode("Show Password"));
    section.appendChild(showPass);

    let logButton = document.createElement("BUTTON");
    logButton.setAttribute("class", "login_input");
    logButton.appendChild(document.createTextNode("Log In"));
    logButton.addEventListener("click", logIn, false);
    section.appendChild(logButton);

    let create = document.createElement("BUTTON");
    create.setAttribute("class", "login_input--inline");
    create.appendChild(document.createTextNode("Create an account"));
    create.addEventListener("click", function() {
        section.remove();
        section = document.createElement("SECTION");
        article.appendChild(section);
        createAccLayout();
    }, false);
    section.appendChild(create);

    let back = document.createElement("BUTTON"); 
    back.setAttribute("class", "login_input--inline");
    back.appendChild(document.createTextNode("Or go back"));
    back.addEventListener("click", function() {
        //go back (history);

    }, false);
    section.appendChild(back);
}

function createAccLayout()
{
    section.setAttribute("class", "login_section");

    let headingText = document.createTextNode("Create Account");
    if(heading.firstChild)
    {
        heading.replaceChild(headingText, heading.firstChild);
    }
    else
    {
        heading.appendChild(headingText);
    }

    section.setAttribute("class", "login_section");
    let paragraph = document.createElement("p");
    paragraph.setAttribute("class", "question_problem");
    section.appendChild(paragraph);

    let strong = document.createElement("STRONG");
    paragraph.appendChild(strong);
    strong.appendChild(document.createTextNode("IDK..."));

    let surname = document.createElement("INPUT");
    surname.setAttribute("type", "text");
    surname.setAttribute("name", "");
    surname.setAttribute("class", "login_input--inline");
    surname.setAttribute("id", "username_input");
    surname.setAttribute("placeholder", "Surname");
    surname.addEventListener("keyup", function(event) {
        if (event.code === "Enter") {
          event.target.nextElementSibling.focus();
        }
      }); 
    section.appendChild(surname);

    let lastname = document.createElement("INPUT");
    lastname.setAttribute("type", "text");
    lastname.setAttribute("name", "");
    lastname.setAttribute("class", "login_input--inline");
    lastname.setAttribute("id", "username_input");
    lastname.setAttribute("placeholder", "Last name");
    lastname.addEventListener("keyup", function(event) {
        if (event.code === "Enter") {
            event.target.nextElementSibling.focus();
        }
      }); 
    section.appendChild(lastname);

    let username = document.createElement("INPUT");
    username.setAttribute("type", "text");
    username.setAttribute("name", "");
    username.setAttribute("class", "login_input");
    username.setAttribute("id", "username_input");
    username.setAttribute("placeholder", "Username or Email");
    username.addEventListener("keyup", function(event) {
        if (event.code === "Enter") {
            event.target.nextElementSibling.focus();
        }
      }); 
    section.appendChild(username);

    let password = document.createElement("INPUT");
    password.setAttribute("type", "password");
    password.setAttribute("name", "");
    password.setAttribute("class", "login_input");
    password.setAttribute("id", "password_input");
    password.setAttribute("placeholder", "Password");
    password.addEventListener("keyup", function(event) {
        if (event.code === "Enter") {
          createAcc();
        }
      }); 
    section.appendChild(password);

    let showPass = document.createElement("INPUT");
    showPass.setAttribute("type", "checkbox");
    showPass.appendChild(document.createTextNode("Show Password"));
    showPass.setAttribute("id", "showPass");
    showPass.addEventListener("click", function(){
        var x = document.getElementById("password_input");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    });
    section.appendChild(document.createTextNode("Show Password"));
    section.appendChild(showPass);

    let logButton = document.createElement("BUTTON");
    logButton.setAttribute("class", "login_input--inline");
    logButton.appendChild(document.createTextNode("Create Your Account"));
    logButton.addEventListener("click", createAcc, false);
    section.appendChild(logButton);

    let cookieArrayncel = document.createElement("BUTTON"); 
    cookieArrayncel.setAttribute("class", "login_input--inline");
    cookieArrayncel.appendChild(document.createTextNode("cookieArrayncel"));  //go back to logIn page
    cookieArrayncel.addEventListener("click", function() {
        sessionStorage.setItem("status", "LogIn");
        section.remove();
        section = document.createElement("SECTION");
        article.appendChild(section);
        logInLayout();
    }, false);
    section.appendChild(cookieArrayncel);

}

function AccountLayout()
{
    if(document.getElementsByTagName("ARTICLE")[0])
        article = document.getElementsByTagName("ARTICLE")[0];
    else 
    {
        let aside = document.getElementsByTagName("ASIDE")[0];
        let body = document.getElementsByTagName("BODY")[0];
        article = body.insertBefore(document.createElement("ARTICLE"), aside);
    }

    heading = document.createElement("H2");
    heading.setAttribute("class", "first_heading");
    article.appendChild(heading);

    section = document.createElement("SECTION");
    article.appendChild(section);

    getCookie("accountStatus", function(cookie)
    {
        console.log(cookie.split)
        status = cookie.split("=")[1];

        if(status === "loggedIn")
        {
            logedInLayout();
        }
        else if(status === "notLoggedIn")
        {
            logInLayout();
        }
        else if(status === "createAccount")
        {
            createAccLayout();
        }
    });
}

function createHiddenMenu(){
    
    let createButton = document.getElementById("create_acc_button");
    createButton.addEventListener("click", function() {
        document.cookie = "accountStatus="+ "createAccount;"+ "max-age=" + 365*24*60*60 + "httpOnly=true" + "path=/";
        if(document.title !== "Quiz")
            window.location.href='assessment.html';
        article.remove();
        AccountLayout();
        
    }, false);

    let userInput = document.getElementById("username_input");
    userInput.addEventListener("keyup", function(event) {
        if (event.code === "Enter") {
            event.target.nextElementSibling.focus();
        }
    }); 

    let passInput = document.getElementById("password_input");
    passInput.addEventListener("keyup", function(event) {
        if (event.code === "Enter") {
            logIn();
        }
    }); 

    let showPass = document.getElementById("showPass");
    showPass.addEventListener("click", function(){
        var x = document.getElementById("password_input");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    });

    let icon = document.getElementById("logImg");
    icon.addEventListener("click", function() {
        if(document.title !== "Quiz")
            window.location.href='assessment.html';
        article.remove();
        AccountLayout();
    });
}

createHiddenMenu();

    

