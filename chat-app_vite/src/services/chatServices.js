import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { auth, firestore as db, storage } from '../config/firebase';
import {
	collection,
	getDocs,
	getDoc,
	addDoc,
	arrayUnion,
	updateDoc,
	deleteDoc,
	doc,
	setDoc,
	serverTimestamp,
	where,
	query,
} from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

//create user
export const createUserAsync = async (creds) => {
	try {
		const user = {
			username: creds.username,
			email: creds.email,
			desc: 'Hi there! I am using Chat App.',
			profile: '',
			createdAt: serverTimestamp(),
		};
		return await setDoc(doc(db, 'users', creds.uid), user);
	} catch (err) {
		console.log(`Error creating user: ${err}`);
	}
};

//update user
export const updateUserAsync = async (updatedUser, profileImage) => {
	try {
		const creds = auth.currentUser; //get user creds from firebase auth
		const userDoc = doc(db, 'users', creds.uid); // ref to document in 'users' collection of user in firestore
		if (profileImage) {
			const location = `/images/users/${creds.uid}/profile/`;
			const urls = await uploadFiles([profileImage], location);
			if (urls.length > 0) {
				updatedUser.profile = urls[0];
				await updateProfile(creds, {
					photoURL: urls[0].url,
					displayName: updatedUser.username,
				});
			}
		}
		await updateDoc(userDoc, updatedUser);
		const snapshot = await getDoc(userDoc);
		return getSnapshotData(snapshot);
	} catch (err) {
		console.log(`Error updating user: ${err}`);
	}
};

//delete user
export const deleteUserAsync = async (id) => {
	try {
		const userDoc = doc(db, 'users', id);
		const res = await deleteDoc(userDoc);
		return res;
	} catch (err) {
		console.log(`Error deleting user: ${err}`);
	}
};

//get all users
export const getUsersAsync = async (user) => {
	if (!user) return;
	try {
		const snapshots = await getDocs(
			query(collection(db, 'users'), where('email', '!=', user.email)),
		);
		const users = snapshots.docs.map((userItem) => getSnapshotData(userItem));
		return users;
	} catch (err) {
		console.log(`Error getting all users: ${err}`);
	}
};

//get a user by id
export const getUserAsync = async (id) => {
	try {
		const userDoc = doc(db, 'users', id);
		const snapshot = await getDoc(userDoc);
		return getSnapshotData(snapshot);
	} catch (err) {
		console.log(`Error getting user by id: ${err}`);
	}
};

//conversations
export const createConversationAsync = async (userId, friendId) => {
	try {
		console.log(userId, friendId);
		const conv = {
			members: [userId, friendId],
			last: { message: '', createdAt: null },
			createdAt: serverTimestamp(),
		};

		const convDoc = await addDoc(collection(db, 'conversations'), conv);
		let result = null;
		const convId = convDoc.id;
		if (convId) {
			//get friend info
			const userDoc = doc(db, 'users', friendId);
			const user_res = await getDoc(userDoc);
			const user_data = getSnapshotData(user_res);

			const res_conv = await getDoc(convDoc);
			if (res_conv) {
				result = {
					...res_conv.data(),
					id: convId,
					friend: {
						id: user_data.id,
						username: user_data.username,
						profile: user_data.profile,
					},
				};
			}
		}
		return result;
	} catch (err) {
		console.log(`Error creating conversation: ${err}`);
	}
};

//messages
export const createMessageAsync = async (message, images) => {
	try {
		if (images.length > 0) {
			//upload images first
			const location = `/images/messages/${message.conversationId}/`;
			const urls = await uploadFiles(images, location);
			if (urls.length > 0) {
				message.images = arrayUnion(...urls);
			} else {
				message.images = arrayUnion();
			}
		}
		const newMessage = {
			...message,
			createdAt: serverTimestamp(),
		};

		const msgDoc = await addDoc(collection(db, 'messages'), newMessage);
		const messageId = msgDoc.id;
		if (messageId) {
			const msg_res = await getDoc(msgDoc);
			const msg = getSnapshotData(msg_res);
			//update converstaion with last message
			const convDoc = doc(db, 'conversations', msg.conversationId);
			await updateDoc(convDoc, {
				last: { message: msg.message, createdAt: msg.createdAt },
			});
			return msg;
		}
	} catch (err) {
		console.log(`Error creating message: ${err}`);
	}
};

export const getMsgQueryByConversationId = (convId) => {
	return query(
		collection(db, 'messages'),
		where('conversationID', '==', convId),
	);
};
export const getConverstionsQueryByUser = (userId) => {
	return query(
		collection(db, 'conversations'),
		where('members', 'array-contains', userId),
	);
};

//helper functions
const uploadFiles = async (files, location) => {
	let filesUrls = [];
	for (const item of files) {
		const storageRef = ref(storage, `${location}${item.filename}`);
		const uploadTask = await uploadBytes(storageRef, item.file);
		const downloadUrl = await getDownloadURL(uploadTask.ref);

		filesUrls.push({
			origin: item.origin,
			filename: item.filename,
			url: downloadUrl,
		});
	}
	return filesUrls;
};

export const getSnapshotData = (snapshot) => {
	if (!snapshot.exists) return undefined;
	const data = snapshot.data();
	return { ...data, id: snapshot.id };
};
