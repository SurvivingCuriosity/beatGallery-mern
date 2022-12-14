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
import PrivateProfileScreen from './components/screens/private/PrivateProfileScreen.js';
import SearchScreen from './components/screens/private/SearchScreen';
import MyBeatsScreen from './components/screens/private/MyBeatsScreen';
import EditBeatScreen from './components/screens/private/EditBeatScreen';
import AddBeatScreen from './components/screens/private/AddBeatScreen';
import { Modal } from "./components/utils/Modal";
import { getUserPrivateDataAction, confirmDeleteBeat, messageShown, denyAction } from './redux/Actions';
import { ConfirmModal } from './components/utils/ConfirmModal';

const App = () => {
	const dispatch = useDispatch();
	const { token, loading, msg, error, success, updateData, needsConfirm, pendingAction } = useSelector((state) => state);
	const [openModal, setOpenModal] = React.useState(msg==='' ? false : true);
	const [openConfirmModal, setOpenConfirmModal] = React.useState(false);

	React.useEffect(() => {
		if (updateData===true) {
			dispatch(getUserPrivateDataAction());
		}
	}, [updateData]);


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
			dispatch(messageShown());
		}, 3000);

		return () => {
			clearTimeout(timeout)
		}
	}, [msg]);

	React.useEffect(() => {
		setOpenConfirmModal(() => { return false });
		if (!needsConfirm) {
			setOpenConfirmModal(() => { return false });
		} else {
			setOpenConfirmModal(() => { return true });
		}
	}, [needsConfirm, pendingAction]);


	const closeModal = () => {
		setOpenModal(() => { return false });
		setOpenConfirmModal(() => { return false });
	}
	const confirmPendingAction = () => {
		switch (pendingAction?.action) {
			case 'DELETE_BEAT':
				dispatch(confirmDeleteBeat(pendingAction?.targetId))
				break;
		
			default:
				break;
		}
	} 
	const denyPendingAction = () => {
		setOpenConfirmModal(()=>{return false})
		dispatch(denyAction())
	} 

	return (
		<Router>
			{
				<div className='App'>
					 <Modal
						isOpen={openModal}
						handleClose={closeModal}
						isError={error === false ? false : true}
						isSuccess={success === true ? true : false}
					>
						{error && <p>{error}</p>}
						{msg && <p>{msg}</p>}

					</Modal>

					<ConfirmModal
						isOpen={openConfirmModal}
						handleClose={closeModal}
						isError={error === false ? false : true}
						isSuccess={success === true ? true : false}
						callbackNo={denyPendingAction}
						callbackYes={confirmPendingAction}
					>
						{needsConfirm && <p>{needsConfirm}</p>}

					</ConfirmModal>

					<Routes>
						{/*Rutas para la autenticacion*/}
						<Route exact path="/login" element={token ? <HomeScreen /> : <LoginScreen />} />
						<Route exact path="/register" element={token ? <HomeScreen /> : <RegisterScreen />} />
						<Route exact path="/forgotPassword" element={<ForgotPasswordScreen />} />
						<Route exact path="/resetPassword/:resetToken" element={<ResetPasswordScreen />} />
						{/* Rutas publicas */}
						<Route exact path="/search" element={<SearchScreen />} />
						<Route exact path="/:username" element={<PublicProfileScreen />} />

						{/*Rutas privadas para artistas y productores*/}
						<Route element={<PrivateRoutes />}>
							<Route exact path="/" element={token ? <HomeScreen /> : <LoginScreen />} />
							<Route exact path="/profile/edit" element={token ? <EditProfileScreen /> : <LoginScreen />} />
							<Route exact path="/profile" element={token ? <PrivateProfileScreen /> : <LoginScreen />} />
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