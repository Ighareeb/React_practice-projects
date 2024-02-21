import { GoogleAuthenticator, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//need to import from userSlice

export default function OAuth() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return <div>OAuth</div>;
}
