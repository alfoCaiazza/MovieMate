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
