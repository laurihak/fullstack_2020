import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (<h1>{props.kurssi}</h1>);
};

const Content = (props) => {
  return (
    <div>
      <Part nimi={props.osat[0].nimi} tehtavat={props.osat[0].tehtavat} />
      <Part nimi={props.osat[1].nimi} tehtavat={props.osat[1].tehtavat} />
      <Part nimi={props.osat[2].nimi} tehtavat={props.osat[2].tehtavat} />
    </div>
  );
};
const Part = (props) => {
  return (<p>{props.nimi} {props.tehtavat}</p>);
};

const Total = (props) => {
  return (<p>Tehtävien lukumäärä kurssilla: {props.osat[0].tehtavat + props.osat[1].tehtavat + props.osat[2].tehtavat}</p>);
};

const App = () => {
  const kurssi = {
    nimi: "Half Stack sovelluskehitys",
    // Tehdään props.osat taulukko 1,2,3 jokaisella on nimi ja tehtavat 
    osat: [
      {
        nimi: "Reactin perusteet: ",
        tehtavat: 10
      },
      {
        nimi: "Propsien käyttäminen tiedonvälitykseen: ",
        tehtavat: 10
      },
      {
        nimi: "Komponentin tila: ",
        tehtavat: 10
      }
    ]
  };
  // Kutsutaan React
  return (
    <div>
      <Header kurssi={kurssi.nimi} />
      <Content osat={kurssi.osat} />
      <Total osat={kurssi.osat} />
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById("root"));