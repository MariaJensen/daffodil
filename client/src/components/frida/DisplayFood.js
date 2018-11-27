import React, { Component } from 'react'; 
import memoize from 'memoize-one';
import styleFunction from './DisplayFoodStyle.js';

class DisplayFood extends Component {

	/**	props: 
		*	Number 	width
		*	String 	foodId
		*	Object	localDb	
		*	Object 	remoteDb
		*	Map 	comp
		*			foodName
		*/

	constructor(props) {
		super(props);

		this.state = {
			currentContents: new Map(),
			amount: 100,
		};

		this.changeHandler = this.changeHandler.bind(this);
	}

	async componentDidMount() {
		console.log('DisplayFood did mount');

		const replication = await this.props.localDb.replicate.from(this.props.remoteDb, {doc_ids: [this.props.foodId]});

		if (!replication.ok) {
			// TODO: Handle error
			console.log(replication);
		}

		this.food = await this.props.localDb.get(this.props.foodId);

		this.setState({
			currentContents: new Map(this.food.contents),
		});
	}

	styleMemo = memoize( width => styleFunction(width))

	changeHandler(event) {
		this.setState({
			amount: event.target.value,
			currentContents: new Map(this.food.contents.map(arr => {
				return [arr[0], event.target.value / 100 * arr[1]];
			})),
		});
	}

	render() {
		console.log(this.state.currentContents);

		if (!this.props.foodName) {return null;}
		const style = this.styleMemo(this.props.width);

		return(
		<div style={style} >
			<h1>{this.props.foodName.nameDan}</h1>
			<form>
				<label>
						Indhold i <input 
							type="number" 
							min="1"
							value={this.state.amount} 
							onChange={this.changeHandler}
						/> gram:
				</label>
			</form>
		</div>

		);
	
				

		// 		<div>
		// 			<h2>Energi</h2>
		// 				{}
		// 			<h2>Protein</h2>
		// 			<h2>Fedt</h2>
		// 			<h2>Kulhydrater</h2>
		// 			<h2>Vitaminer</h2>
		// 			<h2>Mineraler</h2>
		// 				{this.state.currentContents.get('1')} {this.props.compUnit.get('1')}
		// 				{this.props.compGroups.aminoAcids.map( compId => {
		// 				return <p key={compId} >{this.props.compName.get(compId)}: {this.state.currentContents.get(compId) || 0} {this.props.compUnit.get(compId)}</p> 
		// 			})}
		// 			<h2>Fedt: {this.state.currentContents.get('3')} {this.props.compUnit.get('3')}</h2>
		// 		</div>

		// 		{[...this.state.currentContents.entries()].map( entry => {
		// 			const compId = entry[0];
		// 			const content = entry[1];
		// 			const compName = this.props.compName.get(compId);
		// 			const compUnit = this.props.compUnit.get(compId);

		// 			return <p key={compId} >{`${compName}: ${content} ${compUnit}`}</p>;
		// 		})}
		
		// 	</div>
		// );
	
	}
}

export default DisplayFood;