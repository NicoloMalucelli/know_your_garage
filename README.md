# Preparazione
aprire un terminale sulla root del progetto ed eseguire i seguenti comandi:
- cd client
- npm install
- cd ../server
- npm install
    
# Inizializzazione del database con i dati di test

I seguenti passaggi sono da svolgere qualora si voglia testare l’operatività del sistema. I dati che saranno importati sono dati di test creati in maniera artificiale,
pertanto non corrispondono in alcun modo alla realtà.
- Connettersi a MongoDB sulla porta 27017 utilizzando lo strumento MongoDB Compass
- Creare un nuovo database dal nome knowYourGarage ed una prima
collezione dal nome cars
- Creare le seguenti nuove collezioni admins, users, garages, parkings,
passes e purchasedpasses
- Per ognuna delle collezioni create inserire i dati cliccando prima sulla collezione stessa e poi sul pulsante addData. I file json contenenti le collezioni
si trovano nella cartella ./database posizionata nella root del progetto.

# Esecuzione
- Aprire un terminale sulla root del progetto ed eseguire i seguenti comandi:
  - cd server
  - npm start

- Aprire un secondo terminale sulla root del progetto ed eseguire i seguenti comandi:
  - cd client
  - npm run-script dev

# Utilizzo
Per utilizzare l’applicativo con un account utente finale, visitare http://localhost:8080/
È possibile quindi creare un nuovo profilo utente o utilizzare uno di quelli già esistenti, come ad esempio:
- email: mario.rossi@example.com
- password: password

Per utilizzare un account con un account gestore di parcheggi visitare la
sezione admin del sito http://localhost:8080/admin ed effettuare l’accesso con le seguenti credenziali:
- email: comune.cesena@example.com
- password: password
