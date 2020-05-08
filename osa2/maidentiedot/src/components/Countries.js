import React from 'react';
import Weather from './Weather'



const Languages = (props) => {
  const languages = props.languages.map((language) => {
    return (
      <div key={language.name}>
        {language.name}
      </div>
    )
  })

  return (
    <div>
      {languages}
    </div>
  )
}
const SmallInfoCountry = (props) => {
  return (
    <div>
      {props.name} <button onClick={props.handleShow} name={props.name}>Show</button>
    </div>
  )
}
const Country = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>capital {props.capital}</p>
      <p>population {props.population}</p>
      <h2>Spoken languages</h2>
      <div><Languages languages={props.languages} /></div>
      <img src={props.flag} width="300" alt="Flag was not found" />
      <Weather city={props.capital} />
    </div>
  )
}

const Countries = (props) => {
  let maat = props.maat.filter(maa => maa.name.toLowerCase().includes(props.filter.toString().toLowerCase()))
  
  if (maat.length > 10) {
    return (
      <div>
        Search was too broad
      </div>)
  }
  if (maat.length === 1) {
    const filtered = maat.map((maa) => {
      return (<div key={maa.name}>
        <Country name={maa.name} capital={maa.capital} population={maa.population} flag={maa.flag} languages={maa.languages} />
        </div>
      )
    })
    return (<>{filtered}</>)
  }
  if (maat.length < 10 && maat.length > 0) {
    const filtered = maat.map((maa) => {
      return (<div key={maa.name}>
        <SmallInfoCountry name={maa.name} handleShow={() => props.handleShow(maa.name)}/>
        </div>
      )
    })
    return (<>{filtered}</>)
  }
  
  return (<>No countries found</>)
}

export default Countries