import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap";

export const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem("user"));
	const storedToken = localStorage.getItem("token");
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [token, setToken] = useState(storedToken ? storedToken : null);

	const Header = () =>
		<Nav
			activeKey="/home"
			onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
		>
			<Nav.Item>
				<Nav.Link href="/home">MovieFlix</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="link-1">About</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="link-2">Portfolio Site</Nav.Link>
			</Nav.Item>
		</Nav>


	useEffect(() => {
		if (!token) {
			return;
		}

		fetch("https://myflix22-92d05c2f180f.herokuapp.com/movies", {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then((response) => response.json())
			.then((data) => {
				const moviesFromApi = data.map((doc) => {
					return {
						id: doc._id,
						Title: doc.Title,
						ImagePath: doc.ImagePath,
						Director: doc.Director,
						Genre: doc.Genre,
						Description: doc.Description
					};
				});

				setMovies(moviesFromApi)
			});
	}, [token]);



	return (
		<Row className="justify-content-md-center">
			{!user ? (
				<>
					<Header />
					<br></br>
					<br></br>
					<Col md={5}>
						<LoginView
							onLoggedIn={(user, token) => {
								setUser(user);
								setToken(token);
							}}
						/>
						<br></br>
						or Signup
						<br></br>
						<br></br>
						<SignupView />
					</Col>
				</>
			) : selectedMovie ? (
				<Col md={8} style={{ border: "1px solid black" }}>
					<MovieView
						style={{ border: "1px solid green" }}
						movie={selectedMovie}
						onBackClick={() => setSelectedMovie(null)}
					/>
				</Col>
			) : movies.length === 0 ? (
				<div>The list is empty!</div>
			) : (
				<>
					{movies.map((movie) => (
						<Col className="mb-5" key={movies.id} md={3}>
							<MovieCard
								key={movie.id}
								movie={movie}
								onMovieClick={(newSelectedMovie) => {
									setSelectedMovie(newSelectedMovie);
								}}
							/>
						</Col>
					))}
					<button onClick={() => {
						setUser(null);
						setToken(null);
						localStorage.removeItem('user');
						localStorage.removeItem('token')
					}}>Logout</button>
				</>
			)}
		</Row>
	)
}