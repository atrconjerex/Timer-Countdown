import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';

const Timer = () => {
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);
  const [tipo, setTipo] = useState('Contador');
  const [button, setButton] = useState('Pasar a Cuenta Regresiva');
  const myRef = useRef(null);

  function toggle() {
    setActivo(!activo);
  }

  function reset() {
    setSegundos(0);
    setActivo(false);
    if (tipo === 'Cuenta Regresiva') {
      var inputsg = document.getElementById("regresiva");
      inputsg.value = "";
    }
  }

  function cambioTipo() {
    if (tipo === 'Contador') {
      setTipo ('Cuenta Regresiva'); 
      setButton('Pasar a Contador');
    } 
    if (tipo === 'Cuenta Regresiva') {
      setTipo('Contador'); 
      setButton('Pasar a Cuenta Regresiva');
    }
  }

  function agregaSegundos() {
    // `current` apunta al elemento input.
    let ref = myRef.current.value
    if(ref.length <= 5) setSegundos(ref);
  }

  useEffect(() => {
    let intervalo = null;
    if (activo && tipo === 'Contador') {
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos + 1);
      }, 1000);
    }

    if (activo && tipo === 'Cuenta Regresiva') {
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos - 1);
      }, 1000);
    }

    if (!activo && segundos !== 0 && tipo === 'Contador') {
      clearInterval(intervalo);
    }

    if (segundos === 0 && tipo === 'Cuenta Regresiva') {
      reset();
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [activo, segundos, tipo]);

  return (
    <div className="app">
      <h2> {tipo} </h2>
      <div className="time">
        <h2> {segundos} </h2>
      </div>
      <br></br>
      <div className="row">
        <button className={`button-primary button-primary-${activo ? 'active' : 'inactive'}`} onClick={toggle}>
          {activo ? 'Pausa' : 'Inicio'}
        </button>
        <button className="button-secundary" onClick={reset}>Reset</button>
      </div>
      {tipo === 'Cuenta Regresiva' &&
        <input id="regresiva" type="number" ref={myRef} onChange={agregaSegundos} placeholder="Ingresa Segundos..." autoComplete="off"/>   
      } 
      <button className="switbutton" onClick={cambioTipo}> {button} </button>
    </div>
  );
};

export default Timer;
