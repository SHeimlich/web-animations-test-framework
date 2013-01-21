// get default html values
var htmlVal = document.getElementById('htmlCode').value;
var cssVal = document.getElementById('cssCode').value;

// create new style and scripts object elements
var cssEle = document.createElement('style');

// elements such as animation divs and its associated style
// is appended into the body of iframe as well as any associating
// js scripts
var displayDefault = function() {
  frames['display'].document.documentElement.innerHTML = htmlVal;
  cssEle.innerHTML = cssVal;
  frames['display'].document.getElementsByTagName('style')[0].innerHTML = cssVal;
}

// executed when button called update is clicked
// extract texts from the 3 text areas,
var update = function() {  
  var scriptEle = document.createElement('script');
  scriptEle.async = false;

  // get values from 3 textboxes
  if (contentNotEqual(htmlVal, document.getElementById('htmlCode').value)) {
    htmlVal = document.getElementById('htmlCode').value;
    frames['display'].document.documentElement.innerHTML = htmlVal;
  }

  var jsVal = document.getElementById('jsCode').value;

  // change the body and css in value in inframe
  frames['display'].document.documentElement.innerHTML = htmlVal;
  
  var par;
  
  // change the scripts in iframe
  var includes = document.createElement('script');
  includes.setAttribute('src', '../../web-animations-js/web-animation.js');
  includes.onload = function() {
    if (frames['display'].document.getElementsByTagName('script')[1]) {
      var oldScript = frames['display'].document.getElementsByTagName('script')[1];
      scriptEle.innerHTML = '\n' + jsVal + '\n';
      frames['display'].document.getElementsByTagName('body')[0].replaceChild(scriptEle, oldScript);
    } else {
      scriptEle.innerHTML = jsVal;
      par = frames['display'].document.getElementsByTagName('body')[0];
      par.appendChild(scriptEle);
    }
  }
  frames['display'].document.getElementsByTagName('body')[0].appendChild(includes);

  cssVal = document.getElementById('cssCode').value;
  frames['display'].document.getElementsByTagName('style')[0].innerHTML = cssVal;
}

// make the solution box toggleable
var toggleSolution = function() {
  var ele = document.getElementById('toggleText');
  var p = getComputedStyle(ele, null);
  var label = document.getElementById('hideLabel');

  if (p.display === 'none') {
    ele.style.display = 'block';
    label.innerHTML = 'Hide Solution';
  } else if (p.display === 'block') {
    ele.style.display = 'none';
    label.innerHTML = 'Show Solution';
  }
}

var contentNotEqual = function(oldText, newText) {
  if (oldText !== newText) {
    return true;
  }
  return false;
}
