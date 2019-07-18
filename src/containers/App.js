import React, { Component } from "react";
import { Card } from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { search } from "../actions/actions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { showList: "hidden", highlightedCard: -1 };
    this.scrollList = React.createRef();
  }

  componentDidMount() {}

  componentDidUpdate() {
    if (this.state.highlightedCard === -1 && this.state.showList === "hidden")
      this.scrollList.current.scrollTo(0, 0);
  }

  handleData(event) {
    if (event.target.value === "") {
      this.setState({ showList: "hidden" });
      this.setState({ highlightedCard: -1 });
      if (this.refs[this.state.highlightedCard])
        this.refs[this.state.highlightedCard].style.backgroundColor = "white;";
    } else {
      this.setState({ showList: "visible" });
      this.setState({ highlightedCard: -1 });
    }
    const { dispatch } = this.props;
    dispatch(search(event.target.value));
  }

  handleShow(event) {
    if (event.target.id !== this.state.highlightedCard) {
      if (this.state.highlightedCard !== -1)
        this.refs[this.state.highlightedCard].style.backgroundColor = "white";
      this.setState({ highlightedCard: event.target.id });
      this.refs[event.target.id].scrollIntoView({
        block: "nearest",
        behavior: "smooth"
      });
      this.refs[event.target.id].style.backgroundColor = "lightyellow";
    }
  }

  handleShowKeyDown(event) {
    if (event.keyCode === 40) {
      var currentCard = this.state.highlightedCard;
      this.refs[currentCard].style.backgroundColor = "white";
      currentCard = parseInt(currentCard) + 1;
      if (this.refs[currentCard]) {
        this.refs[currentCard].focus();
        this.refs[currentCard].scrollIntoView({
          block: "nearest",
          behaviour: "smooth"
        });
        this.refs[currentCard].style.backgroundColor = "lightyellow";
        this.setState({ highlightedCard: currentCard });
      } else {
        this.refs[currentCard - 1].style.backgroundColor = "lightyellow";
      }
    }
  }

  handleShowKeyUp(event) {
    if (event.keyCode === 38) {
      var currentCard = this.state.highlightedCard;
      this.refs[currentCard].style.backgroundColor = "white";
      currentCard = parseInt(currentCard) - 1;
      if (this.refs[currentCard]) {
        this.refs[currentCard].focus();
        this.refs[currentCard].scrollIntoView({
          block: "nearest",
          behaviour: "smooth"
        });
        this.refs[currentCard].style.backgroundColor = "lightyellow";
        this.setState({ highlightedCard: currentCard });
      } else {
        this.refs[currentCard + 1].style.backgroundColor = "lightyellow";
      }
    }
  }

  handleHide(event) {
    if (event.target.id === this.state.highlightedCard) {
      this.setState({ highlightedCard: -1 });
    }

    if (this.refs[event.target.id])
      this.refs[event.target.id].style.backgroundColor = "white";
  }

  getCards(results) {
    var cardsList = [];

    if (results.length === 0) {
      cardsList.push(
        <Card className="rectangle">
          <Card.Body style={{ textAlign: "center" }}>
            <Card.Text className="noCard">No User Found</Card.Text>
          </Card.Body>
        </Card>
      );
    } else {
      results.forEach(
        function(result, i) {
          var items;
          items = result.items ? (
            <div>
              <hr />
              {result.items}
              <hr />
            </div>
          ) : null;

          cardsList.push(
            <Card
              className="rectangle"
              key={i}
              ref={i}
              id={i}
              tabIndex="0"
              onKeyDown={this.handleShowKeyDown.bind(this)}
              onKeyUp={this.handleShowKeyUp.bind(this)}
              onMouseDown={this.handleShow.bind(this)}
              onMouseOut={this.handleHide.bind(this)}
            >
              <Card.Body style={{ pointerEvents: "none" }}>
                <Card.Text className="cardParagraph">
                  <b>{result.id}</b>
                </Card.Text>
                <Card.Text className="cardParagraph">{result.name}</Card.Text>
                {items}
                <Card.Text className="cardParagraph">
                  {result.address}
                </Card.Text>
                <Card.Text className="cardParagraph">
                  {result.pincode}
                </Card.Text>
              </Card.Body>
            </Card>
          );
        }.bind(this)
      );
    }

    return cardsList;
  }

  restrictScroll(event) {
    if (event.keyCode === 38 || event.keyCode === 40) {
      event.preventDefault();

      if (event.keyCode === 40) {
        var currentCard = this.state.highlightedCard;

        if (this.refs[currentCard])
          this.refs[currentCard].style.backgroundColor = "white";

        currentCard = parseInt(currentCard) + 1;
        if (this.refs[currentCard]) {
          this.refs[currentCard].scrollIntoView({
            block: "nearest",
            behavior: "smooth"
          });
          this.refs[currentCard].style.backgroundColor = "lightyellow";
          this.setState({ highlightedCard: currentCard });
        } else {
          if (this.refs[currentCard - 1])
            this.refs[currentCard - 1].style.backgroundColor = "lightyellow";
        }
      }
      if (event.keyCode === 38) {
        var currentCard = this.state.highlightedCard;

        if (this.refs[currentCard])
          this.refs[currentCard].style.backgroundColor = "white";

        currentCard = parseInt(currentCard) - 1;
        if (this.refs[currentCard]) {
          this.refs[currentCard].scrollIntoView({
            block: "nearest",
            behavior: "smooth"
          });
          this.refs[currentCard].style.backgroundColor = "lightyellow";
          this.setState({ highlightedCard: currentCard });
        } else {
          if (this.refs[currentCard + 1])
            this.refs[currentCard + 1].style.backgroundColor = "lightyellow";
          else if (this.refs[currentCard + 2])
            this.refs[currentCard + 2].style.backgroundColor = "lightyellow";
        }
      }
    }
  }

  render() {
    const { results } = this.props;

    var cards = this.getCards(results);

    return (
      <div className="content d-flex flex-column justify-content-center align-items-center">
        <div className="search">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1" className="rectangle">
                Search
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={this.handleData.bind(this)}
              onKeyDown={this.restrictScroll.bind(this)}
              placeholder="users by id, address, nameor items that they have added"
              title="Search users by id, address, nameor items that they have added"
              aria-label="Search"
              aria-describedby="basic-addon1"
              className="rectangle"
            />
          </InputGroup>
        </div>
        <ul
          ref={this.scrollList}
          className="list-group dropdown"
          style={{ visibility: this.state.showList }}
        >
          {cards}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { searchState } = state;
  var results = searchState["results"] || [];

  return {
    results
  };
}

export default connect(mapStateToProps)(App);
