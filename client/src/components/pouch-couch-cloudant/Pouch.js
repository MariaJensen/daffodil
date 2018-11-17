import React, { Component } from 'react';
import LocalDatabase from './LocalDatabase.js';

class Pouch extends Component {

	/** props: 
		*	number width
		*	string color
		*	string backgroundColor
	*/

	render() {

		const borderWidth = 0.05*5/62*this.props.width;
		const width = 0.8*this.props.width;
		const color = this.props.color;
		const backgroundColor = this.props.backgroundColor;

		return (
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '100%',
					gridRowGap: 0.01*width,
					gridTemplateRows: 'repeat(auto)',
				}}
			>
				<div
					style={{
						border: `${borderWidth}px solid ${color}`,
						borderRadius: 0.01*width,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: 0.01*width,
						backgroundColor: backgroundColor,
					}}
					>
					<h1>Pouch</h1>
				</div>
			
				<div
					style={{
						border: `${borderWidth}px solid ${color}`,
						borderRadius: 0.01*width,
						minHeight: 100,
						backgroundColor: backgroundColor,
						padding: 0.01*width,
					}}
				>		
					<LocalDatabase width={this.props.width} />
				</div>
			
			</div>
		);
	}
}

export default Pouch;