import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
	const [movies, setMovies] = useState([])
	const [selectedMovie, setSelectedMovie] = useState(null);

	useEffect(() => {
		fetch("https://myflix22-92d05c2f180f.herokuapp.com/movies")
			.then((response) => response.json())
			.then((data) => {
				const moviesFromApi = data.map((doc) => {
					return {
						title: doc.title,
						image: doc.imagePath,
						director: doc.director,
						genre: doc.genre,
						description: doc.description
					};
				});

				setMovies(moviesFromApi)
			});
	}, []);

	if (selectedMovie) {
		return (
			<MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
		)
	}

	if (movies.length === 0) {
		return <div>The list is empty!</div>
	}

	return (
		<div>
			{movies.map((movie) => (
				<MovieCard
					key={movie.id}
					movie={movie}
					onMovieClick={(newSelectedMovie) => {
						setSelectedMovie(newSelectedMovie);
					}}
				/>
			))}
		</div>
	)
}