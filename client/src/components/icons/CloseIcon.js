import React from 'react';

function CloseIcon(props) {
	
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
		position: 'relative',
	};

	const styleBar1 = {
		backgroundColor: props.color,		
		width: Math.sqrt(2*Math.pow(32/62*props.width, 2)) - 5/2/62*props.width,
		height: 22/3/62*props.width,	
		transform: 'rotate(45deg)'
	}

	const styleBar2 = {
		backgroundColor: props.color,		
		width: Math.sqrt(2*Math.pow(32/62*props.width, 2)) - 5/2/62*props.width,
		height: 22/3/62*props.width,	
		transform: 'rotate(-45deg)',		
		position: 'absolute'
	}
	
	return(
		<div id="outer-box" style={styleOuterBox}>
			<div id="bar1" style={styleBar1}></div>
			<div id="bar2" style={styleBar2}></div>			
		</div>
	);
}

export default CloseIcon;