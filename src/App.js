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
  if(date != "")
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
        for(let i=0;i<post_content.weekslived;i++)
        {
          if(i == post_content.offset)
          {
            squares.push(<div class="square" id="yellow_square"></div>);
          }
          else if(i % (52 + post_content.offset) == 0 && i>0)
          {
            squares.push(<div class="square" id="yellow_square"></div>);
          }
          else
          {
            squares.push(<div class="square" id="red_square"></div>);
          }
        }
        for(let i=0;i<4174-post_content.weekslived;i++)
        { 
          if(i == post_content.offset)
          {
              squares.push(<div class="square" id="yellow_square"></div>);
          }
          else if(i % (52 + post_content.offset) == 0 && i > 0)
          {
            squares.push(<div class="square" id="yellow_square"></div>);
          }  
          else
          {
            squares.push(<div class="square" id="green_square"></div>); 
          }
        }
        root.render(squares); 
        result.innerHTML = `Ile dni już żyję: ${post_content.dayslived}<br>Ile tygodni już żyję: ${post_content.weekslived}<br>Ile tygodni mi pozostało: ${post_content.weeksleft}<br>`

      });

  }
  else
  {
    alert("Brakuje daty urodzin");
  }
}

export default App;