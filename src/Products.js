import React, { Component } from "react";
import Filters from "./Filters";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import $ from "jquery";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: "",
            products: [],
        };
        this.handleFilter = this.handleFilter.bind(this);
        this.handleDestroy = this.handleDestroy.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleUpdateStatus = this.handleUpdateStatus.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        // Fetch API call to retrieve list of products
        fetch("http://localhost:3002/product/get/")
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        products: result,
                    });
                },
                (error) => {
                    console.log("Fetch Error: ", error);
                }
            );
    };

    handleFilter(filterInput) {
        this.setState(filterInput);
    }

    handleSave(product) {
        if (!product.id) {
            product.id = new Date().getTime();
        }
        // make AJAX Post call to create a product
        $.ajax({
            type: "POST",
            url: "http://localhost:3002/product/create/",
            data: product,
        }).then(() => {
            this.getData();
        });
    }

    handleDestroy(productId) {
        // make AJAX Post call to delete a product
        $.ajax({
            type: "DELETE",
            url: `http://localhost:3002/product/delete/${productId}`,
        }).then(() => {
            this.getData();
        });
    }

    handleUpdateStatus(productId, status) {
        // make AJAX Post call to update a product
        $.ajax({
            type: "PUT",
            url: `http://localhost:3002/product/update/${productId}`,
            data: {
                status,
            },
        }).then(() => {
            this.getData();
        });
    }

    render() {
        return (
            <div>
                <h1>My Inventory</h1>
                <Filters onFilter={this.handleFilter}></Filters>
                <ProductTable
                    products={this.state.products}
                    filterText={this.state.filterText}
                    onDestroy={this.handleDestroy}
                    onUpdate={this.handleUpdateStatus}
                ></ProductTable>
                <ProductForm 
                onUpdate={this.handleUpdateStatus}
                onSave={this.handleSave}></ProductForm>
            </div>
        );
    }
}

export default Products;