import React, { Component } from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

class DishDetail extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.selectedDish != null)
            return (
                <Card>
                    <CardImg top src={this.props.selectedDish.image} alt={this.props.selectedDish.name} />
                    <CardBody>
                        <CardTitle>{this.props.selectedDish.name}</CardTitle>
                        <CardText>{this.props.selectedDish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }
}


export default DishDetail;
