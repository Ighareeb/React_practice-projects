import FileSaver from 'file-saver';
import { surpriseMePrompt } from '../constant';

export function getRandomPrompts(prompt) {
	const randomIndex = Math.floor(Math.random() * surpriseMePrompt.length);
	const randomPrompt = surpriseMePrompt[randomIndex];

	//make sure new prompt not the same as current
	if (randomPrompt === prompt) {
		return getRandomPrompts(prompt);
	}
	return randomPrompt;
}

export async function downloadImage(_id, photo) {
	FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
