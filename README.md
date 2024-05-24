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
            "preferences": ["string"],  // generi preferiti, es: ["azione", "comedia"]
            "watchlist": ["string"],  // ID dei film nella watchlist
            "watched": ["string"],  // ID dei film già visti
            "ratings": [  // Lista delle valutazioni date ai film
                {
                "movie_id": "string",
                "rating": "number",  // 1-5 stelle
                "review": "string"
                }
            ]
        }

2. Film (movie):
    ```bash
        {
            "movie_id": "string",
            "title": "string",
            "genre": ["string"],  // generi del film
            "director": "string",
            "cast": ["string"],  // attori principali
            "release_year": "number",
            "ratings": {  // Statistiche delle valutazioni
                "average_rating": "number",
                "total_ratings": "number"
            },
            "reviews": [  // Lista delle recensioni
                {
                "user_id": "string",
                "rating": "number",
                "review": "string"
                }
            ]
        }


3. Interazione (interaction):
    ```bash
        {
            "interaction_id": "string",
            "user_id": "string",
            "movie_id": "string",
            "timestamp": "string",  // data e ora dell interazione
            "action": "string" // tipo di interazione, es: "watched", "rated", "added to watchlist"
        }

## Scelta del database
Per questo progetto, MongoDB è una scelta eccellente per la sua flessibilità nella gestione dei dati documentali e la facilità di scalabilità.

## Funzionalità
1. Registrazione e Gestione degli Utenti: creazione di nuovi profili utente e gestione delle preferenze e delle watchlist degli utenti.
2. Catalogo Film: Aggiunta e aggiornamento delle informazioni sui film e gestione delle valutazioni e delle recensioni dei film.
3. Raccomandazioni Personalizzate (opzionale): Algoritmo di raccomandazione che suggerisce film basati sulle preferenze degli utenti e sulle interazioni passate.

## Implementazione

