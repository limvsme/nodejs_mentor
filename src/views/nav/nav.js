export default function setNav() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/src/views/nav/nav.html", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var navbarContent = xhr.responseText;
      var navbarElement = document.getElementById("navbar");
      navbarElement.innerHTML = navbarContent;
    }
  };
  xhr.send();
}
