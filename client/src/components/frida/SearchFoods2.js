import React, { Component } from 'react';
import PouchDB from 'pouchdb';
import('pouchdb-find').then(module => {PouchDB.plugin(module)});
// import('pouchdb-quick-search').then(module => {PouchDB.plugin(module)});

class SearchFoods2 extends Component {

	/**	props:
		*	Object 	frida	(food database)
		*/

	constructor(props) {
		super(props);
		this.state={
			inputField: '',
			matches: [],
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.showMoreHandler = this.showMoreHandler.bind(this);
	}

	async componentDidMount() {
		
	}

	async changeHandler(event) {
		
		console.log('changeHandler starting');

		const s = event.target.value;

		try{
			const res = await this.props.frida.query('nameDanSubstrings/nameDanSubstrings', {key: s});
			
			this.setState({
				inputField: s,
				matches: res.rows,
			});

		} catch(err) {
			console.log(err);
		}

		

		console.log('changeHandler done');
	}

	async showMoreHandler() {
	}

	render() {
		console.log(this.state.matches);
		return (
			<div style={{
				border: '4px dotted orange',
				padding: 20,
			}} >
				<h2>Search 2</h2>
				<form onSubmit={this.searchHandler} >
					<label>
						Search for food: 
						<input 
							type="text" 
							value={this.state.inputField} 
							onChange={this.changeHandler}
						/>
					</label>
				</form>
				<div
					style={{
						maxHeight: 400,
						overflow: 'scroll',
					}}
				>
					<ul>
						{this.state.matches.map( doc => {
							return (
								<li key={doc.id} >{doc.value}</li>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}
}

export default SearchFoods2;