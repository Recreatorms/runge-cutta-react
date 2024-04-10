import React, { useCallback } from "react";

import { TextField } from "@mui/material";

const NumberTextField = ({ label, value, onChange, min = undefined, readonly = undefined }) => {
	const handleChange = useCallback((e) => {
		const newValue = Number(e.target.value);

		if (min !== undefined && newValue <= min) {
			console.log(newValue, min);
			return;
		}
		onChange(newValue);
	}, []);

	return (
		<TextField
			label={label}
			size="small"
			type="number"
			fullWidth
			inputProps={{
				maxLength: 13,
				step: "0.1",
			}}
			disabled={readonly}
			value={value}
			onChange={handleChange}
		/>
	);
};

export default React.memo(NumberTextField);
