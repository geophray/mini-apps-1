
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      step: 0
    }
  }

  render() {
    let step = this.state.step;
    if (step === 0) {
      return <CheckOutButton />;
    } else if (step === 1) {
      return <Form1 />;
    } else if (step === 2) {
      return <Form2 />;
    } else if (step === 3) {
      return <Form3 />;
    } else {
      return <OrderComplete />;
    }
  }
}

var CheckOutButton = (props) => {
  return (
    <div>Button</div>
  );
};

var Form1 = (props) => {
  return (
    <div>Form 1</div>
  );
};

var Form2 = (props) => {
  return (
    <div>Form 2</div>
  );
};

var Form3 = (props) => {
  return (
    <div>Form 3</div>
  );
};

var OrderComplete = (props) => {
  return (
    <div>Order Complete</div>
  );
};

console.log('My react is being executed/transpiled!');

ReactDOM.render(<App />, document.getElementById('app'));
