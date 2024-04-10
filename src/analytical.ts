const func1 = (x) => Math.cos(Math.PI * x) + (2 / Math.pow(Math.PI, 2)) * x;
const func2 = (x) => -Math.PI * Math.sin(Math.PI * x);

export const analytical = (x, y, z, step, xTarget) => {
	const data = [];

	while (x < xTarget + step) {
		data.push({ x, y: func1(x), z: func2(x) });
		x += step;
	}
	return data;
};
