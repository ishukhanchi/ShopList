import React, { Component } from "react";
import { Button, Jumbotron, Container, Toast } from "react-bootstrap";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: [],
      show: false
    };
  }

  updateInput(key, value) {
    this.setState({
      [key]: value
    });
  }
  addItem() {
    //create item with unique id
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
    };
    //copy of current list of items
    const list = [...this.state.list];

    //add new item to list
    list.push(newItem);

    //update state with new list and reset newItem input
    this.setState({
      list,
      newItem: ""
    });
  }

  deleteItem(id) {
    //copy current list of items
    const list = [...this.state.list];

    //filter out item being deleted
    const updatedList = list.filter(item => item.id !== id);
    this.setState({
      list: updatedList
    });
  }
  toggleShow = value => {
    this.setState({ show: value });
  };

  handleClick = () => {
    this.addItem();
    this.toggleShow(!this.state.show);
  }

  render() {
    return (
      <Container className="App">
        <Jumbotron>
          <h1>Shopping list</h1>
          <p>Add an Item!</p>
          <p>
            <input
              type="text"
              placeholder="Type the item name here"
              value={this.state.newItem}
              onChange={e => this.updateInput("newItem", e.target.value)}
            />
          </p>
          <p>
            <Button variant="primary" onClick={() => this.handleClick()}>
              Add
            </Button>
          </p>
          <div>
            {this.state.list.map(item => {
              return (
                <>
                <div className="Header">
                  <Toast
                    key={item.id}
                    show={this.state.show}
                    onClose={() => this.deleteItem(item.id)}
                  >
                    <Toast.Header >
                      <div className="col-sm-9">
                      <strong className="itemvalue">{item.value}</strong>
                      </div>
                    </Toast.Header>
                  </Toast>
                  </div>
                </>
              );
            })}
          </div>
        </Jumbotron>
      </Container>
    );
  }
}

export default App;
