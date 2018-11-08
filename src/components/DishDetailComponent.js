import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardImgOverlay, CardText, CardTitle} from "reactstrap";

class DishDetail extends Component {

    constructor(props) {
        super(props);
    }

    render() {


        if (this.props.selectedDish != null) {
            const comments = this.props.selectedDish.comments.map((item) => {
                return (
                    <div key={item.id}>
                        {item.comment}<br/><br/>
                        --{item.author}, {item.date}<br/><br/>
                    </div>
                );
            });

            return(
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg top src={this.props.selectedDish.image} alt={this.props.selectedDish.name}/>
                            <CardBody>
                                <CardTitle>{this.props.selectedDish.name}</CardTitle>
                                <CardText>{this.props.selectedDish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h1>Comments</h1>
                        {comments}
                    </div>
                </div>
                );
        } else
            return (
                <div></div>
            );
    }
}


export default DishDetail;
