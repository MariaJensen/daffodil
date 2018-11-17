import React, {Component} from 'react';
import CloseIcon from '../icons/CloseIcon.js';

class DeleteItem extends Component {
	
	/**	props: 
		*	Object localDb
		*	Object doc
				String text
				String _id
				String _rev
				[ String _deleted ]
		*	Number width 
	*/

	constructor(props) {
		super(props);
		this.clickHandler = this.clickHandler.bind(this);
	}

	async clickHandler() {
		await this.props.localDb.remove(this.props.doc._id, this.props.doc._rev);
	}

	render() {

		return (
			<div
				onClick={this.clickHandler}
			>
				<CloseIcon
					width={0.05*this.props.width}
					backgroundColor={'pink'}
					color={'red'}
				/>
			</div>
		);
	}
}

export default DeleteItem;