var elementSelectionbox, propertySelectionbox, appearanceButton;
var lastSelectedelement, lastSelectedProperty;
var pageAppearance;
var headerArray, articleArray, sectionArray;

//Two functions to make it easier to use sessionStorage to store the local variable describing the appearance.

function saveToSession(id, object){
    sessionStorage.setItem(id, JSON.stringify(object));
}

function getFromSession(id){
    return JSON.parse(sessionStorage.getItem(id));
}

// A Class to create selection boxes. By transforming the arguments object into an array,
// we can use shift to get the name of the selectionbox (note that the name is always the first given parameter)
// and the remaining ellements of the array are used in the prototype to create all the options.

class selectionBox{
    constructor(){
        var arg =  Array.prototype.slice.call(arguments[0]);
        this.name = arg.shift();
        this.options = arg; //removes name from the arguments list
        this.element = document.createElement("SELECT");
        this.element.setAttribute("class", "select--appearance");
    }
}

//two prototypes to remove and create the options for the selectionboxes. 

selectionBox.prototype.addOptions = function() {
    for(var i = 0; i < this.options.length; i++  )
    {
        var option = document.createElement("OPTION");
        option.appendChild(document.createTextNode(this.options[i]));
        this.element.appendChild(option);
    }
};

selectionBox.prototype.removeOptions = function(){
    while(this.element.firstChild){
        this.element.removeChild(this.element.lastChild);
    }
};

//This functions removes an certain class from the classlist of the element which is about to change it apearance.
function removeFromArray(element, remove){
        if (element.classList){
            element.classList.forEach(function (string){
            for(var i = 0; i < remove.length; i++ )
            {
                if(string === remove[i])
                {
                   element.classList.remove(string);
                }
            }
        });
    }
}

//We Created for every element an different function, to keep it somewhat viewable.

function presetsAppearance(property){
    var bodyAppearance = document.getElementsByTagName("BODY")[0];
    var attributes = bodyAppearance.getAttribute("class").split(" ");
    attributes.shift();
    
    switch(property){
        case "Default":
            bodyAppearance.setAttribute("class", "body--default " + attributes.join(" "));
            var header = document.getElementsByTagName("HEADER")[0];
            var img = header.children[1];
            img.setAttribute("src", "Resources/headerbgr1.png");
            if(document.title == "Perspectives"){
                img = document.getElementsByClassName("img_full2")[0];
                img.setAttribute("src", "Resources/accessibility-icons.jpg");
            }
            break;
        case "Dark Mode":
            bodyAppearance.setAttribute("class", "body--dark_mode "+ attributes.join(" "));
            header = document.getElementsByTagName("HEADER")[0];
            img = header.children[1];
            img.setAttribute("src", "Resources/headerbgrdark.jpg");

            if(document.title == "Perspectives"){
                img = document.getElementsByClassName("img_full2")[0];
                img.setAttribute("src", "Resources/accessibility-iconsdark.jpg");
            }
            break;
        case "Inverted Colors":
            bodyAppearance.setAttribute("class", "body--inverted_colors " + attributes.join(" "));
            break;
        default:
            break;
    } 
    pageAppearance.preset = property;
}

function bodyAppearance(property){
    if(property == "Small Font" || property == "Medium Font" || property ==  "Large Font" || property == "Extra Large Font" ){
        pageAppearance.body.font = property;
        changeFont(property, "BODY", 0);
    }
}

function headerAppearance(property, n){
    var obj;
    if(property == "Small Font" || property == "Medium Font" || property ==  "Large Font" || property == "Extra Large Font"){
        
        changeFont(property, "HEADER", n);
        obj = {font: property};
    }
    else{
        changeBorder(property, "HEADER", n);
        obj = {border: property};
    }
    headerArray[n] = obj;
    pageAppearance.header.objectArray = headerArray;
}

function articleAppearance(property, n){
    var obj;
    if(property == "Small Font" || property == "Medium Font" || property ==  "Large Font" || property == "Extra Large Font" ){
        changeFont(property, "ARTICLE", n);
        obj = {font: property};
    }
    else{
        changeBorder(property, "SECTION", n);
        obj = {border: property};
    }
    articleArray[n] = obj;
    pageAppearance.article.objectArray = articleArray;
}

