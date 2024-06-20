import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './EditMovieForm.css';

const EditMovieForm = () => {
    const { movie_id } = useParams(); // Recupera movie_id dalla URL
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Recupera i dettagli del film quando il componente viene caricato
        axios.get(`/api/manage_movie/${movie_id}`)
            .then(response => {
                setMovie(response.data); // Imposta lo stato del film con i dati ricevuti
                // Popola i campi del form con i valori del film
                Object.keys(response.data).forEach(key => {
                    setValue(key, response.data[key]);
                });
                setIsLoading(false); // Imposta lo stato di caricamento a falso
            })
            .catch(error => {
                console.error('Error fetching movie:', error);
                setIsLoading(false); // Imposta lo stato di caricamento a falso
            });
    }, [movie_id, setValue]);

    const handleUpdate = (data) => {
        axios.put(`/api/update_movie/${movie_id}`, data)
            .then(response => {
                console.log('Movie updated successfully:', response.data);
                setMessage('Movie updated successfully!');
                setTimeout(() => {
                    navigate('/api/get_movies');
                }, 3000); // Ritarda la navigazione di 3 secondi
            })
            .catch(error => {
                console.error('Error updating movie:', error);
                setMessage('Error updating movie. Please try again.');
            });
    };

    const handleDelete = () => {
        axios.delete(`/api/delete_movie/${movie_id}`)
            .then(response => {
                console.log('Movie deleted successfully:', response.data);
                setMessage('Movie deleted successfully!');
                setTimeout(() => {
                    navigate('/api/get_movies');
                }, 3000); // Ritarda la navigazione di 3 secondi
            })
            .catch(error => {
                console.error('Error deleting movie:', error);
                setMessage('Error deleting movie. Please try again.');
            });
    };

    if (isLoading) {
        return <div>Loading...</div>; // Messaggio di caricamento durante il recupero dei dati del film
    }

    return (
        <div className="form-container">
            <h2>Edit Movie</h2>
            <form onSubmit={handleSubmit(handleUpdate)}>
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
                </div>
                <button type="submit">Update Movie</button>
                {/* Usa button type="button" per evitare il submit del form */}
                <button type="button" onClick={handleDelete}>Delete Movie</button>
            </form>
            {message && <p className={message.includes('Error') ? 'error-message' : 'success-message'}>{message}</p>}
        </div>
    );
};

export default EditMovieForm;
