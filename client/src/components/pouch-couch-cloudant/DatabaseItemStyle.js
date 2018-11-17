const style = (width) => {
	return {
		wrapper: {
			border: `${5/62*0.05*width}px solid red`,
			borderRadius: 0.025*width,
			backgroundColor: 'hsl(40, 50%, 70%)',
			display: 'grid',
			padding: 0.03*width,
			gridTemplateColumns: `10% auto`,
			gridTemplateRows: 'auto auto auto',
			gridRowGap: 0.015*width,
			gridColumnGap: 0.015*width,
			alignItems: 'center',
			position: 'relative',
			fontSize: 0.02*width,
		},
		closeIcon: {
			position: 'absolute',
			top: 0.02*width,
			right: -0.025*width,
		},
		editIcon: {
			position: 'absolute',
			top: 0.0725*width,
			right: -0.025*width,
		}
	};
}

export default style;