function sectionAppearance(property, n){
    var obj;
    if(property == "Small Font" || property == "Medium Font" || property ==  "Large Font" || property == "Extra Large Font" ){
        changeFont(property, "SECTION", n);
        obj = {font: property};
    }
    else{
        changeBorder(property, "SECTION", n);
        obj = {border: property};
    }
    sectionArray[n] = obj;
    pageAppearance.section.objectArray = sectionArray;
}

function asideAppearance(property){
    if(property == "Small Font" || property == "Medium Font" || property ==  "Large Font" || property == "Extra Large Font" ){
        changeFont(property, "ASIDE", 0);
        pageAppearance.aside.font = property;
    }
}

function footerAppearance(property){
    if(property == "Small Font" || property == "Medium Font" || property ==  "Large Font" || property == "Extra Large Font" ){
        changeFont(property, "FOOTER", 0);
        pageAppearance.footer.font = property;
    }
}

//These two functions are used to change the css class, works for every element and number of elements.

function changeBorder(property, semanticElement, n)
{
    var getSections = document.getElementsByTagName(semanticElement)[n];
    removeFromArray(getSections,["section--border","section--noborder"]);
    switch(property)
    {
        case "Enable Border":
            getSections.classList.add("section--border");
            break;
        case "Disable Border":
            getSections.classList.add("section--noborder");
            break;
        default:
            break;
    }
}

function changeFont(property, semanticElement, n){
    var semanticAppearance = document.getElementsByTagName(semanticElement)[n];
    removeFromArray(semanticAppearance, ["block--small_font", "block--medium_font", "block--large_font", "block--extra_large_font"]);
    switch(property){
        case "Small Font":
            semanticAppearance.classList.add("block--small_font");
            break;
        case "Medium Font":
            semanticAppearance.classList.add("block--medium_font");
            break;
        case "Large Font":
            semanticAppearance.classList.add("block--large_font");
            break;
        case "Extra Large Font":
            semanticAppearance.classList.add("block--extra_large_font");
            break;
        default:
            break;
    }
}

function changeProperty(){
    propertySelectionbox.removeOptions();

    switch (elementSelectionbox.element.value){
        case "Presets":
            propertySelectionbox.options = ["Default", "Dark Mode"];
            break;
        case "Body":
            propertySelectionbox.options = ["Small Font", "Medium Font", "Large Font", "Extra Large Font"];
            break;
        case "Header":
            propertySelectionbox.options = ["Disable Border", "Enable Border", "Small Font", "Medium Font", "Large Font", "Extra Large Font"];
            break;
        case "Article":
            propertySelectionbox.options = ["Disable Border", "Enable Border", "Small Font", "Medium Font", "Large Font", "Extra Large Font"];
            break;
        case "Aside":
            propertySelectionbox.options = ["Small Font", "Medium Font", "Large Font", "Extra Large Font"];
            break;
        case "Footer":
            propertySelectionbox.options = ["Small Font", "Medium Font", "Large Font", "Extra Large Font"];
            break;
        default:
            if(elementSelectionbox.element.value.includes("Section")){
                propertySelectionbox.options = ["Disable Border", "Enable Border", "Small Font", "Medium Font", "Large Font", "Extra Large Font"];
            }
            break;
    }
    propertySelectionbox.addOptions();
}

function changeAppearance(){
    if(lastSelectedelement !== elementSelectionbox.element.value || lastSelectedProperty !== propertySelectionbox.element.value)
    {
        var n;
        switch (elementSelectionbox.element.value){
            case "Presets":
                presetsAppearance(propertySelectionbox.element.value);
                break;
            case "Body":
                bodyAppearance(propertySelectionbox.element.value);
                break;
            case "Aside":
                asideAppearance(propertySelectionbox.element.value);
                break;
            case "Footer":
                footerAppearance(propertySelectionbox.element.value);
                break;
            default:
                n = elementSelectionbox.element.value.split(" ");
                n = parseInt(n[1]) - 1;
                if(Number.isNaN(n))
                    n = 0;
                break;
        }
        if(elementSelectionbox.element.value.includes("Article")){
            articleAppearance(propertySelectionbox.element.value, n);
        }
        else if(elementSelectionbox.element.value.includes("Header")){
            headerAppearance(propertySelectionbox.element.value, n);
        }
        else if(elementSelectionbox.element.value.includes("Section")){
            sectionAppearance(propertySelectionbox.element.value, n);
        }
    }
    
    lastSelectedelement = elementSelectionbox.element.value;
    lastSelectedProperty = propertySelectionbox.element.value;
    sessionStorage.removeItem("savedData");
    saveToSession("savedData", pageAppearance);
}

