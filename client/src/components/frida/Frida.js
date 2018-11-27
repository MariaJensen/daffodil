import React, { Component } from 'react';
import PouchDB from 'pouchdb';
import './Frida.css';
import DisplayFood from './DisplayFood.js';

class Frida extends Component {

	/**	props: 
		* 	Number width
		* 	String color
		*	String backgroundColor
		*/

	localDb = new PouchDB('localDb');
	
	remoteDb = new PouchDB('https://6a8eaf67-8494-4cc6-8fba-d69263b15078-bluemix.cloudant.com/frida2009');

	comp = new Map();
	foodGroup = new Map();
	foodName = new Map();

	async componentDidMount() {

		const replication = await PouchDB.replicate(
			this.remoteDb, 
			this.localDb, 
			{doc_ids: ['comp', 'foodGroup', 'foodName'],}
		);

		if (!replication.ok) {
			// Handle error
			// Check if localDb already has sufficient data for app to run
			console.log(replication);
		}		

		const res = await this.localDb.allDocs({
			keys: ['comp', 'foodGroup', 'foodName'],
			include_docs: true,
		});

		this.comp = new Map(res.rows[0].doc.comp);

		this.foodGroup = res.rows[1].doc.foodGroup.map( arr => {
			const doc = arr[1];
			doc.subgroupsDan = new Map(doc.subgroupsDan);
			doc.subgroupsEng = new Map(doc.subgroupsEng);
			return [arr[0], doc];
		});

		this.foodName = new Map(res.rows[2].doc.foodName);

		this.forceUpdate();
	}

	compGroup = {
			aminoAcids: ['236', '237', '238', '239', '240', '241', '242', '243', '244', '245', '246', '247', '248', '249', '250', '251', '252', '253'],
			fattyAcids: {
				saturated: ['174', '175', '176', '177', '178', '179', '180', '181', '182', '183', '184', '185', '186'],
				monoUnsaturated: ['189', '191', '193', '194', '197', '198', '200', '257'],
				polyUnsaturated: ['203', '206', '208', '211', '212', '214', '215'],
			}
		};	

	render() {	

		console.log(process.env.DB_HOSTNAME);
		const foodId = '5';

		return (
			<div id="test">
				<DisplayFood
					width={this.props.width}
					foodId={foodId}
					localDb={this.localDb}
					remoteDb={this.remoteDb}
					comp={this.comp}
					foodName={this.foodName.get(foodId)}
				/>
			</div>
		);
	}
}

export default Frida; 