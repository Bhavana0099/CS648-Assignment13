import React, { Component } from "react";

class ProductRow extends Component {
    constructor(props) {
        super(props);
        this.destroy = this.destroy.bind(this);
    }

    updateStatus = () => {
        this.props.updateStatus(
            this.props.product.productid,
            !this.props.product.instock
        );
    };

    destroy() {
        this.props.onDestroy(this.props.product.productid);
    }

    render() {
        return (
            <tr>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.category}</td>
                <td>{this.props.product.price}</td>
                <td>{this.props.product.instock === true ? 'In Stock' : 'Out Of Stock'}</td>
                <td className="text-right"><button onClick={this.updateStatus} className="btn btn-info">Update Stock Status</button></td>
                <td className="text-right">
                    <button onClick={this.destroy} className="btn btn-info">
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}

export default ProductRow;