import React, { Component } from 'react';
import memoize from 'memoize-one';
import styleFunction from './DatabaseItemStyle.js';
import DeleteItem from './DeleteItem.js';
import EditItem from './EditItem.js';
import EditIcon from '../icons/EditIcon.js';
// import CloseIcon from '../icons/CloseIcon.js';

class DatabaseItem extends Component {

	/**	props: 
		*	Object localDb
		*	Object doc
				string text
				string _id
				string _rev
				[ string _deleted ]
		*	Number width
	*/

	constructor(props) {
		super(props);

		this.state = {
			editing: false,
		};

		this.setEditing = this.setEditing.bind(this);
	}

	setEditing(boolean) {
		this.setState({
			editing: boolean,
		});
	}

	styleMemo = memoize( (width) => styleFunction(width));

	render() {

		const style = this.styleMemo(this.props.width);
		console.log(this.state.editing);
		return(
			<div style={style.wrapper}>
				<p>_id:</p>
				{this.props.doc._id}
				<p>_rev:</p>
				{this.props.doc._rev}
				<p>text:</p>
				{!this.state.editing && this.props.doc.text}
				{this.state.editing && 
				<EditItem 
					localDb={this.props.localDb}
					doc={this.props.doc}
					width={this.props.width}
					setEditing={this.setEditing}
				/>}
				

				<div style={style.editIcon}
					onClick={() => {
						this.setState( state => {
							return {
								editing: !state.editing,
							};
						})
					}}
				>
					<EditIcon 
						width={0.05*this.props.width}
						color={'red'}
						backgroundColor={'pink'}
					/>
				</div>
				<div style={style.closeIcon}>
					<DeleteItem
						localDb={this.props.localDb}
						doc={this.props.doc}
						width={this.props.width}
					/>
				</div>
			</div>
		);

		// return(
		// 	<div style={this.state.style.wrapper} >
		// 		<p>{this.props.doc.text}</p>
		// 		<DeleteItem 
		// 			localDb={this.props.localDb} 
		// 			doc={this.props.doc} 
		// 			width={this.props.width}
		// 		/>
		// 		<EditItem 
		// 			localDb={this.props.localDb} 
		// 			doc={this.props.doc} 
		// 			width={this.props.width}
		// 		/>
		// 	</div>
		// );
	}
}

export default DatabaseItem;