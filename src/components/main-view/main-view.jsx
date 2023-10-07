import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";


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
		<BrowserRouter>
			<Row className="justify-content-md-center">
				<Routes>
					<Route
						path="/signup"
						element={
							<>
								{user ? (
									<Navigate to="/" />
								) : (
									<Col md={5}>
										<SignupView />
									</Col>
								)}
							</>

						}
					/>
					<Route
						path="/login"
						element={
							<>
								{user ? (
									<Navigate to="/" />
								) : (
									<Col md={5}>
										<LoginView onLoggedIn={(user) => setUser(user)} />
									</Col>
								)}
							</>
						}
					/>
					<Route
						path="/movies/:movieId"
						element={
							<>
								{!user ? (
									<Navigate to="/login" replace />
								) : movies.length === 0 ? (
									<Col>The list is empty!</Col>
								) : (
									<Col md={8}>
										<MovieView movies={movies} />
									</Col>
								)}
							</>
						}
					/>
					<Route
						path="/"
						element={
							<>
								{!user ? (
									<Navigate to="/login" replace />
								) : movies.length === 0 ? (
									<Col>The list is empty!</Col>
								) : (
									<>
										{movies.map((movie) => (

											<Col className="mb-4" key={movie.id} md={3}>
												<MovieCard movie={movie} />
											</Col>

										))}
										<Link to="/login">
											<button>Logout</button>
										</Link>
									</>
								)}
							</>
						}
					/>
				</Routes>
			</Row>
		</BrowserRouter >
	);
};