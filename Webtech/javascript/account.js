var article, section, secondSection, heading;
var status;

if (sessionStorage.getItem("status"))
    {
        status = sessionStorage.getItem("status"); // might replace with coockies.
    }
else
{
    status = "LogIn";
}


function login()
{
    console.log("log in...");
    let logInput = document.getElementById("username_input");
    let passInput = document.getElementById("password_input");
    console.log(logInput, passInput);

    if("correct" && document.title == "Account")
    {
        //status = LoggedIn;
        sessionStorage.setItem("status","LoggedIn");
        section.remove();
        section = document.createElement("SECTION");
        article.appendChild(section);
        logedInLayout();
    }
}

function logOut(){
    if(document.title == "Account")
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

}

function createBasicLayout()
{
    article = document.getElementsByTagName("ARTICLE")[0];
    heading = document.createElement("H2");
    heading.setAttribute("class", "first_heading");
    article.appendChild(heading);

    section = document.createElement("SECTION");
    article.appendChild(section);
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

    createResults();
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
          login();
        }
      }); 
    section.appendChild(password);

    let logButton = document.createElement("BUTTON");
    logButton.setAttribute("class", "login_input");
    logButton.appendChild(document.createTextNode("Log In"));
    logButton.addEventListener("click", login, false);
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

    let logButton = document.createElement("BUTTON");
    logButton.setAttribute("class", "login_input--inline");
    logButton.appendChild(document.createTextNode("Create Your Account"));
    logButton.addEventListener("click", createAcc, false);
    section.appendChild(logButton);

    let cancel = document.createElement("BUTTON"); 
    cancel.setAttribute("class", "login_input--inline");
    cancel.appendChild(document.createTextNode("cancel"));  //go back to login page
    cancel.addEventListener("click", function() {
        sessionStorage.setItem("status", "LogIn");
        section.remove();
        section = document.createElement("SECTION");
        article.appendChild(section);
        logInLayout();
    }, false);
    section.appendChild(cancel);

}

if(document.title !== "Account")
{
    let loginButton = document.getElementById("login_button");
    loginButton.addEventListener("click", login, false);

    let createButton = document.getElementById("create_acc_button");
    createButton.addEventListener("click", function() {
        sessionStorage.setItem("status", "CreateAcc");
        window.location='account.html';
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
            login();
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
}
else
{
    createBasicLayout();
    if(status == "CreateAcc")
    {
        createAccLayout();
    }
    else if(status == "LoggedIn")
    {
        logedInLayout()
    }
    else if(status == "LogIn")
    {
        logInLayout();
    }
}

