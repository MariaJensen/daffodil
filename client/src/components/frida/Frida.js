import React, { Component } from 'react';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import './Frida.css';

import SearchFoods from './SearchFoods.js';

PouchDB.plugin(PouchDBFind);

class Frida extends Component {

	/**	props: 
		* 	Number width
		* 	String color
		*	String backgroundColor
		*/
	
	constructor(props) {
		super(props);

		this.state = {
			components: new Map(),
			currentComponent: <p>Loading database</p>,
		};

		this.initializeDb = this.initializeDb.bind(this);
		this.handleOnline = this.handleOnline.bind(this);
		this.handleOffline = this.handleOffline.bind(this);
	}

	setCurrentComponent(comp) {
		this.setState({
			currentComponent: comp,
		});
	}

	handleOnline() {
		console.log('Browser went online');
		this.initializeDb();
	}

	handleOffline() {
		console.log('browser went offline');
		this.initializeDb();
	}

	async initializeDb() {

		/**	When Firefox or Edge are in private browsing mode, there is no access 
			to indexedDb, the default backend for PouchDB. In these cases Pouch 
			should communicate directly with the remote db (or perhaps use 
			the localStorage adapter?) */

		const localDb = new PouchDB('localDb');

		const remoteDb = new PouchDB('https://6a8eaf67-8494-4cc6-8fba-d69263b15078-bluemix.cloudant.com/frida2009');

		const handleError = async err => {
			
			if (err.name === 'indexed_db_went_bad') {
				
				console.log('local db inaccessible, probably due to private browsing');
				
				try {
					await remoteDb.info();
					console.log('remote db accessible');
					this.frida = remoteDb;
				} catch(err) {
					console.log('remote db inaccessible'); 
					console.log('app cannot work without data from either local or remote db');
					
					const messages = [
						'Local database inaccessible probably due to private browsing',
						'Remote database inaccessible',
						'App cannot function without data'
					];				

					this.setState({
						currentComponent: <Error messages={messages} />,
					});
				}

				return;
			}

			// Now it can be assumed that localDb is ok and thus the error must be with remoteDb. 
			// If localDb is previously populated, app can run. Else it can't. 

			console.log('localDb accessible');
			console.log('remoteDb inaccessible');

			const testingLocalDb = await localDb.info();

			if (testingLocalDb.doc_count < 1178) {
				console.log('localDb not sufficiently populated');
				console.log('app cannot work without data from either local or remote db');

				const messages = [
					'Remote database inaccessible',
					'Local database accessible but not sufficiently populated',
					'App cannot function without data'
				];		

				this.setState({
					currentComponent: <Error messages={messages} />,
				});

				return;
			}

			console.log('localDb sufficiently populated');
			this.frida = localDb;
			this.setState({ 
				currentComponent: <SearchFoods frida={this.frida} />
			}); 
		}

		await PouchDB.replicate(remoteDb, localDb)
		.on('complete', info => {
			if (info.ok) { // localDb and remoteDb both accessible
				console.log('Replication successful');
				this.frida = localDb;
				this.setState({
					currentComponent: <SearchFoods frida={this.frida} />
				});
			}
		})
		.on('denied', err => {
			handleError(err);
		})
		.on('error', err => {
			/**	Possible error messages: 
				*	If private browsing (internet access or not): 
						err = {
							error: true,
							message: "unknown",
							name: "indexed_db_went_bad",
							reason: "Failed to open indexedDB, are you in private browsing mode?",
							result: {
								doc_write_failures: 0,
								docs_read: 0,
								docs_written: 0,
								end_time: "2018-12-05T04:19:36.796Z",
								errors: [],
								last_seq: 0,
								ok: false,
								start_time: "2018-12-05T04:19:36.746Z",
								status: "aborting"
							},
							stack: "",
							status: 500
						}

				*	If (no internet access and not private browsing)
					or 
					(address of remote db does not exist):
						err = {
							result: {
								doc_write_failures: 0,
								docs_read: 0,
								docs_written: 0,
								end_time: "2018-12-05T04:12:30.049Z",
								errors: [],
								last_seq: 0,
								ok: false,
								start_time: "2018-12-05T04:12:29.999Z",
								status: "aborting"
							}
							stack: "",
						}
							
				* 	If (internet access and no access to frida2009 on Cloudant): 
						err = {
							error: "unauthorized",
							message: "_reader access is required for this request",
							name: "unauthorized",
							reason: "_reader access is required for this request",
							result: {
								doc_write_failures: 0,
								docs_read: 0,
								docs_written: 0,
								end_time: "2018-12-05T04:31:17.871Z",
								errors: Array [],
								last_seq: 0,
								ok: false,
								start_time: "2018-12-05T04:31:17.690Z",
								status: "aborting"
							},
							stack: "",
							status: 401
						}
			*/
			handleError(err);
		}); 
	}

	async componentDidMount() {

		window.addEventListener('online', this.handleOnline);
		window.addEventListener('offline', this.handleOffline);

		this.initializeDb();		
	}

	componentWillUnmount() {
		window.removeEventListener('online', this.handleOnline);
		window.removeEventListener('offline', this.handleOffline);
	}

	render() {	
		
		return (
			<div id="wrapper">
				{this.state.currentComponent}
				
			</div>
		
		);
	}
}

export default Frida; 


class Error extends Component {

	/**	props: 
		* Array messages
			* String message
		*/

	render() {
		return(
			<div>{
				this.props.messages.map( message => <p>{message}</p>)
			}</div>
		);
	}
}

// 	compGroup = {
	// 		aminoAcids: ['236', '237', '238', '239', '240', '241', '242', '243', '244', '245', '246', '247', '248', '249', '250', '251', '252', '253'],
	// 		fattyAcids: {
	// 		saturated: ['174', '175', '176', '177', '178', '179', '180', '181', '182', '183', '184', '185', '186'],
	// 		monoUnsaturated: ['189', '191', '193', '194', '197', '198', '200', '257'],
	// 		polyUnsaturated: ['203', '206', '208', '211', '212', '214', '215'],
	// 	}
	// };	