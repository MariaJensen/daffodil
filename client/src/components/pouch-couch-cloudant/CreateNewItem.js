import React, {Component} from 'react';
import NewIcon from '../icons/NewIcon.js';
import CloseIcon from '../icons/CloseIcon.js';

class CreateNewItem extends Component {

	/**	props: 
		* 	Object localDb
		*	Number width
		*/
	
	constructor(props) {
		super(props);

		this.state = {
			inputField: '',
			visible: false,
		};

		this.submitHandler = this.submitHandler.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler() {
		this.setState( state => {
			return {
				visible: !state.visible,
			};
		});
	}

	changeHandler(event) {
		console.log(event.target.value);
		this.setState({
			inputField: event.target.value,
		});
	}

	async submitHandler(event) {
		event.preventDefault();

		const inputField = this.state.inputField;

		this.setState({
			inputField: '',
			visible: false,
		});

		await this.props.localDb.post({
			text: inputField,
		});
	}

	render() {

		const width = this.props.width;

		return (
			<div 
				style={{
					display: 'grid',
					gridTemplateColumns: `${0.075*width}px auto`,
				}}
			>
				<div onClick={this.clickHandler} >
					{!this.state.visible && 
					<NewIcon 
						width={0.05*width} 
						color={'red'} 
						backgroundColor={'pink'} 
					/>}
					{this.state.visible && 
					<CloseIcon 
						width={0.05*width} 
						color={'red'} 
						backgroundColor={'pink'} 
					/>}
				</div>
				{ this.state.visible && 
				<form 
					style={{
						display: 'flex',
						alignItems: 'center',
						
					}}
					onSubmit={this.submitHandler}
				>					
					<div
						style={{
							flexBasis: 'auto',
						}}
					>
						<p>New Item: </p> 
					</div>
					<input 
						style={{
							flexGrow: 1,
						}}
						type="text" 
						value={this.state.inputField} 
						onChange={this.changeHandler}
					/>	
					<input 
						style={{
							flexBasis: 0.1*width,
						}}
						type="submit"
						value="Save"
					/>
					<input 
						style={{
							flexBasis: 0.1*width,
						}}
						type="button" 
						value="Cancel" 
						onClick={ () => this.setState({
							inputField: '',
							visible: false,
						})} 
					/>
				</form> }
			</div>
		);
	}
}

export default CreateNewItem;