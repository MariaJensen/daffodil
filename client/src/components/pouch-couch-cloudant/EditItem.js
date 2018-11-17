import React, { Component } from 'react';
import EditIcon from '../icons/EditIcon.js';
import CloseIcon from '../icons/CloseIcon.js';

class EditItem extends Component {

	/**	props: 
		*	Object localDb
		*	Object doc
				String text
				String _id
				String _rev
				[ String _deleted ]
		*	Number width
		*	Function setEditing
	*/

	constructor(props) {
		super(props);

		this.state = {
			inputField: '',
		};

		this.submitHandler = this.submitHandler.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
	}

	componentDidMount() {
		this.setState({
			inputField: this.props.doc.text,
		});
	}

	async submitHandler(event) {
		event.preventDefault();

		await this.props.localDb.put({
			_id: this.props.doc._id,
			_rev: this.props.doc._rev,
			text: this.state.inputField,
		});

		this.props.setEditing(false);
		
	}

	changeHandler(event) {
		this.setState({
			inputField: event.target.value,
		});
	}

	render() {

		return (			
			<form 
				style={{ display: 'flex', }}
				onSubmit={this.submitHandler} 
			>			
				<input 
					style={{ flexGrow: 1 }}
					type="text" 
					value={this.state.inputField} 
					onChange={this.changeHandler} 
				/>
				<input 
					style={{ flexBasis: 0.1*this.props.width, }}
					type="submit" 
					value="Save" 
				/>
				<input
					style={{ flexBasis: 0.1*this.props.width, }} 
					type="button" 
					value="Cancel" 
					onClick={() => {
						this.props.setEditing(false);
					}}
				/>
			</form> 	
		);
	}
}

export default EditItem