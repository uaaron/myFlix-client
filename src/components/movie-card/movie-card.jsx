import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, token, setUser }) => {
	const [isFavorite, setIsFavorite] = useState(
		user.FavoriteMovies.includes(movie.id)
	);

	const addFavoriteMovie = () => {
		fetch(`https://myflix22-92d05c2f180f.herokuapp.com/users/${user.UserName}/movies/${movie.id}`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => response.json())
			.then((user) => {
				if (user) {
					localStorage.setItem("user", JSON.stringify(user));
					setUser(user);
					setIsFavorite(true);
				}
			})
			.catch((e) => {
				alert("Something went wrong")
			})
	}

	const removeFavoriteMovie = () => {
		fetch(`https://myflix22-92d05c2f180f.herokuapp.com/users/${user.UserName}/movies/${movie.id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then((response) => response.json())
			.then((user) => {
				localStorage.setItem("user", JSON.stringify(user));
				setUser(user);
				setIsFavorite(false);
			})
			.catch((e) => {
				alert("Something went wrong");
			})
	}

	return (
		<Card className="h-100">
			<Card.Img variant="top" src={movie.ImagePath} />
			<Card.Body>
				<Card.Title>{movie.Title}</Card.Title>
				<Link to={`/movies/${encodeURIComponent(movie.id)}`}>
					<Button>More Info</Button>
				</Link>
			</Card.Body>
			<Card.Body>
				{isFavorite ? (
					<Button variant='danger' onClick={removeFavoriteMovie}>
						Remove from Favorite
					</Button>
				) : (
					<Button onClick={addFavoriteMovie}>Add to Favorites</Button>
				)}
			</Card.Body>
		</Card>
	);
};

MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		ImagePath: PropTypes.string.isRequired,
		Director: PropTypes.shape({
			Name: PropTypes.string.isRequired
		}).isRequired,
		Description: PropTypes.string,
		Genre: PropTypes.shape({
			Name: PropTypes.string.isRequired
		}).isRequired,
	}).isRequired
};