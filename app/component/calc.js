import React from 'react';
import '../style/calc.sass';

const doCalc = (a = 0, o = '+') => {
  switch (o) {
    case '/':
      return b => a / b;
    case '*':
      return b => a * b;
    case '-':
      return b => a - b;
    case '+':
    default:
      return b => a + b;
  }
}

class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calc: doCalc(0),
      result: 0,
      operator: true
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.result === nextState.result) {
      return false;
    }
    return true;
  }

  handleKeyDown(e) {
    this.handleInput(e.key);
  }

  handleInput(key) {
    console.log('input')
    if ('clear' === key) {
      this.setState({
        calc: doCalc(0),
        result: 0,
        operator: true
      }, () => console.log('Calculator has been resetted!'))
    } else if (/[0-9.]/.test(key)) {
      this.setState((prevState) => {
        return {
          result: Number(prevState.operator ? key : prevState.result.toString() + key),
          operator: false
        }
      })
    } else if (/[\+\-\*\/]/.test(key)) {
      this.setState((prevState) => {
        let prevResult = prevState.calc(prevState.result);
        return {
          calc: doCalc(prevResult, key),
          result: prevResult,
          operator: true
        }
      })
    }
  }

  render() {
    return (
      <div className="calc">
        <DisplayArea result={this.state.result} />
        <InputArea onBtnClick={this.handleInput} />
      </div>
    )
  }
}

const DisplayArea = ({ result }) => (
  <div className="display-area">{result}</div>
);

class InputArea extends React.Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(obj) {
    this.props.onBtnClick(obj);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="input-area">
        <div className="left">
          <CalcBtn type="clear" value="clear" whenClick={this.onButtonClick} />
          <div className="num">
            <CalcBtn type="num" value="." whenClick={this.onButtonClick} />
            <CalcBtn type="num" value="0" whenClick={this.onButtonClick} />
            <CalcBtn type="num" value="1" whenClick={this.onButtonClick} />
            <CalcBtn type="num" value="2" whenClick={this.onButtonClick} />
            <CalcBtn type="num" value="3" whenClick={this.onButtonClick} />
            <CalcBtn type="num" value="4" whenClick={this.onButtonClick} />
            <CalcBtn type="num" value="5" whenClick={this.onButtonClick} />
            <CalcBtn type="num" value="6" whenClick={this.onButtonClick} />
            <CalcBtn type="num" value="7" whenClick={this.onButtonClick} />
            <CalcBtn type="num" value="8" whenClick={this.onButtonClick} />
            <CalcBtn type="num" value="9" whenClick={this.onButtonClick} />
          </div>
        </div>
        <div className="right">
          <CalcBtn type="operator" value="/" whenClick={this.onButtonClick} />
          <CalcBtn type="operator" value="*" whenClick={this.onButtonClick} />
          <CalcBtn type="operator" value="+" whenClick={this.onButtonClick} />
          <CalcBtn type="operator" value="-" whenClick={this.onButtonClick} />
          <CalcBtn type="operator" value="=" whenClick={this.onButtonClick} />
        </div>
      </div>
    );
  }
}

class CalcBtn extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.props.whenClick(e.target.innerHTML);
  }
  render() {
    return (
      <div className={'btn ' + this.props.type + '-btn' + (this.props.value === '0' ? ' zero-btn' : '')}
        onClick={this.handleClick}>
        {this.props.value}</div>
    );
  }
}

export default Calc;