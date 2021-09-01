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
							<Route path="/watchslist/signup" component={SignUp} />
							<Route path="/watchslist/login" component={LogIn} />
							<Route path="/watchslist/forgot-password" component={ForgotPassword} />
							<PrivateRoute exact path="/watchslist" component={Watchlist} />
							<PrivateRoute path="/watchslist/watched" component={Watched} />
							<PrivateRoute path="/watchslist/add" component={Add} />
							<PrivateRoute path="/watchslist/profile" component={ProfilePage} />
						</Switch>
					</ThemeContext.Provider>
				</GlobalProvider>
			</AuthProvider>
		</Router>
	);
}

export default App;
