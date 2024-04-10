import React, { useCallback, useEffect, useState } from "react";

import Chart from "Chart";
import NumberTextField from "NumberTextField";

import { analytical } from "analytical";
import { rungeKuttaSecondOrder } from "rungeKutta";

import "./App.css";

type Vector = {
	x: number;
	y: number;
	z: number;
};

const App = () => {
	const [calculatedData, setCalculatedData] = useState<Vector[]>([]);
	const [analyticalData, setAnalyticalData] = useState<Vector[]>([]);

	const [x0, setX0] = useState(0);
	const [y0, setY0] = useState(1);
	const [z0, setZ0] = useState(0);
	const [step, setStep] = useState(0.1);
	const [xTarget, setXTarget] = useState(6 * Math.PI);

	const rungeCuttaAt = (x: number) => calculatedData.find((v) => v.x.toFixed(1) === x.toFixed(1));

	const analyticalAt = (x: number) => analyticalData.find((v) => v.x.toFixed(1) === x.toFixed(1));

	const calculate = useCallback(() => {
		setCalculatedData(rungeKuttaSecondOrder(x0, y0, z0, step, xTarget));
		setAnalyticalData(analytical(x0, y0, z0, step, xTarget));
	}, [x0, y0, z0, step, xTarget]);

	useEffect(() => {
		calculate();
	}, [calculate]);
	console.log(calculatedData);
	console.log(analyticalData);
	return (
		<div className="app-container">
			<div className="input-fields-wrapper">
				<h3>Начальные значения</h3>
				<div className="input-fields">
					<NumberTextField
						label="x0"
						value={x0}
						onChange={setX0}
						readonly
					/>
					<NumberTextField
						label="y0"
						value={y0}
						onChange={setY0}
						readonly
					/>
					<NumberTextField
						label="z0"
						value={z0}
						onChange={setZ0}
						readonly
					/>
					<NumberTextField
						label="Шаг"
						value={step}
						onChange={setStep}
						min={0}
					/>
					<NumberTextField
						label="x target"
						value={xTarget}
						onChange={setXTarget}
					/>
				</div>
			</div>

			<div className="solution">
				<h3>Рассчитанное решение</h3>
				<div className="text">
					<span>
						Значение <i>y</i> в точке <i>x</i> = {xTarget} равно{" "}
						{rungeCuttaAt(xTarget)?.y}
					</span>
					<span>
						Значение <i>z</i> в точке <i>x</i> = {xTarget} равно{" "}
						{rungeCuttaAt(xTarget)?.z}
					</span>
				</div>
				<Chart data={calculatedData} />
			</div>
			<div className="solution">
				<h3 style={{ display: "flex", gap: "4rem" }}>
					Аналитическое решение <code>{`y=cos(πx)+2x/π^2`}</code>
					<code>{`z=-πsin(πx)`}</code>
				</h3>
				<div className="text">
					<span>
						Значение <i>y</i> в точке <i>x</i> = {xTarget} равно{" "}
						{analyticalAt(xTarget)?.y}
					</span>
					<span>
						Значение <i>z</i> в точке <i>x</i> = {xTarget} равно{" "}
						{analyticalAt(xTarget)?.z}
					</span>
				</div>
				<Chart data={analyticalData} />
			</div>
		</div>
	);
};

export default App;
