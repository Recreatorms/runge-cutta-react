export const func1 = (x: number, y: number, z: number) => {
	return z;
};

export const func2 = (x: number, y: number, z: number) => {
	return 2 * x - Math.pow(Math.PI, 2) * y;
};

export const rungeKuttaSecondOrder = (
	x0: number,
	y0: number,
	z0: number,
	step: number,
	xTarget: number
) => {
	let x: number = x0;
	let y: number = y0;
	let z: number = z0;
	const data = [{ x, y, z }];
	while (x < xTarget) {
		const k1y = step * func1(x, y, z);
		const k1z = step * func2(x, y, z);

		const k2y = step * func1(x + step / 2, y + k1y / 2, z + k1z / 2);
		const k2z = step * func2(x + step / 2, y + k1y / 2, z + k1z / 2);

		const k3y = step * func1(x + step / 2, y + k2y / 2, z + k2z / 2);
		const k3z = step * func2(x + step / 2, y + k2y / 2, z + k2z / 2);

		const k4y = step * func1(x + step, y + k3y, z + k3z);
		const k4z = step * func2(x + step, y + k3y, z + k3z);

		y += (k1y + 2 * k2y + 2 * k3y + k4y) / 6.0;
		z += (k1z + 2 * k2z + 2 * k3z + k4z) / 6.0;

		x += step;

		data.push({ x, y, z });
	}

	return data;
};
