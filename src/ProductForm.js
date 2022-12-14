import React, { Component } from "react";

const RESET_VALUES = {
    id: "",
    category: "",
    price: "",
    name: "",
    instock: true,
};

class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            product: Object.assign({}, RESET_VALUES),
            errors: {},
        };
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState((prevState) => {
            prevState.product[name] = value;
            return { product: prevState.product };
        });
    }

    handleSave(e) {
        this.props.onSave(this.state.product);
        // reset the form values to blank after submitting
        this.setState({
            product: Object.assign({}, RESET_VALUES),
            errors: {},
        });
        // prevent the form submit event from triggering an HTTP Post
        e.preventDefault();
    }

    handleSelectChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
          });
        var option = changeEvent.target.value;
        this.setState((prevState) => {
            if(option === "In Stock"){
                console.log("In")
                prevState.product.instock = true;
            }
            else{
                console.log("Out")
                prevState.product.instock = false;
            }
            return { product: prevState.product }
        })
    }

    render() {
        return (
            <form>
                <h4>Add a new product</h4>
                <p>
                    <label>
                        Name <br />
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.product.name}
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Category <br />
                        <input
                            type="text"
                            className="form-control"
                            name="category"
                            onChange={this.handleChange}
                            value={this.state.product.category}
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Price <br />
                        <input
                            type="text"
                            className="form-control"
                            name="price"
                            onChange={this.handleChange}
                            value={this.state.product.price}
                        />
                    </label>
                </p>
                <div className="form-check">
                    <input className="form-check-input" type="radio" value="In Stock" checked={this.state.product.instock === true} onChange={this.handleSelectChange}/>
                    <label className="form-check-label">In Stock</label>
                      
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" value="Out Of Stock" checked={this.state.product.instock === false} onChange={this.handleSelectChange}/>
                    <label className="form-check-label">Out Of Stock</label>
                </div>
                <br/>
                <input
                    type="submit"
                    className="mt-3 btn btn-info"
                    value="Save"
                    onClick={this.handleSave}
                ></input>
            </form>
        );
    }
}

export default ProductForm;