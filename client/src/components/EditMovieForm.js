import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './EditMovieForm.css';

const EditMovieForm = () => {
    const { movie_id } = useParams(); // Recupera movie_id dalla URL
    const [movie, setMovie] = useState(null);
    const { register, handleSubmit, setValue } = useForm();
    const [updateMessage, setUpdateMessage] = useState('');

    useEffect(() => {
        // Esegui la chiamata API per recuperare i dettagli del film
        axios.get(`/api/manage_movie/${movie_id}`)
            .then(response => {
                setMovie(response.data); // Imposta lo stato del film con i dati ricevuti
                // Popola i campi del form con i valori del film
                Object.keys(response.data).forEach(key => {
                    setValue(key, response.data[key]);
                });
            })
            .catch(error => {
                console.error('Error fetching movie:', error);
            });
    }, [movie_id, setValue]);

    const onSubmit = (data) => {
        // Esegui la chiamata API per aggiornare il film con i dati del form
        axios.put(`/api/update_movie/${movie_id}`, data)
            .then(response => {
                console.log('Movie updated successfully:', response.data);
                setUpdateMessage('Movie updated successfully!');
            })
            .catch(error => {
                console.error('Error updating movie:', error);
                setUpdateMessage('Error updating movie. Please try again.');

            });
    };

    if (!movie) {
        return <div>Loading...</div>; // Messaggio di caricamento durante il recupero dei dati del film
    }

    return (
        <div className="form-container">
            <h2>Edit Movie</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" {...register('Series_Title')} defaultValue={movie.Series_Title} />
                
                    <label>Released Year:</label>
                    <input type="text" {...register('Released_Year')} defaultValue={movie.Released_Year} />
                    
                    <label>Runtime:</label>
                    <input type="text" {...register('Runtime')} defaultValue={movie.Runtime} />
                    
                    <label>Genre:</label>
                    <input type="text" {...register('Genre')} defaultValue={movie.Genre} />
                    
                    <label>IMDB Rating:</label>
                    <input type="text" {...register('IMDB_Rating')} defaultValue={movie.IMDB_Rating} />
                    
                    <label>Overview:</label>
                    <textarea {...register('Overview')} defaultValue={movie.Overview} />
                    
                    <label>Director:</label>
                    <input type="text" {...register('Director')} defaultValue={movie.Director} />
                    
                    <label>Star 1:</label>
                    <input type="text" {...register('Star1')} defaultValue={movie.Star1} />
                    
                    <label>Star 2:</label>
                    <input type="text" {...register('Star2')} defaultValue={movie.Star2} />
                    
                    <label>Star 3:</label>
                    <input type="text" {...register('Star3')} defaultValue={movie.Star3} />
                    
                    <label>Star 4:</label>
                    <input type="text" {...register('Star4')} defaultValue={movie.Star4} />
                    
                    <label>Number of Votes:</label>
                    <input type="text" {...register('No_of_Votes')} defaultValue={movie.No_of_Votes} />
                    
                    <button type="submit">Update Movie</button>
                </div>
            </form>
            {updateMessage && <p className={updateMessage.includes('Error') ? 'error-message' : 'success-message'}>{updateMessage}</p>}
        </div>
    );
};

export default EditMovieForm;
