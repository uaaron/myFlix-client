import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
	return (
		<div
			onClick={() => {
				onMovieClick(movie);
			}}
		>
			{movie.Title}
		</div>
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
	}).isRequired,
	onMovieClick: PropTypes.func.isRequired
};