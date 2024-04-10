import React from "react";

import { AutoSizer } from "react-virtualized";

import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const Chart = ({ data }) => {
	return (
		<div className="chart">
			<AutoSizer>
				{({ width, height }) => (
					<LineChart
						width={width}
						height={height}
						data={data}
						syncId={"1"}
					>
						<XAxis
							dataKey="x"
							interval={"preserveStartEnd"}
							tickFormatter={(value) => value.toFixed(1)}
						/>
						<YAxis />
						<CartesianGrid />
						<Tooltip labelFormatter={(val) => Number(val).toFixed(1)} />
						<Legend />
						<Line
							dot={data.length < 100}
							type="monotone"
							dataKey="y"
							stroke="#8884d8"
						/>
						<Line
							dot={data.length < 100}
							type="monotone"
							dataKey="z"
							stroke="#82ca9d"
						/>
					</LineChart>
				)}
			</AutoSizer>
		</div>
	);
};

export default React.memo(Chart);
