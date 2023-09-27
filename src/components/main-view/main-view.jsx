import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import inception from "../../../img/inception.jpg";
import theGodfather from "../../../img/thegodfather.jpg";
import matrix from "../../../img/matrix.jpg";

export const MainView = () => {
	const [movies, setMovies] = useState([
		{
			id: 1,
			title: "Inception",
			description: "A heist involves going into peoples dreams",
			director: "Mark Normand",
			genre: "Thriller",
			imagePath: inception
		},
		{
			id: 2,
			title: "The Godfather",
			description: "A fight between powerful italian families",
			director: "Martin Scorecese",
			genre: "Drama",
			imagePath: theGodfather
		},
		{
			id: 3,
			title: "The Matrix",
			description: "A coder finds out he is living in a simulation",
			director: "Shane Gillis",
			genre: "Action",
			imagePath: matrix
		}
	])

	const [selectedMovie, setSelectedMovie] = useState(null);

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