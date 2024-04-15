import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './Router';
import reportWebVitals from './reportWebVitals';
import './case-content.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

window.onload = function() {
  animateSequence();
 
};

function animateSequence() {
  var a = document.getElementsByClassName('sequence');
  for (var i = 0; i < a.length; i++) {
      var $this = a[i];
      var letter = $this.innerHTML;
      letter = letter.trim();
      var str = '';
      var delay = 100;
      for (var l = 0; l < letter.length; l++) {
          if (letter[l] != ' ') {
              str += '<span style="animation-delay:' + delay + 'ms; -moz-animation-delay:' + delay + 'ms; -webkit-animation-delay:' + delay + 'ms; ">' + letter[l] + '</span>';
              delay += 150;
          } else
              str += letter[l];
      }
      $this.innerHTML = str;
  }
}

