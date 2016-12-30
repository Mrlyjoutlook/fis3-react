import React,{Component} from 'react';
import {withRouter} from 'react-router';

const img=require('../../static/images/MRLYJ.jpg');

class App extends Component{

	constructor(){
		super();
		this.handleClick=this.handleClick.bind(this);
	}

	handleClick(){
		this.props.router.push('/me');
	}

	render(){
		const {children}=this.props;
		return(
			<div className="app">
				<img src={img} onClick={this.handleClick}/>
				<p>点击图片测试异步加载</p>
				{children}
			</div>
		)
	}
}

export default withRouter(App);