class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      step: 0,
      user: {
        _id: '',
        name: '',
        email: '',
        phone: '',
        shippingAddress: {
          line1: '',
          line2: '',
          city: '',
          state: '',
          zipcode: ''
        },
        billing: {
          cardLast4: '',
          exp: '',
          cvv: '',
          zipcode: ''
        }
      }
    };

    this.startCheckout = this.startCheckout.bind(this);
    this.sendPost = this.sendPost.bind(this);
  }

  startCheckout() {
    this.setState((state) => {
      return {
        step: state.step + 1
      }
    });
  }

  sendPost(e) {
    e.preventDefault();
    console.log(e.target.form.elements);
    let inputs = e.target.form.elements;
    let orderdata = {};
    for (let i = 0; i < inputs.length - 1; i++) {
      orderdata[inputs[i].name] = inputs[i].value;
    }
    // let orderJSON = JSON.stringify(orderdata);
    axios
      .post('/order', orderdata)
      .then(res => {
        console.log('HOORAY!', res);
        let newState = Object.assign(orderdata, res.data);
        this.setState((state) => {
          return {
            user: newState,
            step: state.step + 1
          }
        })
      })
      .catch(err => console.error('Failed request. ', err));

  }

  render() {
    let step = this.state.step;
    if (step === 0) {
      return <CheckOutButton start={this.startCheckout} />;
    } else if (step === 1) {
      return <Form1 next={this.sendPost} />;
    } else if (step === 2) {
      return <Form2 />;
    } else if (step === 3) {
      return <Form3 />;
    } else {
      return <ConfirmPurchase />;
    }
  }
}

var CheckOutButton = ({start}) => {
  return (
    <button onClick={start}>Begin Checkout</button>
  );
};

var Form1 = ({next}) => {
  return (
    <form>
      <label>
        Name:
        <input name="name"></input>
      </label>
      <label>
        Email:
        <input name="email"></input>
      </label>
      <label>
        Password:
        <input name="password"></input>
      </label>
      <input type="submit" value="Next" onClick={(e) => {next(e)}}></input>
    </form>
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

var ConfirmPurchase = (props) => {
  return (
    <div>Complete Order</div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
