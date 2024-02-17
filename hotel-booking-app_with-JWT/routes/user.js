import express from 'express';
import { getUser, getUsers, updateUser, deleteUser } from '../controllers/user';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken';
const router = express.Router();

//check if user is authenticated (verifyToken)
router.get('/checkauthentication', verifyToken, (req, res) => {
	res.send('You are logged in');
});
//check if user is authenticated and has correct permissions (verifyUser)
router.get('/checkuser/:id', verifyUser, (req, res) => {
	res.send('You are logged in and have correct permissions');
});
//check if Admin is authenticated [built in permission from model] (verifyAdmin)
router.get('/checkadmin/:id', verifyAdmin, (req, res) => {
	res.send('You are logged in as Admin');
});

router.get('/:id', verifyUser, getUser);
router.get('/', verifyAdmin, getUsers);
router.put('/:id', verifyUser, updateUser);
router.delete('/:id', deleteUser);

export default router;
