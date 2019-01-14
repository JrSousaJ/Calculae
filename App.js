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
   
    const clearDisplay = this.state.displayValue === '0'
      || this.state.clearDisplay
    if(n === '.' && !clearDisplay && this.state.displayValue.includes('.')){
      return 
    } 
    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n
    this.setState({displayValue, clearDisplay:false})
    if(n != '.'){
      const newValue = parseFloat(displayValue)
      const values= [...this.state.values]
      values[this.state.current] = newValue
      this.setState({ values })
    }
  }
  clearMemory = () =>{
    this.setState({ ...initialState})
  }
  clearD = () =>{
    this.setState({displayValue: '0'})
  }
  setOperation = operation => {
    if(this.state.current === 0){
      this.setState({ operation, current: 1, clearDisplay: true })
    } else {
      const equals = operation === '='
      const values = [...this.state.values]
      if(this.state.operation=='+' || this.state.operation=='-' || this.state.setOperation=='/' || this.state.setOperation=='*')
      {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
      }
      if(this.state.operation==='sqrt'){
		if(values[0]===0)values[0]=1
		values[0] =  values[0] * Math.sqrt(values[1])
	  }
	  else if(this.state.operation==='cube')
	  {
		  if(values[0]==0)values[0]=1
		  values[0] = values[0] * Math.pow(values[1],3)
	  }
	  else if(this.state.operation === 'quad')
	  {
		  if(values[0]==0)values[0]=1
		  values[0]=values[0]* Math.pow(values[1],2)
	  }
	  else if(this.state.operation === 'inver')
	  {
		  if(values[0]===0)values[0]=1
		  values[0]=values[0] * (1.0/values[1])
	  }
	  else if(this.state.operation === 'sinal')
	  {
		  values[0]=-(values[0])
	  }
	  else if(this.state.operation === '%')
	  {
		  values[0] = values[0] * (0.01*values[1])
	  }
      values[1]=0
      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current : equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue}/>
        <View style={styles.buttons}>
          <Button label='%' operation onClick={() => this.setOperation('%')} />
          <Button label='√' operation onClick={() => this.setOperation('sqrt')} />
          <Button label='x²' operation onClick={() => this.setOperation('quad')} />
          <Button label='1/x' operation onClick={() => this.setOperation('inver')} />
          <Button label='CE' operation onClick={this.clearD} />
          <Button label='C' operation onClick={this.clearMemory} />
          <Button label='x³' operation onClick={() => this.setOperation('cube')} />
          <Button label='÷' operation onClick={() => this.setOperation('/')}/>
          <Button label='7' onClick={this.addDigit} />
          <Button label='8' onClick={this.addDigit} />
          <Button label='9' onClick={this.addDigit} />
          <Button label='×' operation onClick={() => this.setOperation('*')} />
          <Button label='4' onClick={this.addDigit} />
          <Button label='5' onClick={this.addDigit} />
          <Button label='6' onClick={this.addDigit} />
          <Button label='-' operation onClick={() => this.setOperation('-')} />
          <Button label='1' onClick={this.addDigit} />
          <Button label='2' onClick={this.addDigit} />
          <Button label='3' onClick={this.addDigit} />
          <Button label='+' operation onClick={this.setOperation} />
          <Button label='±' operation onClick={() => this.setOperation('sinal')} />
          <Button label='0' onClick={this.addDigit} />
          <Button label=',' operation onClick={() => this.setOperation('.')} />
          <Button label='=' operation onClick={() => this.setOperation('=')} />
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
});
