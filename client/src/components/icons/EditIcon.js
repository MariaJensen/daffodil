import React from 'react';

function EditIcon(props) {
	
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

	const bar = {	
		width: Math.sqrt(2*Math.pow(32/62*props.width, 2)) - 5/2/62*props.width,
		height: 22/3/62*props.width,	
		transform: 'rotate(-45deg)',		
		position: 'absolute',
		display: 'flex',
		justifyContent: 'space-between',

	}

	const head = {
		width: 0,
		height: 0,
		borderTop: `${22/6/62*props.width}px solid transparent`,
		borderRight: `${22/2/62*props.width}px solid ${props.color}`,
		borderBottom: `${22/6/62*props.width}px solid transparent`,
	}

	const body = {
		backgroundColor: props.color,	
		width: '55%',
	}

	const tail = {
		backgroundColor: props.color,	
		width: '10%',
		borderTopRightRadius: '33%',
		borderBottomRightRadius: '33%',
	}
	
	return(
		<div id="outer-box" style={styleOuterBox}>
			
			<div id="bar" style={bar}>
				<div style={head}></div>
				<div style={body}></div>
				<div style={tail}></div>
			</div>			
		</div>
	);
}

export default EditIcon;