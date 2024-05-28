# MovieMate

## Descrizione
L'obiettivo è creare un sistema di raccomandazione di film basato sulle preferenze degli utenti. Il sistema deve essere in grado di memorizzare informazioni su film, utenti e le interazioni tra questi due elementi, come le recensioni e le valutazioni. La scelta di un database NoSQL è motivata dalla necessità di gestire dati non strutturati e scalabilità orizzontale.

## Struttura del database

### Collezioni principali
1. Utente (user):
    ```bash
        {
            "user_id": "string",
            "name": "string",
            "email": "string",
            "age": "number",
            "preferences": ["string"],
            "watchlist": ["string"],  // ID dei film nella watchlist
            "watched": ["string"],  // ID dei film già visti
            "ratings": [  // Lista delle valutazioni date ai film
                {
                "movie_id": "string",
                "rating": "number",
                "review": "string"
                }
            ]
        }

2. Film (movie):
    ```bash
        {
            "movie_id": "string",
            "poster" : "string",
            "title": "string",
            "genre": "string",
            "overview" : "string",
            "director": "string",
            "cast": ["string"],
            "release_year": "number",
            "rating" : "number",
            "meta_score" : "number",
            "gross" : "number",
            "reviews": [  // Lista delle recensioni
                {
                "user_id": "string",
                "rating": "number",
                "review": "string"
                }
            ]
        }


## Scelta del database
Per questo progetto, MongoDB è una scelta eccellente per la sua flessibilità nella gestione dei dati documentali e la facilità di scalabilità.

## Funzionalità
1. Registrazione e Gestione degli Utenti: creazione di nuovi profili utente e gestione delle preferenze e delle watchlist degli utenti.
2. Catalogo Film: Aggiunta e aggiornamento delle informazioni sui film e gestione delle valutazioni e delle recensioni dei film.
3. Raccomandazioni Personalizzate (opzionale): Algoritmo di raccomandazione che suggerisce film basati sulle preferenze degli utenti e sulle interazioni passate.

## Implementazione
1. Setup del Database:
    - Creazione delle collezioni "Users", "Movies", e "Interactions" in MongoDB.
    - Definizione degli indici per ottimizzare le query (es. indicizzare per user_id e movie_id).
2. Algoritmo di Raccomandazione:
    - Utilizzo di tecniche di collaborative filtering e content-based filtering per generare suggerimenti di film.
3. API di Accesso:
    - Implementazione di un'API REST per l'accesso ai dati e per le operazioni CRUD
4. Interfaccia Utente:
    - Sviluppo di una semplice interfaccia web per la visualizzazione dei film e delle raccomandazioni.

## Dataset
Per il progetto di un sistema di raccomandazione di film con un database NoSQL, è essenziale avere accesso a dataset di qualità. Alcune opzioni di dataset pubblicamente disponibili possono essere:
1.  MovieLens
2.  IMDb Datasets

## Conclusione
Questo progetto non solo offre una grande opportunità di apprendere le basi dei database NoSQL, ma anche di implementare funzionalità pratiche che possono essere utili in un contesto reale. Inoltre, l'uso di MongoDB consente di sfruttare la flessibilità e la scalabilità necessarie per gestire un volume di dati in crescita.
