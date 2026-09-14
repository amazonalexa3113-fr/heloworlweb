const header = document.getElementById("navigationbar");

// show and hide button
const hidebtn = document.getElementById("hideheader");
const showbtn =document.getElementById("showheader");

header.style.display = "block"; // show the navigation bar
showbtn.style.display = "none"; // hide the show button
hidebtn.style.display = "block"; // show the hide button

hidebtn.style.margin = "0 auto"; // center the hide button

hidebtn.addEventListener("click", () => {
    showbtn.style.display = "block"; // show the show button
    header.style.display = "none"; // hide the navigation bar upon clicking the button

    console.log("hide button clicked, telling <header id=\"navigationbar\"> to set display to \"none\" and <button id=\"showheader\"> to set display to \"block\"");
})

showbtn.addEventListener("click", () => {
    showbtn.style.display = "none"; // hide the show button
    header.style.display = "block"; // show the navigation bar

    console.log("show button clicked, telling <header id=\"navigationbar\"> to set display to \"block\" and <button id=\"showheader\"> to set display to \"none\"");
})