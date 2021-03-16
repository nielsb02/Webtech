var elementSelectionbox, propertySelectionbox, appearanceButton;
var lastSelectedelement = "Presets", lastSelectedProperty = "Default", selectedPreset = "Default", selectedBodyFont = "Medium Font";

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
        console.log(this.name, this.options.length);
    };
}

selectionBox.prototype.addOptions = function() {
    for(var i = 0; i < this.options.length; i++  )
    {
        var option = document.createElement("OPTION");
        option.appendChild(document.createTextNode(this.options[i]));
        this.element.appendChild(option);
    }
}

selectionBox.prototype.removeOptions = function(){
    while(this.element.firstChild){
        this.element.removeChild(this.element.lastChild);
    }
}

function removeFromArray(array, remove){
    var newArray;
    array.forEach(function (string){
        for(var i = 0; i < remove.length; i++ )
        {
            console.log(string);
            if(string === remove[i])
            {
                array.splice(array.indexOf(remove[i], 1));
                newArray = array;
                return newArray;
            }
        }
    });
    return newArray;
}

function presetsAppearance(property){
    var bodyAppearance = document.getElementsByTagName("BODY")[0];
    var attributes = bodyAppearance.getAttribute("class").split(" ");
    attributes.shift();
    selectedPreset = property;
    
    console.log(bodyAppearance.getAttribute("class"));
    console.log(attributes.join(" "));
    switch(property){
        case "Default":
            bodyAppearance.setAttribute("class", "body--default " + attributes.join(" "));
            var header = document.getElementsByTagName("HEADER")[0];
            var img = header.children[1];
            img.setAttribute("src", "Resources/headerbgr1.png");
            break;
        case "Dark Mode":
            bodyAppearance.setAttribute("class", "body--dark_mode "+ attributes.join(" "));
            var header = document.getElementsByTagName("HEADER")[0];
            var img = header.children[1];
            img.setAttribute("src", "Resources/headerbgrdark.jpg");
            break;
        case "Inverted Colors":
            bodyAppearance.setAttribute("class", "body--inverted_colors " + attributes.join(" "));
            break;
        default:
            break;
    } 
    console.log(bodyAppearance.getAttribute("class"));

}

function bodyApperance(property){
    var bodyAppearance = document.getElementsByTagName("BODY")[0];
    let attributes = bodyAppearance.getAttribute("class").split(" ");
    console.log(attributes);
    
    var addAttributes = removeFromArray(attributes, ["body--small_font", "body--medium_font", "body--large_font"])

    console.log(addAttributes.join(" "));
    selectedBodyFont = property;

    switch(property){
        case "Small Font":
            bodyAppearance.setAttribute("class", addAttributes.join(" ") + " body--small_font");
            break;
        case "Medium Font":
            bodyAppearance.setAttribute("class", addAttributes.join(" ") + " body--medium_font");
            break;
        case "Large Font":
            bodyAppearance.setAttribute("class", addAttributes.join(" ") + " body--large_font");
            break;
        default:
            break;
    }
    console.log(bodyAppearance.getAttribute("class"));
}


function changeProperty(){
    propertySelectionbox.removeOptions();

    switch (elementSelectionbox.element.value){
        case "Presets":
            propertySelectionbox.options = ["Default", "Dark Mode", "Inverted Colors"];
            break;
        case "Body":
            propertySelectionbox.options = ["Small Font", "Medium Font", "Large Font"];
            break;
        case "Header":
            propertySelectionbox.options = ["a", "b", "c"];
            break;
        case "Article":
            propertySelectionbox.options = ["enable border", "b", "c"];
            break;
        case "Aside":
            propertySelectionbox.options = ["place aside above footer", "b", "c"];
            break;
        case "Footer":
            propertySelectionbox.options = ["a", "b", "c"];
            break;
        default:
            if(elementSelectionbox.element.value.includes("Section")){
                propertySelectionbox.options = ["enable border", "e", "f"];
            }
            break;
    }
    lastSelectedelement = elementSelectionbox.element.value;
    propertySelectionbox.addOptions();
}

function changeAppearance(){
    if(lastSelectedelement !== elementSelectionbox.element.value || lastSelectedProperty !== propertySelectionbox.element.value)
    {
        console.log("appearance changed...");
        switch (elementSelectionbox.element.value){
            case "Presets":
                presetsAppearance(propertySelectionbox.element.value);
                break;
            case "Body":
                bodyApperance(propertySelectionbox.element.value);
                break;
            case "Header":
                
                break;
            case "Article":

                break;
            case "Aside":
                break;
            case "Footer":
                break;
            default:
                if(elementSelectionbox.element.value.includes("Section")){
                }
                break;
        }
    }
    lastSelectedProperty = propertySelectionbox.element.value;
}

// Function to create the complete menu to change the appearance,
// it is locted inside the footer and underneath the references.
// We used insertBefore to insert the new elements in front the already excisting divider.

function createElementsmenu(){
    
    var elementsArray = ["element", "Presets", "Body", "Header", "Article"];
    if ( document.getElementsByTagName("SECTION").length === 1)
    {
        elementsArray.push("Section");
    }
    else
    {
        for (var i =0; i < document.getElementsByTagName("SECTION").length; i++)
        {
            elementsArray.push("Section " + (i + 1));
        }
    }
    elementsArray.push("Aside", "Footer");
    console.log(elementsArray.length);
    return elementsArray;
}

function createAppearancemenu(){
    var footer = document.getElementsByTagName("FOOTER")[0];
    var footerDivider = document.getElementsByTagName("HR")[0];
    console.log(footer.nodeName, footerDivider.nodeName);
   
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

createAppearancemenu();



/*buttonAppearance[0].addEventListener("click", function (){
    var selectedElement = selectAppearance[0].value;
    console.log(selectedElement);

    switch(selectedElement){
        case "Presets":
            changeAppearance(presetsAppearance);
            break;
        default:
            break;
    }
});*/
