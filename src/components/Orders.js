import React, {Component} from 'react';

export default class Orders extends Component {
	constructor(props) {
		super(props);
		this.state={
			NowPlayFilms:[]
		}

	}
	render() {
		console.log(this)
		return (
			<div>
				<h1>影院</h1>
			</div>
		)
	}
}