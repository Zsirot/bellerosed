//Makes fixed navbar transparent depending on nav location, animates overlay at the same time
const overlay = document.querySelector('.image-overlay-2');
const nav = document.querySelector('.navbar');
window.addEventListener('scroll', checkBoxes); //on scroll, check window position
checkBoxes()
function checkBoxes() {
    const triggerBottom = 1;
    const navTop = nav.getBoundingClientRect().top;
    if (navTop < triggerBottom) {
        nav.classList.add('animate')
        overlay.classList.add('animate')
    } else {
        nav.classList.remove('animate')
        overlay.classList.remove('animate')
    }
}
document.addEventListener("DOMContentLoaded", function () {
    // Find all elements with class "nav-link"
    var navLinks = document.getElementsByClassName("nav-link");
  
    // Get the current pathname
    var currentPath = window.location.pathname;
  
    // Loop through the navLinks and update the style if href matches currentPath
    for (var i = 0; i < navLinks.length; i++) {
      var link = navLinks[i];
      var href = link.getAttribute("href");
  
      if (href === currentPath) {
        link.style.textDecoration = "overline";
        link.classList.add("current-page")
      }
    }
  });
    // Get the elements with class "navbar-toggler" and "close-nav"
    var navbarTogglerButton = document.querySelector(".navbar-toggler");
    var closeNavButton = document.querySelector(".close-nav");

    // Attach a click event to the "close-nav" element
    closeNavButton.addEventListener("click", function() {
      // Trigger a click event on the navbar-toggler button
      if (navbarTogglerButton) {
        navbarTogglerButton.click();
      }
    });
    if (window.location.pathname === "/") {
    const heroElement = document.querySelector('.hero a');
    heroElement.removeAttribute('href')
    heroElement.addEventListener('click', scrollToCube);
  
    function scrollToCube() {
      // Find the cube element
      const cubeElement = document.querySelector('.home-cube');
      // Scroll to the top of the cube element
      cubeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }