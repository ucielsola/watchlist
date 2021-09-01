import React, { useState } from 'react';
import { GlobalProvider } from './context/GlobalState';
import { AuthProvider } from './context/AuthContext';
import { SignUp } from './components/SignUp';
import { LogIn } from './components/Login';
import { ForgotPassword } from './components/ForgotPassword';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';
import { Header } from './components/Header';
import { Watchlist } from './components/Watchlist';
import { Watched } from './components/Watched';
import { Add } from './components/Add';
import { ProfilePage } from './components/ProfilePage';
import { PrivateRoute } from './components/PrivateRoute';
import './App.css';

function App() {
	const [darkTheme, setDarkTheme] = useState(true);

	return (
		<Router>
			<AuthProvider>
				<GlobalProvider>
					<ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
						<Header />
						<Switch>
							<Route path="/watchlis-v3/signup" component={SignUp} />
							<Route path="/watchlis-v3/login" component={LogIn} />
							<Route path="/watchlis-v3/forgot-password" component={ForgotPassword} />
							<PrivateRoute exact path="/watchlis-v3/" component={Watchlist} />
							<PrivateRoute path="/watchlis-v3/watched" component={Watched} />
							<PrivateRoute path="/watchlis-v3/add" component={Add} />
							<PrivateRoute path="/watchlis-v3/profile" component={ProfilePage} />
						</Switch>
					</ThemeContext.Provider>
				</GlobalProvider>
			</AuthProvider>
		</Router>
	);
}

export default App;
