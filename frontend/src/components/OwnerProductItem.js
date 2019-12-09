import React from "react";
import "./Profile.css";
import "./Popup.css";

export default class OwnerProductItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      itemDescription: "",
      price: ""
    };

    this.itemNameChangeHandler = this.itemNameChangeHandler.bind(this);
    this.itemDescriptionChangeHandler = this.itemDescriptionChangeHandler.bind(
      this
    );
    this.priceChangeHandler = this.priceChangeHandler.bind(this);
    // this.deleteItem = this.deleteItem.bind(this);
  }

  itemNameChangeHandler = e => {
    this.setState({
      itemName: e.target.value
    });
  };
  itemDescriptionChangeHandler = e => {
    this.setState({
      itemDescription: e.target.value
    });
  };
  priceChangeHandler = e => {
    this.setState({
      price: e.target.value
    });
  };

  render() {
    const { product } = this.props;

    return (
      <div class="container">
        <div className="card" style={{ marginBottom: "10px" }}>
          <div className="card-body">
            <div>
              <h4 className="card-title">{product.itemName}</h4>
              <h5 className="card-text">
                Item Description: {product.itemDescription}
              </h5>
              <h5 className="card-text">Price: ${product.price}</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