// This Function creates the options for the first selectbox, 
// by counting every header, article and section (if there are multiple).

function createElementsmenu(){
    
    var elementsArray = ["element", "Presets", "Body"];

    if ( document.getElementsByTagName("HEADER").length === 1)
    {
        elementsArray.push("Header");
    }
    else if ( document.getElementsByTagName("HEADER").length > 1)
    {
        for (var i =0; i < document.getElementsByTagName("HEADER").length; i++)
        {
            elementsArray.push("Header " + (i + 1));
        }
    }
    
    if ( document.getElementsByTagName("ARTICLE").length === 1)
    {
        elementsArray.push("Article");
    }
    else if ( document.getElementsByTagName("ARTICLE").length > 1)
    {
        for (let i =0; i < document.getElementsByTagName("ARTICLE").length; i++)
        {
            elementsArray.push("Article " + (i + 1));
        }
    }

    if ( document.getElementsByTagName("SECTION").length === 1)
    {
        elementsArray.push("Section");
    }
    else if ( document.getElementsByTagName("SECTION").length > 1)
    {
        for (let i =0; i < document.getElementsByTagName("SECTION").length; i++)
        {
            elementsArray.push("Section " + (i + 1));
        }
    }
    if(document.getElementsByTagName("ASIDE"))
    {
        elementsArray.push("Aside");
    }
    if(document.getElementsByTagName("FOOTER"))
    {
        elementsArray.push("Footer");
    }
    return elementsArray;
}

// Function to create the complete menu to change the appearance,
// it is locted inside the footer and underneath the references.
// We used insertBefore to insert the new elements in front the already excisting divider.

function createAppearancemenu(){
    var footer = document.getElementsByTagName("FOOTER")[0];
    var footerDivider = document.getElementsByTagName("HR")[0];
   
    var heading = document.createElement("H4");
    heading.appendChild(document.createTextNode("Change the Appearance"));

    elementSelectionbox = new selectionBox(createElementsmenu());
    elementSelectionbox.addOptions();
    elementSelectionbox.element.addEventListener("change", changeProperty);

    propertySelectionbox = new selectionBox(["property", "Default", "Dark Mode", "Inverted Colors"]);
    propertySelectionbox.addOptions();

    appearanceButton = document.createElement("BUTTON");
    appearanceButton.setAttribute("class", "button--appearance");
    appearanceButton.appendChild(document.createTextNode("Change Appearnace"));
    appearanceButton.addEventListener("click", changeAppearance);

    footer.insertBefore(document.createElement("HR"), footerDivider);
    footer.insertBefore(heading, footerDivider);
    footer.insertBefore(elementSelectionbox.element, footerDivider);
    footer.insertBefore(propertySelectionbox.element, footerDivider);
    footer.insertBefore(document.createElement("BR"), footerDivider);  // can maybe be done with css
    footer.insertBefore(appearanceButton, footerDivider);
}

//Gets the storage from the sesion and intialize the already defined appearances.

if(typeof(Storage) !== "undefined") {
    if (getFromSession("savedData"))
    {
        pageAppearance = getFromSession("savedData");
        headerArray = pageAppearance.header.objectArray;
        articleArray = pageAppearance.article.objectArray;
        sectionArray = pageAppearance.section.objectArray;

       try{ 
            presetsAppearance(pageAppearance.preset);
            bodyAppearance(pageAppearance.body.font);
            
            headerArray.forEach(function (object, index){
                headerAppearance(object.font, index);
                headerAppearance(object.border, index);
            });
            articleArray.forEach(function (object, index){
                articleAppearance(object.font, index);
                articleAppearance(object.border, index);
            });
            sectionArray.forEach(function (object, index){
                sectionAppearance(object.font, index);
                sectionAppearance(object.border, index);
            });

            asideAppearance(pageAppearance.aside.font);

            footerAppearance(pageAppearance.footer.font);
        }
        catch(Error){}
    }
    else
    {
        lastSelectedelement = "Presets"; lastSelectedProperty = "Default";
        headerArray = []; articleArray = []; sectionArray= [];
        pageAppearance = {
            preset: "Default",
            body: {font: "Medium Font"},
            aside: {font: ""},
            header: {objectArray: []},
            article: {objectArray: []},
            section: {objectArray: []},
            footer: {font: ""}
        };
        saveToSession("savedData", pageAppearance);
    }
}
createAppearancemenu();