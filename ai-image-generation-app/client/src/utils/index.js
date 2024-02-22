import FileSaver from 'file-saver';
import { surpriseMePrompts } from '../constant';

export function getRandomPrompts(prompt) {
	const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
	const randomPrompt = surpriseMePrompts[randomIndex];

	//make sure new prompt not the same as current
	if (randomPrompt === prompt) {
		return getRandomPrompts(prompt);
	}
	return randomPrompt;
}

export async function downloadImage(_id, photo) {
	FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
