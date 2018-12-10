import React, {Component} from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, Label, Row, Col
} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        // console.log("Current State is: " + JSON.stringify(values));
        // alert("Current State is: " + JSON.stringify(values));
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-edit fa-lg"></span>Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <Row className="fcol-12 col-md-9">
                                <Label htmlFor="rating">Rating</Label>
                            </Row>
                            <Row className="col-12 col-md-9 form-group">
                                    <Control.select model=".rating" id="rating" name="rating"
                                                    className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                            </Row>
                            <Row className="fcol-12 col-md-9">
                                <Label htmlFor="name">Name</Label>
                            </Row>
                            <Row className="col-12 col-md-9 form-group">
                                <Control.text model=".author" id="author"
                                              validators={{
                                                  maxLength: maxLength(15),
                                                  minLength: minLength(3)
                                              }}
                                              className="form-control" name="author"/>
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Row>
                            <Row className="col-12 col-md-9">
                                <Label htmlFor="comment">Comment</Label>
                            </Row>
                            <Row className="col-12 col-md-9 form-group">
                                <Control.textarea model=".comment" id="comment"
                                                  rows="6"
                                                  className="form-control" name="comment"/>
                            </Row>
                            <Button type="submit" value="submit" color="primary" className="bg-primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default CommentForm;