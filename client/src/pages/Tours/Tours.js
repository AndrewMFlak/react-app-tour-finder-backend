import React from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Tours extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tours: [],
      name: "",
      address: "",
      description: ""
    };
  }

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadTours();
  }

  // Loads all books  and sets them to this.state.books
  loadTours = () => {
    API.getTours()
      .then(res =>
        this.setState({ tours: res.data, name: "", address: "", description: "" })
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteTour = id => {
    API.deleteTour(id)
      .then(res => this.loadTours())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name && this.state.address) {
      API.saveTour({
        name: this.state.name,
        address: this.state.address,
        description: this.state.description
      })
        .then(res => this.loadTours())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Wanna go on a tour?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Name (required)"
              />
              <Input
                value={this.state.address}
                onChange={this.handleInputChange}
                name="address"
                placeholder="Address (required)"
              />
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Description (Optional)"
              />
              <FormBtn
                disabled={!(this.state.address && this.state.name)}
                onClick={this.handleFormSubmit}
              >
                Submit Tour
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Tours On My List</h1>
            </Jumbotron>
            {this.state.tours.length ? (
              <List>
                {this.state.tours.map(tour => {
                  return (
                    <ListItem key={tour._id}>
                      <a href={"/tours/" + tour._id}>
                        <strong>
                          {tour.name} by {tour.address}
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteTour(tour._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Tours;
