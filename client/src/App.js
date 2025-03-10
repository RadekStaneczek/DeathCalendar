import ReactDOM from 'react-dom/client';
import React from "react";
import logo from "./logo.svg";
import "./App.css";
let post_content = "";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div id="calendar">Death Calendar💀</div>
        <input id="dzien" type="date"></input>
        <input id="przycisk"type="button" onClick={POST} value="💀"></input>
        <div id="result"></div>
        <div id="grid"></div>
      </header>
    </div>
  );
}

function POST()
{
  let root = ReactDOM.createRoot(document.getElementById('grid'));
  let date = document.getElementById("dzien").value;
  let result = document.getElementById("result");
  let squares = [];
  if(date != "" && Date.now() - new Date(date).getTime() > 0)
  {
    const response = fetch("/post", {
      method: "POST",
      headers: {"Content-Type": "text/plain",
        "body":date,
      },
    })
      .then((res) => res.json())
      .then((data)=>{

        console.log(post_content);
        post_content = data;
      })
      .then(()=>{
        let lastWholeYear = post_content.offset;
        let year = post_content.birthdayear;
    
        console.log(year);
        console.log("Test");
        console.log(Date.now() - new Date(date));
        if(post_content.weeksleft < 0)
        {
          result.innerHTML = "Już nie żyjesz💀";
        }
        else{
          for (let i = 0; i < 4174; i++) {
              // Handle leap year increment
              if (i < post_content.weekslived) {
                squares.push(<div class="square red_square" alt={i}></div>);
              } else {
                squares.push(<div class="square green_square" alt={i}></div>);
              }

              // Year change logic when reaching last week of the year
              if (i === lastWholeYear) {
                squares.pop();
                squares.push(<div class="square yellow_square" alt={i}></div>);
                lastWholeYear += 52;
              }
    
          }
          root.render(squares); 
          result.innerHTML = `Ile dni już żyję: ${post_content.dayslived}<br>Ile tygodni już żyję: ${post_content.weekslived}<br>Ile tygodni mi pozostało: ${post_content.weeksleft}<br>`
        }
      });

  }
  else if(Date.now() - new Date(date) < 0)
  {
    alert("Zła data");
  }
  else
  {
    alert("Brakuje daty urodzin");
  }
}
function isLeap(year)
{
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
export default App;