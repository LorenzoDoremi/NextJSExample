import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
// come si possono importare componenti da altre pagine
import handler from './api/hello'



export default function Home() {

  /* il più semplice hook */
  const[counter, setCounter] = useState(1);




  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Qua trovi un'altra<a href="second_page">Pagina!</a>
        </h1>

        {/* così si fa un commento */}
         <CounterButton execution={setCounter} value={counter} />
         <h2>{counter}</h2>

          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
       </main>
     
    </div>
  )
}

// una funzione componente (come un bottone, un messaggio della chat, un'icona interattiva)
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
