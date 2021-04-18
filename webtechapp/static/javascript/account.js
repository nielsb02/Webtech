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
    for(var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            callback(cookie);
        }
    }
    return;
}


function logIn(name, pass)
{
    let data = {username: name, password: pass};
    let url = "/logIn.js"

    checkLogin(url, data, function(succes, data){
        if(succes)
        {
            article.remove();
            let aside = document.getElementsByTagName("ASIDE")[0];
            let body = document.getElementsByTagName("BODY")[0];
            article = body.insertBefore(document.createElement("ARTICLE"), aside);
            topicsLayout();

        }
        else
        {
        }
    });
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

function createAcc(pass, first, last, user){
    var res ="";
        if(!pass.match(/[a-z]/g))
            res += " A password should contain at least one lowercase character \n";
        if(!pass.match(/[A-Z]/g))
            res += " A password should contain at least one uppercase character \n";
        if(!pass.match(/[0-9]/g))
            res += " A password should contain at least one digit \n";
        if(!pass.length >= 7)
            res += " A password should contain at least 7 characters \n";
        let url = "./checkEmail.js?email="+user;
        getFromDB(url, function(obj){
            console.log(obj);
            if(obj.dbData[0].bool)
                res += " This Emailaddress already exists";
        if(res === "")
        {   
            let url = "/storeAccount.js"
            values= {first_name: first, last_name: last, email: user, password: pass};
            sendToDB(url, values);
        }
    });
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
    section.appendChild(password);

    let showPass = document.createElement("INPUT");
    showPass.setAttribute("type", "checkbox");
    showPass.appendChild(document.createTextNode("Show Password"));
    showPass.setAttribute("id", "showPass");
    showPass.addEventListener("click", function(){
        var x = document.getElementById("password_input--article");
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

    password.addEventListener("keyup", function(event) {
        if (event.code === "Enter") {
            logIn(username.value, password.value);
        }
    }); 
    logButton.addEventListener("click", function() {logIn(username.value, password.value)}, false);
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
          createAcc(password.value, surname.value, lastname.value, username.value);
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
    logButton.addEventListener("click", function(){
        createAcc(password.value, surname.value, lastname.value, username.value);
    }, false);
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
        {
            window.location.href='assessment.html';
        }
        else{
        article.remove();
        AccountLayout();
        }
        
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
            
            logIn(document.getElementById("password_input")[0], document.getElementById("username_input")[0]);
        }
    }); 

    let logButton = document.getElementById("password_input");
    logButton.addEventListener("click", function() {
        logIn(document.getElementById("password_input")[0], document.getElementById("username_input")[0]);
    }); 

    let showPass = document.getElementById("showPass");
    showPass.addEventListener("click", function(){
        var x = document.getElementById("password_input");
        if (x.type === "password") {
            x.type = "text";
        } 
        else {
            x.type = "password";
        }
    });

    let icon = document.getElementById("logImg");
    icon.addEventListener("click", function() {
        if(document.title !== "Quiz")
        {
            window.location.href='assessment.html';
        }
        article.remove();
        AccountLayout();
    });
}

createHiddenMenu();
