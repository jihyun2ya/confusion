import React, {Component} from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, Label, Row, Col
} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';

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
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
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
                        <LocalForm onSubmit={this.handleLogin}>
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
                                              className="form-control" name="author"/>
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