import React, { Component } from 'react';
import PouchDB from 'pouchdb';

import DatabaseItem from './DatabaseItem.js';
import CreateNewItem from './CreateNewItem.js';

class LocalDatabase extends Component {

	/** props: 
		*	Number width
		*/

	constructor(props) {
		super(props);
		this.state = {
			localDb: new PouchDB('test'),
			docs: new Map(),
			changes: {},
		};
		/** Note: 
			The 'docs' field is necessary, since we can't call an asynchronous 
			function in the render method, thus the fetching has to be done
			elsewhere and saved in the state. */
		this.changeListener = this.changeListener.bind(this);
	}

	async componentDidMount() {
		const changes = this.state.localDb.changes({
			live: true,
			include_docs: true,
		});
		changes.on('change', this.changeListener);
		changes.on('error', () => {} ); // Todo

		this.setState({
			changes: changes,
		});

		/** Note: 
			It is not necessary to initialize this.state.docs with the
			content of the database. When an instance of localDb is 
			created in the constructor, the 'change' event will be 
			emitted once for each entry in the db and can thus be handled
			in the changeHandler. */
	}

	componentWillUnmount() {

		this.state.changes.cancel();
	}

	changeListener(change) {

		/** object change
			*	object doc
				*	string text
				*	string _id
				*	string _rev 
				*	[ string _deleted ]	
			*	... */

		this.setState( (state) => {
			state.docs.set(change.doc._id, change.doc);
			return {
				docs: state.docs,
			};
		});
	}

	render() {

		return(
			<div
				style={{
						display: 'grid',
						gridRowGap: 0.03*this.props.width,
						padding: 0.05*this.props.width,
					}}
			>
				<div style={{
					display: 'flex',
					justifyContent: 'center',
				}}>
					<h2>Local database with live changes</h2>
				</div>
				<CreateNewItem 
					localDb={this.state.localDb} 
					width={this.props.width} 
				/>
				<div 
					style={{
						display: 'grid',
						gridRowGap: 0.03*this.props.width
					}} 
				>
					{ [...this.state.docs.values()].reverse().map( doc => 
						!doc._deleted && 
						<DatabaseItem 
							key={doc._id} 
							localDb={this.state.localDb} 
							doc={doc} 
							width={this.props.width}
						/>
					)}
				</div>
			</div>
		);
	}
}


export default LocalDatabase;