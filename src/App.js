import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '0',
      firstDigit: null,
      secondDigit: null,
      currentAction: null
    }
  }

  handleNumClick = (event, value) => {
    console.log(value);
    let valueStr = String(value);
    if (value === 'ADD') {
      valueStr = '+'
    } else if (value === 'SUBSTRACT') {
      valueStr = '-'
    } else if (value === 'DIVIDE') {
      valueStr = '/'
    } else if (value === 'MULTIPLY') {
      valueStr = '*'
    } else if (this.state.inputValue === '0') {
      this.setState({
        inputValue: valueStr
      })
    } else {
      this.setState({
        inputValue: this.state.inputValue + valueStr
      })
    }
  }

  handleMathAction = (event, type) => {
    switch (type) {
      case 'ADD':
      case 'SUBSTRACT':
      case 'DIVIDE':
      case 'MULTIPLY':

    }

  }

  handleDelete = () => {

  }

  handleCalculate = () => {

  }

  handleKeyDown = (event) => {
    const keyPressed = String.fromCharCode(event.keyCode);
    console.log(keyPressed);
    if (47 < event.keyCode && event.keyCode < 58) { // digits
      console.log('digits');
      this.setState({
        inputValue: this.state.inputValue + keyPressed
      })
    } else if (event.keyCode === 187) { // add
      console.log('add');
    } else if (event.keyCode === 109) { // substract
      console.log('substract');
    } else if (event.keyCode === 106) { // multiply
      console.log('multiply');
    } else if (event.keyCode === 111) { // divide
      console.log('divide');
    } else if (event.keyCode === 8) { // backspace
      console.log('backspace');
    } else if (event.keyCode === 13) { // enter
      console.log('enter');
    }
  }

  handleInputFocus = (event) => { // to move cursor to the end of input
    const val = event.target.value;
    event.target.value = '';
    event.target.value = val;
  }

  handleInputChange = () => {

  }

  handleClear = () => {
    this.setState({
      inputValue: '0'
    })
  }

  render() { 
    const { inputValue } = this.state;

    return ( 
      <React.Fragment>
        <form className="w-inner" onKeyDown={this.handleKeyDown} tabIndex="0">
          <div className="c-calc">
            <div className="c-calc__input-box">
              <input type="text" placeholder="0" className="c-calc__input"                 
                onChange={this.handleInputChange}
                onFocus={ (event) => this.handleInputFocus(event)}
                onClick={ (event) => this.handleInputFocus(event)}
                value={inputValue}/>
            </div>
            <div className="c-calc__action-box">
              <button type="button" className="btn btn--clear" onClick={this.handleClear}>ce</button>
              <button type="button" className="btn btn--action btn--sm" onClick={ (event) => this.handleNumClick(event, 'MULTIPLY')}>&#x2716;</button>
              <button type="button" className="btn btn--action" onClick={ (event) => this.handleNumClick(event, 'DIVIDE')}>&#247;</button>
              <button type="button" className="btn btn--action" onClick={ (event) => this.handleNumClick(event, 'SUBSTRACT')}>&ndash;</button>
              <button type="button" className="btn btn--action" onClick={ (event) => this.handleNumClick(event, 'ADD')}>+</button>
              <button type="submit" className="btn btn--action" onClick={this.handleCalculate}>=</button>
              
              <div className="c-calc__num-box">
                <button type="button" className="btn" onClick={ (event) => this.handleNumClick(event, 9) }>9</button>
                <button type="button" className="btn" onClick={ (event) => this.handleNumClick(event, 8) }>8</button>
                <button type="button" className="btn" onClick={ (event) => this.handleNumClick(event, 7) }>7</button>
                <button type="button" className="btn" onClick={ (event) => this.handleNumClick(event, 6) }>6</button>
                <button type="button" className="btn" onClick={ (event) => this.handleNumClick(event, 5) }>5</button>
                <button type="button" className="btn" onClick={ (event) => this.handleNumClick(event, 4) }>4</button>
                <button type="button" className="btn" onClick={ (event) => this.handleNumClick(event, 3) }>3</button>
                <button type="button" className="btn" onClick={ (event) => this.handleNumClick(event, 2) }>2</button>
                <button type="button" className="btn" onClick={ (event) => this.handleNumClick(event, 1) }>1</button>
                <button type="button" className="btn btn--del" onClick={this.handleDelete}>del</button>
                <button type="button" className="btn" onClick={ (event) => this.handleNumClick(event, 0) }>0</button>
                <button type="button" className="btn" onClick={this.handleNumClick}>,</button>
              </div>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
 
export default App;
