export default function msToTime(duration: number): string {
	const seconds = Math.floor((duration / 1000) % 60);
	const minutes = Math.floor((duration / (1000 * 60)) % 60);
	const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

	const paddingMinutes = minutes === 0 ? '00' : minutes;
	const paddingSeconds = seconds < 10 ? '0' + seconds : seconds;

	return `${hours > 0 ? `${hours}:` : ''}${paddingMinutes}:${paddingSeconds}`;
}
