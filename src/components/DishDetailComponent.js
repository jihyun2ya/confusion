import React from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

function RenderDish({dish}) {
    return (
        <Card>
            <CardImg top src={dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

function RenderComments({comments}) {
    const commentsView = comments.map((item) => {
        return (
            <div key={item.id}>
                {item.comment}<br/><br/>
                --{item.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.date)))}<br/><br/>
            </div>
        );
    });

    return (
        <div>
            {commentsView}
        </div>
    );
}

const DishDetail = (props) => {
    if (props.dish !== undefined) {
        return(
            <div className="container">
                 <div className="row">
                     <div className="col-12 col-md-5 m-1">
                         <RenderDish dish={props.dish}/>
                     </div>
                     <div className="col-12 col-md-5 m-1">
                         <h1>Comments</h1>
                         <RenderComments comments={props.dish.comments}/>
                     </div>
                 </div>
             </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

export default DishDetail;
