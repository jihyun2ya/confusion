import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

class DishDetail extends Component {

    render() {
        if (this.props.dish != null) {
            const comments = this.props.dish.comments.map((item) => {
                return (
                    <div key={item.id}>
                        {item.comment}<br/><br/>
                        --{item.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.date)))}<br/><br/>
                    </div>
                );
            });

            return(
                <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg top src={this.props.dish.image} alt={this.props.dish.name}/>
                            <CardBody>
                                <CardTitle>{this.props.dish.name}</CardTitle>
                                <CardText>{this.props.dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h1>Comments</h1>
                        {comments}
                    </div>
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
