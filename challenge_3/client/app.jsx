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
    if (this.state.user._id) {
      orderdata._id = this.state.user._id;
    }
    // let orderJSON = JSON.stringify(orderdata);
    axios
      .post('/order', orderdata)
      .then(res => {
        console.log('HOORAY!', res);
        let newState = Object.assign(orderdata, res.data);
        delete newState.password;
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
      return <Form2 next={this.sendPost} />;
    } else if (step === 3) {
      return <Form3 next={this.sendPost} />;
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

var Form2 = ({next}) => {
  return (
    <form>
      <h3>Shipping Information</h3>
      <label>
        Address 1
        <input name="addressLine1"></input>
      </label>
      <label>
        Address 2
        <input name="addressLine2"></input>
      </label>
      <label>
        City
        <input name="city"></input>
      </label>
      <label>
        State
        <input name="state"></input>
      </label>
      <label>
        Zip Code
        <input name="zipCode"></input>
      </label>
      <label>
        Phone:
        <input name="phone"></input>
      </label>
      <input type="submit" value="Next" onClick={(e) => {next(e)}}></input>
    </form>
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
