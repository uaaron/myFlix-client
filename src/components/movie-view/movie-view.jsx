import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
	return (
		<div>
			<div>
				<img src={movie.ImagePath} />
			</div>
			<div>
				<span>Title: </span>
				<span>{movie.Title}</span>
			</div>
			<div>
				<span>Description: </span>
				<span>{movie.Description}</span>
			</div>
			<div>
				<span>Director: </span>
				<span>{movie.Director.Name}</span>
			</div>
			<div>
				<span>Genre: </span>
				<span>{movie.Genre.Name}</span>
			</div>
			<button onClick={onBackClick}>Back</button>
		</div>
	);
};

MovieView.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		ImagePath: PropTypes.string.isRequired,
		Director: PropTypes.string.isRequired,
		Description: PropTypes.string,
		Genre: PropTypes.string
	}).isRequired,
	onBackClick: PropTypes.func.isRequired
};