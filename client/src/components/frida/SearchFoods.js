import React, { Component } from 'react';
import PouchDB from 'pouchdb';
import('pouchdb-find').then(module => {PouchDB.plugin(module)});
// import('pouchdb-quick-search').then(module => {PouchDB.plugin(module)});

class SearchFoods extends Component {

	// TODO: Use startkey/endkey pattern instead of limit/skip

	/**	props:
		*	Object 	frida	(food database)
		*/

	constructor(props) {
		super(props);
		this.state={
			inputField: '',
			matches: [],
			lastFetchedId: null,
			fetchedAll: false,
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.searchHandler = this.searchHandler.bind(this);
		this.showMoreHandler = this.showMoreHandler.bind(this);
	}

	async changeHandler(event) {
		this.setState({
			inputField: event.target.value,
		});
	}

	async searchHandler(event) {

		event.preventDefault();

		const str = this.state.inputField;

		if (!str) {
			return;
		}

		const res = await this.props.frida.find({
			selector: {
				nameDan: {$regex: RegExp(str, 'i')},
			},
			fields: ['_id', 'nameDan'],
			sort: ['_id'],
			limit: 10,
		});

		const matches = res.docs;

		const lastIndex = matches.length - 1; 

		if (lastIndex === -1) {
			this.setState({
				inputField: str,
				matches: [],
				lastFetchedId: null,
				fetchedAll: true,
			});
			// TODO: Send message: no matches
			return;
		}

		if (lastIndex < 9) {
			this.setState({
				inputField: str,
				matches: matches,
				lastFetchedId: matches[lastIndex]._id,
				fetchedAll: true,
			});
			return;
		}

		this.setState({
			inputField: str,
			matches: matches,
			lastFetchedId: matches[lastIndex]._id,
			fetchedAll: false,
		});
	}

	async showMoreHandler() {
		const res = await this.props.frida.find({
			selector: {
				nameDan: {$regex: RegExp(this.state.inputField, 'i')},
				_id: {$gt: this.state.lastFetchedId}
			},
			fields: ['_id', 'nameDan'],
			sort: ['_id'],
			limit: 10,
		}); 

		const newMatches = res.docs;

		const lastIndex = newMatches.length - 1;

		if (lastIndex === -1) {
			this.setState({
				fetchedAll: true,
			});
			return;
		}

		if (lastIndex < 9) {
			this.setState( state => {
				return {
					matches: state.matches.concat(newMatches),
					lastFetchedId: newMatches[lastIndex]._id,
					fetchedAll: true,
				};
			});
			return;
		}

		this.setState( state => {
			return {
				matches: state.matches.concat(newMatches),
				lastFetchedId: newMatches[lastIndex]._id,
				fetchedAll: false,
			};
		});
	}

	async componentDidMount() {

		if (this.props.frida._adapter !== 'idb') {
			// TODO: provide remote db with designdocs
			console.log('not in contact with indexedDB');
			return;
		}
	}

	render() {
	
		return (
			<div style={{
				border: '4px dotted orange',
				padding: 20,
			}} >
				<h2>Search 1</h2>
				<form onSubmit={this.searchHandler} >
					<label>
						Search for food: 
						<input 
							type="text" 
							value={this.state.inputField} 
							onChange={this.changeHandler}
						/>
					</label>
					<input type="submit" value="Search" />
				</form>
				<ul>
					{this.state.matches.map(doc => {
						return <li key={doc._id} >{doc.nameDan}</li>
					})}
				</ul>
				{ (this.state.matches.length > 0) && (!this.state.fetchedAll) && 
					<button onClick={this.showMoreHandler} >
						Show more
					</button>
				}
				{(this.state.matches.length === 0) && (this.state.fetchedAll) && <p>No matches</p>}
			</div>
		);
	}
}

export default SearchFoods;