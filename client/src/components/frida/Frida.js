import React, { Component } from 'react';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import PouchDBQuickSearch from 'pouchdb-quick-search';
import './Frida.css';
import ChooseFood from './ChooseFood.js';

PouchDB.plugin(PouchDBFind);
PouchDB.plugin(PouchDBQuickSearch);

class Frida extends Component {

	/**	props: 
		* 	Number width
		* 	String color
		*	String backgroundColor
		*/

	localDb = new PouchDB('localDb');	
	remoteDb = new PouchDB('https://6a8eaf67-8494-4cc6-8fba-d69263b15078-bluemix.cloudant.com/frida2009');

	async componentDidMount() {
		const replication = await PouchDB.replicate(this.remoteDb, this.localDb); 
	}

	render() {	
		return (
			<div id="test">
				<ChooseFood 
					localDb={this.localDb}
				/>
			</div>
		);
	}
}

export default Frida; 


// 	compGroup = {
	// 		aminoAcids: ['236', '237', '238', '239', '240', '241', '242', '243', '244', '245', '246', '247', '248', '249', '250', '251', '252', '253'],
	// 		fattyAcids: {
	// 		saturated: ['174', '175', '176', '177', '178', '179', '180', '181', '182', '183', '184', '185', '186'],
	// 		monoUnsaturated: ['189', '191', '193', '194', '197', '198', '200', '257'],
	// 		polyUnsaturated: ['203', '206', '208', '211', '212', '214', '215'],
	// 	}
	// };	