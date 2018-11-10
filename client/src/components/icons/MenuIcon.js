import React from 'react';

function MenuIcon(props) {

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
		gridTemplateRows: 'auto auto auto',
		gridRowGap: 5/62*props.width,
	}

	const styleBar = {
		backgroundColor: props.color,			
	}
	
	return(
		<div style={styleOuterBox}>
			<div style={styleInnerBox}>
				<div style={styleBar}></div>
				<div style={styleBar}></div>
				<div style={styleBar}></div>					
			</div>	
		</div>
	);
}

export default MenuIcon;