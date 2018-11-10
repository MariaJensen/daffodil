import React from 'react';

function StickyIcon (props) {

	/**	props: 
		*	number width
		*	string color
		*	string backgroundColor
	*/

	const styleOuterBox = {
		width: 52/62*props.width,
		color: props.color,
		backgroundColor: props.backgroundColor,
		borderRadius: '50%',
		border: `${5/62*props.width}px solid ${props.color}`,
		height: 52/62*props.width,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	};

	const styleInnerBox = {
		width: 32/62*props.width,
		height: 32/62*props.width,
		display: 'grid',
		gridTemplateRows: 'auto auto auto auto',
		justifyItems: 'center',
	}

	const innerWidth = 32/62*props.width;
	const innerHeight = (1 + (Math.sqrt(2)-1)/2 )*innerWidth;

	const upperTrapez = {
		width: 0.6*innerWidth,
		height: 0,
		borderLeft: `${0.15*innerWidth}px solid transparent`,
		borderRight: `${0.15*innerWidth}px solid transparent`,
		borderTop: `${0.15*innerHeight}px solid ${props.color}`,		
	}

	const lowerTrapez = {
		width: 0.6*innerWidth,
		height: 0,
		borderLeft: `${0.15*innerWidth}px solid transparent`,
		borderRight: `${0.15*innerWidth}px solid transparent`,
		borderBottom: `${0.15*innerHeight}px solid ${props.color}`,
	}

	const middle = {
		backgroundColor: props.color,	
		width: 0.6*innerWidth,
		height: 0.4*innerHeight,
	}
	
	const needle = {
		width: 0,
		height: 0,
		borderLeft: `${0.09*innerWidth}px solid transparent`,
		borderRight: `${0.09*innerWidth}px solid transparent`,
		borderTop: `${0.3*innerHeight}px solid ${props.color}`,
	}
	
	return(
		<div style={styleOuterBox}>
			<div style={styleInnerBox}>
				<div style={upperTrapez}></div>
				<div style={middle}></div>
				<div style={lowerTrapez}></div>	
				<div style={needle}></div>			
			</div>
		</div>
	);
}

export default StickyIcon;