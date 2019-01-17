import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Button from './src/components/Button'
import Display from './src/components/Display'
const initialState ={
	displayValue : '0',
	clearDisplay: false,
	operation: null,
	values: [0, 0],
	current: 0,
}
export default class App extends Component {
	state = {...initialState}
	addDigit = n =>{
    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
	if(n === '.' && !clearDisplay && this.state.displayValue.includes('.'))
	{
      	return 
    } 
    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n
    this.setState({displayValue, clearDisplay:false})
  	}
  	clearMemory = () =>{
		this.setState({ ...initialState})
	}
	clearD = () =>{
		this.setState({displayValue: '0'})
	}
  //Implementação do algoritmo Shunting Yard para transformar a sentença de infixa para posfixa
  	InfixtoPosfix = infix => {
		let ops = {'+': 1, '-': 1, '*': 2, '/': 2};
		let peek = (a) => a[a.length - 1];
		let stack = [];
	
		return infix
		.split('')
		.reduce((out, token) => {
			if (parseFloat(token))out.push(token);
			if (token in ops) 
			{
				while (peek(stack) in ops && ops[token] <= ops[peek(stack)])out.push(stack.pop());
				stack.push(token);
			}
			if (token == '(')stack.push(token)
			if (token == ')') 
			{
				while (peek(stack) != '(')out.push(stack.pop());
				stack.pop();
			}
			return out;
		}, []).concat(stack.reverse()).join(' ');
  	}
	resultWithPosfix = (ts, s = []) => {
		ts.split(' ').forEach(t =>
		s.push(t == +t ? t : eval(s.splice(-2,1)[0] + t + s.pop())));
		return s[0];
	}
  //Solução usando o modelo posfixo
	solver = () => {
		let ts = `${this.state.displayValue}`
		ts= this.InfixtoPosfix(ts)
		this.setState({displayValue: this.resultWithPosfix(ts)})
	}
	render() {
		return (
		<View style={styles.container}>
			<Display value={this.state.displayValue}/>
			<View style={styles.buttons}>
			<Button label='CE' operation onClick={this.clearD} />
			<Button label='C' operation onClick={this.clearMemory} />
			<Button label='x²' operation operation onClick={() => this.setOperation('^2')} />
			<Button label='1/x' operation onClick={this.addDigit}/>
			<Button label='%' operation onClick={this.addDigit}/>
			<Button label='√' operation onClick={this.addDigit} />
			<Button label='(' metade onClick={this.addDigit} />
			<Button label=')' metade onClick = {this.addDigit}/>
			<Button label='/' operation onClick={this.addDigit} />
			<Button label='7' onClick={this.addDigit} />
			<Button label='8' onClick={this.addDigit} />
			<Button label='9' onClick={this.addDigit} />
			<Button label='*' operation onClick={this.addDigit} />
			<Button label='4' onClick={this.addDigit} />
			<Button label='5' onClick={this.addDigit} />
			<Button label='6' onClick={this.addDigit} />
			<Button label='-' operation onClick={this.addDigit} />
			<Button label='1' onClick={this.addDigit} />
			<Button label='2' onClick={this.addDigit} />
			<Button label='3' onClick={this.addDigit} />
			<Button label='+' operation onClick={this.addDigit} />
			<Button label='±' operation onClick={this.addDigit} />
			<Button label='0' onClick={this.addDigit} />
			<Button label=',' operation onClick={this.addDigit} />
			<Button label='=' operation onClick={this.solver} />
			</View>
		</View>
		);
	}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection:'row',
    flexWrap: 'wrap'
  }
})
