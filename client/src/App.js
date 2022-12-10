import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
//Routing
import PrivateRoutes from './components/routing/PrivateRoutes';

import WelcomeScreen from './components/screens/WelcomeScreen.js';
import PageNotFound from './components/screens/PageNotFound.js';
//AuthScreens
import HomeScreen from './components/screens/private/HomeScreen.js';
import LoginScreen from './components/screens/auth/LoginScreen.js';
import RegisterScreen from './components/screens/auth/RegisterScreen.js';
import ForgotPasswordScreen from './components/screens/auth/ForgotPasswordScreen.js';
import ResetPasswordScreen from './components/screens/auth/ResetPasswordScreen.js';
//PrivateScreens
import EditProfileScreen from './components/screens/private/EditProfileScreen.js';
import PublicProfileScreen from './components/screens/private/PublicProfileScreen.js';
import SearchScreen from './components/screens/private/SearchScreen';
import MyBeatsScreen from './components/screens/private/MyBeatsScreen';
import EditBeatScreen from './components/screens/private/EditBeatScreen';
import AddBeatScreen from './components/screens/private/AddBeatScreen';
import { Modal } from "./components/utils/Modal";
import { getUserPrivateDataAction } from './redux/Actions';

const App = () => {
	const dispatch = useDispatch();
	const { token, loading, msg, error, success, updateData } = useSelector((state) => state);

	React.useEffect(() => {
		if (updateData) {
			dispatch(getUserPrivateDataAction());
		}
	}, [updateData]);

	const [openModal, setOpenModal] = React.useState(msg==='' ? false : true);

	React.useEffect(() => {
		setOpenModal(()=>{return false});
		if (msg !== '') {
			//fuerzo abrirlo
			setOpenModal(() => { return true });
		}else{
			setOpenModal(() => { return false });
		}
		
		let timeout =setTimeout(() => {
			setOpenModal(()=>{return false})
		}, 3000);

		return(()=>{
			clearTimeout(timeout);
		})
	}, [msg]);


	const closeModal = () => {
		setOpenModal(() => { return false });
	}

	return (
		<Router>
			{
				<div className='App'>
					{loading && <div className='popup-msg'>{msg}</div>}

					<Modal
						isOpen={openModal}
						handleClose={closeModal}
						isError={error === false ? false : true}
						isSuccess={success === true ? true : false}
					>
						{error && <p>{error}</p>}
						{msg && <p>{msg}</p>}

					</Modal>

					<Routes>
						{/*Rutas para la autenticacion*/}
						<Route exact path="/login" element={token ? <HomeScreen /> : <LoginScreen />} />
						<Route exact path="/register" element={token ? <HomeScreen /> : <RegisterScreen />} />
						<Route exact path="/forgotPassword" element={<ForgotPasswordScreen />} />
						<Route exact path="/resetPassword/:resetToken" element={<ResetPasswordScreen />} />
						{/*Rutas privadas para artistas y productores*/}
						<Route element={<PrivateRoutes />}>
							<Route exact path="/" element={token ? <HomeScreen /> : <LoginScreen />} />
							<Route exact path="/search" element={token ? <SearchScreen /> : <LoginScreen />} />
							<Route exact path="/profile/edit" element={token ? <EditProfileScreen /> : <LoginScreen />} />
							<Route exact path="/:username" element={token ? <PublicProfileScreen /> : <LoginScreen />} />
							<Route exact path="/:username/beats" element={token ? <MyBeatsScreen /> : <LoginScreen />} />
							<Route exact path="/:username/beats/add" element={token ? <AddBeatScreen /> : <LoginScreen />} />
							<Route exact path="/:username/beat/:id" element={token ? <EditBeatScreen /> : <LoginScreen />} />
						</Route>
						{/*Welcome screen & 404 screen*/}
						<Route index exact path="/welcome" element={token ? <HomeScreen /> : <WelcomeScreen />} />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</div>
			}
		</Router>
	);
}

export default App;