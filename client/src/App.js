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
        let lastwholeyear = post_content.offset;
        let year = post_content.birthdayear;
        let day = 0;
        console.log(year);
        for(let i=0;i<post_content.weekslived;i++)
        {
          if(day == 7)
          {
            lastwholeyear += 1;
            day = 0;
          }
          else if(i === post_content.offset)
          {
            squares.push(<div class="square yellow_square" alt={i}></div>);
            lastwholeyear += 52;
            year += 1;
            if((((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)))
            {
                console.log(year);
                day += 1;
            }
          }
          else if(i % lastwholeyear === 0 && i > 0)
          {
              squares.push(<div class="square yellow_square" alt={i}></div>);
              lastwholeyear += 52;
              year += 1;
              if((((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)))
              {
                  console.log(year);
                  day += 1;
              }
          }
          else
          {
            squares.push(<div class="square red_square" alt={i}></div>);
          }
        }
        for(let i=post_content.weekslived;i<4174;i++)
        { 

          if(day == 7)
          {
            lastwholeyear += 1;
            day = 0;
          }
          else if(i % lastwholeyear === 0 && i > 0)
          {
            squares.push(<div class="square yellow_square" alt={i}></div>);
            lastwholeyear += 52;
            year += 1;
            if((((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)))
              {
                console.log(year);
                day += 1;
              }
          }  
          else
          {
            squares.push(<div class="square green_square"  alt={i}></div>); 
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