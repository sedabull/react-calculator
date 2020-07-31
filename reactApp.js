class Calculator extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            exp: '',
            active: '0',
            history: '',
            clearNext: false
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

        this.add = this.calc.bind(this, '+');
        this.sub = this.calc.bind(this, '-');
        this.mul = this.calc.bind(this, '*');
        this.div = this.calc.bind(this, '/');
        this.equ = this.calc.bind(this, '=');
    }//end constructor

    input(value) {
        this.setState(state => {
            if(state.clearNext) {
                state.active = '';
                state.clearNext = false;
            }//end if 
            
            if(!state.exp) {
                state.history = '';
            }//end if

            if(state.active.match(/-0+(?!\.)/)) {
                state.active = state.active.replace('0', '');
            }//end if
            
            return {
                active: state.active + value,
                history: state.history
            };//end return changes
        });//end setState
    }//end input

    calc(op) {
        this.setState(state => {
            if(op === '=' && state.history.includes('=')) {
                return {};
            }//end if

            state.clearNext = true;
            state.history = state.exp;
            state.exp += state.active + op;

            if(state.history) {
                state.active = String(eval(state.history + state.active));
                state.history = state.exp;
                if(op === '=') {
                    state.exp = '';
                }//end if
            } else {
                state.active = '0';
                state.history = state.exp;
            }//end if/else
            
            return {
                exp: state.exp,
                active: state.active,
                history: state.history,
                clearNext: state.clearNext
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

    decimal = event => {
        this.setState(state => {
            if(state.active.includes('.')) return {};
            else return { active: state.active + '.' };
        });//end setState
    }//end decimal

    clear = event => {
        this.setState({
            exp: '',
            active: '0',
            history: '',
            clearNext: false
        });//end setState
    }//end clear

    render() {
        return (
            <div className="calculator">
                <h1 className="op">REACT Calculator</h1>
                <h3 className="num">{this.state.history}</h3>
                <h2 className="num">{this.state.active}</h2>
                <div className="buttons">
                    <div className="op button" onClick={this.add}>+</div>
                    <div className="num button" onClick={this.seven}>7</div>
                    <div className="num button" onClick={this.four}>4</div>
                    <div className="num button" onClick={this.one}>1</div>
                    <div className="op button" onClick={this.negate}>±</div>
                    <div className="op button" onClick={this.sub}>-</div>
                    <div className="num button" onClick={this.eight}>8</div>
                    <div className="num button" onClick={this.five}>5</div>
                    <div className="num button" onClick={this.two}>2</div>
                    <div className="num button" onClick={this.zero}>0</div>
                    <div className="op button" onClick={this.mul}>*</div>
                    <div className="num button" onClick={this.nine}>9</div>
                    <div className="num button" onClick={this.six}>6</div>
                    <div className="num button" onClick={this.three}>3</div>
                    <div className="op button" onClick={this.decimal}>.</div>
                    <div className="op button" onClick={this.div}>/</div>
                    <div className="op big button" onClick={this.clear}>C</div>
                    <div className="op big button" onClick={this.equ}>=</div>
                </div>
            </div>
        );//end Calculator JSX
    }//end render

}//end class Calculator

const App = props => <Calculator />;
ReactDOM.render(<App />, document.getElementById('root'));