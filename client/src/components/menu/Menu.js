import React, { Component } from 'react';
import MenuIcon from '../icons/MenuIcon.js'; 
import CloseIcon from '../icons/CloseIcon.js';
import StickyIcon from '../icons/StickyIcon.js';

/** Note: 
	The event onMouseEnter is triggered on an element when the mouse is moved onto that element, but also when the component that contains the element is (re)rendered while the mouse is upon the element. 
	The property event.isTrusted is true in both cases.  
	*/

class Menu extends Component {
	
	/**	props: 
		*	number width  (width of the icon. Width of border is 5/62*width)
		*	number top
		*	number left
		*	string color
		*	string backgroundColor
		*	array components
				object
					string text (text in menu item)
					function component 
					function handler (will be executed when menu item is clicked)
		*/

	constructor(props) {
		super(props);

		this.state = {
			clicked: false,
			hovering: false,
			visible: false,
		};
	}

	render() {

		return(
			<div 
				style={{
					position: 'absolute',
					top: this.props.top,
					left: this.props.left,
					zIndex: 100,
				}}
				onMouseEnter={ () => {
					this.setState( (state) => {
						if (
							!state.visible && 
							!state.clicked && 
							!state.hovering
						) {
							return {
								visible: true,
								clicked: false,
								hovering: true,
							};
						}
						if (
							state.visible && 
							state.clicked && 
							!state.hovering
						) {
							return {
								visible: true,
								clicked: true,
								hovering: true,
							};
						}
					});
				}}
				onMouseLeave={ () => {
					this.setState( (state) => {
						if (
							!state.visible && 
							!state.clicked && 
							state.hovering
						) {
							return {
								visible: false,
								clicked: false,
								hovering: false,
							};
						}
						if (
							state.visible &&
							!state.clicked &&
							state.hovering
						) {
							return {
								visible: false,
								clicked: false,
								hovering: false,
							};
						}
						if (
							state.visible && 
							state.clicked && 
							state.hovering
						) {
							return {
								visible: true,
								clicked: true,
								hovering: false,
							};
						}
					});
				}}
			>
				<div 
					onClick={ () => {
						this.setState( (state) => {
							if (
								state.visible && 
								!state.clicked && 
								state.hovering
							) {
								return {
									visible: true,
									clicked: true,
									hovering: true,
								};
							}
							if (
								!state.visible && 
								!state.clicked && 
								state.hovering
							) {
								return {
									visible: true,
									clicked: true,
									hovering: true,
								};
							}
							if (
								state.visible &&
								state.clicked && 
								state.hovering
							) {
								return {
									visible: false,
									clicked: false,
									hovering: true,
								};
							}
						});
					}}
					style={{
						position: 'relative',
						zIndex: 101,
					}}
					>
					{this.state.clicked &&  		
						<CloseIcon
							width={this.props.width}
							color={this.props.color}
							backgroundColor={this.props.backgroundColor} 
							/>
					}
					{ !this.state.clicked && !this.state.visible && 
						<MenuIcon
							width={this.props.width}
							color={this.props.color}
							backgroundColor={this.props.backgroundColor} 
							/>
					}
					{ !this.state.clicked && this.state.visible && 
						<StickyIcon
							width={this.props.width}
							color={this.props.color}
							backgroundColor={this.props.backgroundColor} 
							/>
					}
				</div>
				<ul 
					style={{
						position: 'absolute',
						left: 0.5*this.props.width,	
						top: 0,
						paddingTop: 0.5*this.props.width,
						paddingLeft: 0.5*this.props.width,
						visibility: this.state.visible ? 'visible' : 'hidden',
						display: 'flex',
						flexDirection: 'column',
						listStyleType: 'none',
					}}					
					>
					<MenuItems
						components={this.props.components} 
						width={this.props.width}
						color={this.props.color}
						backgroundColor={this.props.backgroundColor}
					/>
				</ul>
			</div>
		);
	}
}

function MenuItems(props) {
	
	/**	props: 
		*	array components
				object
					string text
					function component
					function handler
		*	number width
		*	string color
		*	string backgroundColor
	*/
	return(
		<React.Fragment>
			{props.components.map( (object) => 
				<MenuItem 
					text={object.text}
					component={object.component}
					handler={object.handler}
					width={props.width}
					color={props.color}
					backgroundColor={props.backgroundColor}
				/>
			)}
		</React.Fragment>
	);
}

function MenuItem(props) {

	/**	props: 
		* 	string text
		* 	function component
		*	function handler 
		*	number width
		*	string color
		*	string backgroundColor
	*/
	return(
		<li 
			onClick={ () => {props.handler(props.component)}}
			style={{
				padding: 0.2*props.width,
				color: props.color,
				backgroundColor: props.backgroundColor,
				border: `${5/62*props.width}px solid ${props.color}`,
				borderRadius: 0.5*props.width,
				marginBottom: 0.1*props.width,
				display: 'flex',
				alignItems: 'center',
			}}
		>
			{props.text}
		</li>
	);
}

export default Menu;