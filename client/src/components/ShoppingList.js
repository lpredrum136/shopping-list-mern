import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//import uuid from 'uuid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItems, deleteItem } from '../actions/itemActions';

class ShoppingList extends Component {
  /*state = {
    items: [
      { id: uuid.v4(), name: 'Eggs' },
      { id: uuid.v4(), name: 'Milk' },
      { id: uuid.v4(), name: 'Steak' },
      { id: uuid.v4(), name: 'Water' }
    ]
  };*/

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.my_items;

    return (
      <Container>
        {/* <Button
          color='dark'
          style={{ marginBottom: '2rem' }}
          onClick={() => {
            const name = prompt('Enter item');
            if (name) {
              this.setState(prevState => ({
                items: [...prevState.items, { id: uuid.v4(), name: name }]
              }));
            }
          }}
        >
          Add Item
        </Button> */}

        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {items.map(item_object => (
              <CSSTransition
                key={item_object._id}
                timeout={500}
                classNames='fade'
              >
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Button
                      className='remove-btn'
                      color='danger'
                      size='sm'
                      onClick={this.onDeleteClick.bind(this, item_object._id)}
                    >
                      &times;
                    </Button>
                  ) : null}

                  {item_object.name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  my_items: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    my_items: state.myitems,
    isAuthenticated: state.myauth.isAuthenticated
  };
};

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);
