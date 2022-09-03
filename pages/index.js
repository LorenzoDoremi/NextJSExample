import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

// serve una versione particolare che giri via client
import io, { Socket } from "socket.io-client";
// come si possono importare componenti da altre pagine

let socket;

const Home = () => {
  const [input, setInput] = useState("");
  const [global, setGlobal] = useState("");
  const [counter, setCounter] = useState(1);
  useEffect(() => {
    socketInitializer();
    // pericoloso aggiungere useState qua dentro -> loop infinito!!!
  });

  // mi assicuro che il server per il socket sia attivo
  const socketInitializer = async () => {
    await fetch("/api/socket");
    // attivo la socket
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("update-input", (msg) => {
      setGlobal(msg);
    });
  };

  // quando modifico il form, eseguo un socket emit.
  const onChangeHandler = (e) => {
    setInput(e.target.value);
    socket.emit("input-change", e.target.value);
  };

  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Qua trovi un'altra<a href="second_page">Pagina!</a>
        </h1>

        <CounterButton execution={setCounter} value={counter} />
        <h2>{counter}</h2>


        <input
        placeholder="Comunica con il mondo"
        value={input}
        onChange={onChangeHandler}
      />
      <textarea type="textarea" rows="10" placeholder="Qua tutti scrivono globalmente!" value={global}></textarea>

      
      <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </main>
   
    </>
  );
};

function CounterButton({execution, value}) {

  // una funzione che esegue la funzione ricevute (execution in questo. nome a scelta)
  function handleCounter() {
    console.log("press!")
    execution(value*2)
  }
  return(

    <button onClick={handleCounter}>Premi per raddoppiare il valore: {value}</button>
  )

}
export default Home;
