import React, {Component} from 'react';

class ChooseFood extends Component {

	/**	props: 
		*	Object	localDb
	*/

	async componentDidMount() {
		const res = await this.props.localDb.find({
			selector: {groupId: {$exists: true}}
		});
		this.groupName = res.docs; 
		this.forceUpdate();
	}

	render() {
		console.log(this.groupName);

		if (!this.groupName) {
			return null;
		}

		return(
			<div>
				<ul>
					{this.groupName.map( doc => {
						return(
							<li>
								<h2>{doc.groupNameDan}</h2>
								<ul>
									{doc.subgroups.map( subdoc => {
										return(
											<li>{subdoc.subgroupNameDan}</li>
										);
									})}
								</ul>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default ChooseFood;