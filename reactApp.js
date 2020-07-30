class Calculator extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            left: NaN,
            right: NaN,
            active: '0',
            history: ''
        };//end state

        this.zero = this.input.bind(this, '0');
        this.one = this.input.bind(this, '1');
        this.two = this.input.bind(this, '2');
        this.three = this.input.bind(this, '3');
        this.four = this.input.bind(this, '4');
        this.five = this.input.bind(this, '5');
        this.six = this.input.bind(this, '6');
        this.seven = this.input.bind(this, '7');
        this.eight = this.input.bind(this, '8');
        this.nine = this.input.bind(this, '9');
        this.decimal = this.input.bind(this, '.');

        this.add = this.calc.bind(this, '+');
        this.sub = this.calc.bind(this, '-');
        this.mul = this.calc.bind(this, '*');
        this.div = this.calc.bind(this, '/');
        this.equ = this.calc.bind(this, '=');
    }//end constructor

    input(value) {
        this.setState(state => {
            if(state.active[0] === '0') {
                state.active = state.active.replace('0', '');
            } else if(value === '.') {
                if(state.active.includes(value)) return {};
            }//end if/else-if
            
            return { active: state.active + value };
        });//end setState
    }//end input

    calc(op) {
        this.setState(state => {
            if(state.left) {
                state.history += state.active + op;
                state.left = eval(state.history.slice(0, -1));
                state.right = Number(state.active);
                
                if(op !== '='){
                    state.active = eval(state.left + op + state.right).toString();
                } else {
                    state.active = eval(state.history.slice(0, -1)).toString();
                    state.left = NaN;
                    state.right = NaN;
                }//end if/else
            } else {
                state.left = Number(state.active);
                state.history = state.active + op;
                state.active = '0';
            }//end if/else

            return {
                left: state.left,
                right: state.right,
                active: state.active,
                history: state.history
            };//end return changes
        });//end setState
    }//end calc

    negate = event => {
        this.setState(state => {
            if(state.active[0] === '-') {
                state.active = state.active.slice(1);
            } else {
                state.active = '-' + state.active;
            }//end if/else
            return { active: state.active };
        });//end setState
    }//end negate

    clear = event => {
        this.setState({
            left: NaN,
            right: NaN,
            active: '0',
            history: ''
        });//end setState
    }//end clear

    render() {
        return (
            <div className="calculator">
                <h1>Simple Calculator</h1>
                <h3>{this.state.history}</h3>
                <h2>{this.state.active}</h2>
                <div className="buttons">
                    <div className="button" onClick={this.add}>+</div>
                    <div className="button" onClick={this.seven}>7</div>
                    <div className="button" onClick={this.four}>4</div>
                    <div className="button" onClick={this.one}>1</div>
                    <div className="button" onClick={this.negate}>±</div>
                    <div className="button" onClick={this.sub}>-</div>
                    <div className="button" onClick={this.eight}>8</div>
                    <div className="button" onClick={this.five}>5</div>
                    <div className="button" onClick={this.two}>2</div>
                    <div className="button" onClick={this.zero}>0</div>
                    <div className="button" onClick={this.mul}>*</div>
                    <div className="button" onClick={this.nine}>9</div>
                    <div className="button" onClick={this.six}>6</div>
                    <div className="button" onClick={this.three}>3</div>
                    <div className="button" onClick={this.decimal}>.</div>
                    <div className="button" onClick={this.div}>/</div>
                    <div className="big button" onClick={this.clear}>C</div>
                    <div className="big button" onClick={this.equ}>=</div>
                </div>
            </div>
        );//end Calculator JSX
    }//end render

}//end class Calculator

const App = props => <Calculator />;
ReactDOM.render(<App />, document.getElementById('root'));