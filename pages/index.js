import React, { Component, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCircle, faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { dispatchSetTodolist } from '../redux/actions';
import { connect } from 'react-redux';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      filter: 'all',
    };
  }

  render() {
    const { list, filter } = this.state;
    const todoreducer = this.props;
    console.log(todoreducer.todoreducer.todolist);
    const todolist = todoreducer.todoreducer.todolist;

    var filteredArray =
      todolist !== undefined
        ? list.filter((obj) => obj.status === true).map((obj, i) => obj.text)
        : 0;
    console.log(filteredArray);

    return (
      <div>
        <header>
          <h1>Todos</h1>
        </header>
        <section>
          <div className="todo-card">
            <div className="header">
              <FontAwesomeIcon
                icon={faChevronDown}
                onClick={() => {
                  const newArr1 = list.map((v) => ({ ...v, status: !v.status }));
                  console.log(newArr1);
                  this.props.handleSetTodolist(newArr1);
                  this.setState({
                      list:newArr1
                  })
                }}
              />
              <input
                type="text"
                className="todo-input"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    list.push({ text: e.target.value, status: false });
                    this.props.handleSetTodolist(list);
                    this.setState({
                      filter: 'all',
                    });

                    e.target.value = '';
                  }
                }}
                placeholder="what need to be done?"
              />
            </div>
            <ul className="todo-list">
              {todolist
                ? _.map(todolist, (item, i) => (
                    <li key={i}>
                      {item.status === true ? (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          onClick={() => {
                            todolist[i].status = false;
                            this.props.handleSetTodolist(todolist);
                            this.setState({
                              list: todolist,
                            });
                          }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCircle}
                          onClick={() => {
                            todolist[i].status = true;
                            this.props.handleSetTodolist(todolist);
                            this.setState({
                              list: todolist,
                            });
                          }}
                        />
                      )}
                      <p className={`${item.status ? 'active' : ''}`}>{item.text}</p>
                      <FontAwesomeIcon
                        icon={faTimes}
                        onClick={() => {
                          todolist.splice(i, 1);
                          console.log(todolist);
                          this.props.handleSetTodolist(todolist);
                          this.setState({
                            list: todolist,
                          });
                        }}
                      />
                    </li>
                  ))
                : null}
            </ul>
            <div className="footer">
              <span className="number">
                {list.length ? todoreducer.todoreducer.todolist.length : 0} items left
              </span>
              <div className="filter">
                <a
                  className={`${filter === 'all' ? 'active' : ''}`}
                  onClick={() => {
                    this.props.handleSetTodolist(list);
                    this.setState({ filter: 'all' });
                  }}
                >
                  All
                </a>
                <a
                  className={`${filter === 'active' ? 'active' : ''}`}
                  onClick={() => {
                    const user = _.filter(list, { status: false });
                    console.log(user);
                    this.props.handleSetTodolist(user);
                    this.setState({ filter: 'active' });
                  }}
                >
                  Active
                </a>
                <a
                  className={`${filter === 'completed' ? 'active' : ''}`}
                  onClick={() => {
                    const user = _.filter(list, { status: true });
                    console.log(user);
                    this.props.handleSetTodolist(user);
                    this.setState({ filter: 'completed' });
                  }}
                >
                  Completed
                </a>
              </div>
              {filteredArray.length > 0 ? (
                <a
                  className="clear"
                  onClick={() => {
                    _.map(filteredArray, (item, i) => {
                      var index = list.findIndex((it) => it.text === item);

                      list.splice(index, 1);

                      filteredArray = [];
                    });

                    this.props.handleSetTodolist(list);
                    this.setState({
                      filter: 'all',
                    });
                  }}
                >
                  Clear Completed
                </a>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todoreducer: state.todo,
});

const mapDispatchToProps = (dispatch) => ({
  handleSetTodolist: (data) => {
    dispatch(dispatchSetTodolist(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
