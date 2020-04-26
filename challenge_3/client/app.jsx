class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      step: 0,
      order: {
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
    this.orderComplete = this.orderComplete.bind(this);
  }

  startCheckout() {
    this.setState((state) => {
      return {
        step: state.step + 1
      }
    });
  }

  orderComplete () {
    this.setState((state) => {
      return{
        step: 0,
        order: {}
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
    if (this.state.order._id) {
      orderdata._id = this.state.order._id;
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
            order: newState,
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
      return <ConfirmPurchase startOver={this.orderComplete} order={this.state.order} />;
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

var Form3 = ({next}) => {
  return (
    <form>
      <h3>Billing Information</h3>
      <label>
        Credit Card #:
        <input name="creditCard"></input>
      </label>
      <label>
        Expiration:
        <input name="exp"></input>
      </label>
      <label>
        CVV:
        <input name="cvv"></input>
      </label>
      <label>
        ZipCode:
        <input name="billingZip"></input>
      </label>
      <input type="submit" value="Next" onClick={(e) => {next(e)}}></input>
    </form>
  );
};

var ConfirmPurchase = ({startOver, order}) => {
  return (
    <div>
      <h3>Confirm Purchase</h3>
      <p>Please confirm the details of your purchase.</p>
  <p><span className="label">Name:</span>{order.name}</p>
  <p><span className="label">Email:</span>{order.email}</p>
  <p><span className="label">Phone:</span>{order.phone}</p>
      <h4>Shipping Information</h4>
  <p><span className="label">Address 1</span>{order.addressLine1}</p>
      <p><span className="label">Address 2</span>{order.addressLine2}</p>
      <p><span className="label">City</span>{order.city}</p>
      <p><span className="label">State</span>{order.state}</p>
      <p><span className="label">Zipcode</span>{order.zipCode}</p>
      <h4>Billing Information</h4>
      <p><span className="label">Credit Card#:</span>{order.creditCard}</p>
      <p><span className="label">Expiration:</span>{order.exp}</p>
      <p><span className="label">CVV:</span>{order.cvv}</p>
      <p><span className="label">Billing Zip:</span>{order.billingZip}</p>
      <img src="https://i.insider.com/5d0bfff7e3ecba67c1015175?width=700&format=jpeg&auto=webp"></img>
      <h4>Purchase Details</h4>
      <p><span className="label">Product:</span> Necker Island</p>
      <p><span className="label">Price:</span>$60 million</p>

      <button onClick={startOver}>Complete Purchase</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
