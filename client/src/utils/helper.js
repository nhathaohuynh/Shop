export const slug = (string) =>
	string
		.toString()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '-');

export const formatMoney = (number) =>
	Number(number?.toFixed(1)).toLocaleString('it-IT', {
		style: 'currency',
		currency: 'VND',
	});

export const generateStar = (number) => {
	const defaultStars = [true, true];
	if (!Number(number)) return defaultStars;
	const stars = [];
	for (let i = 0; i < +number; i++) stars.push(true);

	for (let j = 5; j > +number; j--) stars.push(false);

	return stars;
};

export const countdown = (futureDate) => {
	const timeRemaining =
		new Date(futureDate).getTime() - new Date().getTime() + 24 * 60 * 60 * 1000;
	const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
	const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
	const seconds = Math.floor((timeRemaining / 1000) % 60);
	return { hours, minutes, seconds };
};
