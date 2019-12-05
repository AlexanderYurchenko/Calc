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
    event && event.preventDefault();

    let valueStr = String(value);
    const inputBlock = document.getElementById('js-input');
    let { inputValue, firstDigit, secondDigit, currentAction } = this.state;

    if (!currentAction) { // action not set
      if (!firstDigit) {         // firstDigit empty
        if (valueStr !== '0') {
          this.setState({
            firstDigit: valueStr,
            inputValue: valueStr
          })
        }
      } else {                              // firstDigit not empty
        this.setState({
          firstDigit: firstDigit + valueStr,
          inputValue: inputValue + valueStr
        })
      }
    } else {                                // action is set
      if (!firstDigit) {         // firstDigit empty
        if (currentAction === 'ADD' || currentAction === 'MULTIPLY' || currentAction === 'DIVIDE') {
          if (!secondDigit) {    // secondDigit empty
            this.setState({
              secondDigit: valueStr,
              inputValue: valueStr
            })
          } else {                          // secondDigit not empty
            this.setState({
              secondDigit: secondDigit + valueStr,
              inputValue: secondDigit + valueStr
            })
          }
        } else if (currentAction === 'SUBSTRACT') {
          if (!secondDigit) {    // secondDigit empty
            this.setState({
              secondDigit: valueStr,
              inputValue: '-' + valueStr
            })
          } else {                          // secondDigit not empty
            this.setState({
              secondDigit: secondDigit + valueStr,
              inputValue: inputValue + valueStr
            })
          }
        }
      } else {                              // firstDigit not empty
        if (!secondDigit) {      // secondDigit empty
          if (valueStr !== '0') {
            this.setState({
              secondDigit: valueStr,
              inputValue: inputValue + valueStr
            })
          }
        } else {                            // secondDigit not empty
          this.setState({
            secondDigit: secondDigit + valueStr,
            inputValue: inputValue + valueStr
          })
        }
      }
    }

    this.scrollInputRight(inputBlock);
  }

  handleCommaClick = (event) => {
    event && event.preventDefault();
    let { inputValue, firstDigit, secondDigit, currentAction } = this.state;

    if (currentAction) {
      if (secondDigit) {
        if (!secondDigit.toString().includes('.')) {
          this.setState({
            secondDigit: secondDigit + ',',
            inputValue: inputValue + ','
          })
        }
      } else {
        this.setState({
          secondDigit: '0.',
          inputValue: inputValue + '0,'
        })
      }
    } else {
      if (firstDigit) {
        if (!firstDigit.toString().includes('.')) {
          this.setState({
            firstDigit: firstDigit + ',',
            inputValue: inputValue + ','
          })
        }
      } else {
        this.setState({
          firstDigit: '0.',
          inputValue: '0,'
        })
      }
    }
  }

  handleMathAction = (event, type) => {
    event && event.preventDefault();
    let actionSymbol;
    const inputBlock = document.getElementById('js-input');
    
    if (type === 'ADD') {
      actionSymbol = '+';
    } else if (type === 'SUBSTRACT') {
      actionSymbol = '-';
    } else if (type === 'DIVIDE') {
      actionSymbol = '/';
    } else if (type === 'MULTIPLY') {
      actionSymbol = '*';
    }

    if (this.state.currentAction) {       // if action is already set - launch calculate method 
      this.calculate().then(() => {
        this.setState({
          currentAction: type,
          inputValue: this.state.inputValue + actionSymbol
        });
      });
    } else {
      this.setState({ 
        currentAction: type
      });
      if (this.state.inputValue && this.state.inputValue !== '0') {     // change input only if not 0
        this.setState({ 
          inputValue: this.state.inputValue + actionSymbol
        });
      } 
    }

    this.scrollInputRight(inputBlock);
  }

  handleDelete = () => {
    let { firstDigit, secondDigit, currentAction, inputValue } = this.state;
    if (secondDigit) {
      if (secondDigit.length < 2) {
        this.setState({
          secondDigit: null,
        })
      } else {
        this.setState({
          secondDigit: secondDigit.toString().substring(0, secondDigit.length - 1)
        })
      }      
    } else if (currentAction) {
      this.setState({
        currentAction: null
      });
    } else if (firstDigit) {
      this.setState({
        firstDigit: firstDigit.toString().substring(0, firstDigit.length - 1)
      })
    }

    if (inputValue.length < 2) {
      this.setState({
        inputValue: '0'
      })
    } else {
      this.setState({
        inputValue: inputValue.toString().substring(0, inputValue.length - 1)
      })
    }
  }

  handleCalculate = (event) => {
    event && event.preventDefault();
    this.calculate();

    const inputBlock = document.getElementById('js-input');
    this.scrollInputRight(inputBlock);
  }

  async calculate() {
    let result,
    output,
    { firstDigit, secondDigit } = this.state;
    firstDigit = firstDigit && parseFloat(firstDigit.toString().replace(',', '.'));

    if (!secondDigit) {
      this.setState({
        inputValue: firstDigit,
        firstDigit: firstDigit,
        secondDigit: null,
        currentAction: null
      });
      result = firstDigit;
    } else {
      secondDigit = parseFloat(secondDigit.toString().replace(',', '.'));

      if (this.state.currentAction === 'ADD') {
        result = firstDigit + secondDigit;
      } else if (this.state.currentAction === 'MULTIPLY') {
        result = firstDigit * secondDigit;
      } else if (this.state.currentAction === 'DIVIDE') {
        result = firstDigit / secondDigit;
      } else if (this.state.currentAction === 'SUBSTRACT') {
        result = firstDigit - secondDigit;
      }
    }

    output = result;
    if (output.toString().indexOf('.') > -1 && output.toString().split(".")[1].length > 5) {
      output = result.toFixed(5).toString().replace('.', ',') + '...';
    } else {
      output = result.toString().replace('.', ',')
    }

    this.setState({
      inputValue: output,
      firstDigit: result,
      secondDigit: null,
      currentAction: null
    });
  }

  handleKeyDown = (event) => {
    if ( 47 < event.keyCode && event.keyCode < 58 ) { // digits
      this.handleNumClick(event, String.fromCharCode(event.keyCode));
    } else if (95 < event.keyCode && event.keyCode < 106) {
      this.handleNumClick(event, String.fromCharCode(event.keyCode - 48));
    } else if (event.keyCode === 107) { // add
      this.handleMathAction(event, 'ADD');
    } else if (event.keyCode === 109 || event.keyCode === 173) { // substract
      this.handleMathAction(event, 'SUBSTRACT');
    } else if (event.keyCode === 106) { // multiply
      this.handleMathAction(event, 'MULTIPLY');
    } else if (event.keyCode === 111 || event.keyCode === 191) { // divide
      this.handleMathAction(event, 'DIVIDE');
    } else if (event.keyCode === 8) { // backspace
      event.preventDefault();
      this.handleDelete();
    } else if (event.keyCode === 13) { // enter
      event.preventDefault();
      this.handleCalculate();
    } else if (event.keyCode === 188 || event.keyCode === 110) { // comma
      this.handleCommaClick();
    }
  }

  handleInputFocus = (event) => { // to move cursor to the end of input
    this.scrollInputRight(event.target);
  }

  scrollInputRight = (target) => {
    target.setSelectionRange(target.value.length, target.value.length);
  }

  handleInputChange = () => {
    
  }

  handleClear = () => {
    this.setState({
      inputValue: '0',
      firstDigit: null,
      secondDigit: null,
      currentAction: null
    });
  }

  componentDidMount() {
    document.getElementById('js-input').focus();
  }

  render() { 
    const { inputValue } = this.state;
    
    return ( 
      <React.Fragment>
        <form className="w-inner" onKeyDown={this.handleKeyDown} tabIndex="0">
          <div className="c-calc">
            <div className="c-calc__input-box">
              <input type="text" placeholder="0" className="c-calc__input" id="js-input"                 
                onChange={this.handleInputChange}
                onFocus={ (event) => this.handleInputFocus(event)}
                onClick={ (event) => this.handleInputFocus(event)}
                value={inputValue}/>
            </div>
            <div className="c-calc__action-box">
              <button type="button" className="btn btn--clear" onClick={this.handleClear}>ce</button>
              <button type="button" className="btn btn--action btn--sm" onClick={ (event) => this.handleMathAction(event, 'MULTIPLY')}>&#x2716;</button>
              <button type="button" className="btn btn--action" onClick={ (event) => this.handleMathAction(event, 'DIVIDE')}>&#247;</button>
              <button type="button" className="btn btn--action" onClick={ (event) => this.handleMathAction(event, 'SUBSTRACT')}>&ndash;</button>
              <button type="button" className="btn btn--action" onClick={ (event) => this.handleMathAction(event, 'ADD')}>+</button>
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
                <button type="button" className="btn" onClick={this.handleCommaClick}>,</button>
              </div>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
 
export default App;
