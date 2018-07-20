import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import MapContainer from "../../components/MapContainer";
// import GoogleAPI from "../../utils/GoogleAPI";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tour: {},
      isUpdate: false
    };
  }
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getTour(this.props.match.params.id)
      .then(res => this.setState({ tour: res.data }))
      .catch(err => console.log(err));
    // GoogleAPI.getMap(this.props)
  }

  handleUpdate(isUpdate) {
    this.setState({ isUpdate: isUpdate })
  }

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;

    const updatedTour = { ...this.state.tour }
    updatedTour[name] = value

    this.setState({
      tour: updatedTour
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.tour.name && this.state.tour.address) {
      API.patchTour(this.props.match.params.id, this.state.tour)
        .then(res => this.setState({ isUpdate: false }))
        .catch(err => console.log(err));
    }
  };

  getReadOnly = () => (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>
              {this.state.tour.name} by {this.state.tour.address}
            </h1>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col size="md-10 md-offset-1">
          <article>
            <h1>Description</h1>
            <ul>
              <li>{this.state.tour.name}</li>
              <li>{this.state.tour.address}</li>
            </ul>
            <p>
              {this.state.tour.description}
            </p>
          </article>
        </Col>
      </Row>
      <Row>
        <button onClick={() => this.handleUpdate(true)}>Update</button>
        <Col size="md-2">
          <Link to="/">← Back to Authors</Link>
        </Col>
      </Row>
      {/* <MapContainer /> */}
    </Container>
  );

  getUpdateform = () => (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>What Tours Should I Go On?</h1>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col size="md-10 md-offset-1">
          <form>
            <Input
              value={this.state.tour.name}
              onChange={this.handleInputChange}
              name="name"
              placeholder="Name (required)"
            />
            <Input
              value={this.state.tour.address}
              onChange={this.handleInputChange}
              name="address"
              placeholder="Address (required)"
            />
            <TextArea
              value={this.state.tour.description}
              onChange={this.handleInputChange}
              name="description"
              placeholder="Description (Optional)"
            />
            <button onClick={() => this.handleUpdate(false)}>Cancel</button>
            <FormBtn
              disabled={!(this.state.tour.address && this.state.tour.name)}
              onClick={this.handleFormSubmit}
            >
              Submit Tour
            </FormBtn>
          </form>
        </Col>
      </Row>
    </Container>
  );

  render() {
    if (this.state.isUpdate) return this.getUpdateform();
    else return this.getReadOnly();
  }
}

export default Detail;
