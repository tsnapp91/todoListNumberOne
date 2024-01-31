import React, { useState } from "react";
import { connect } from "react-redux";
import TodoItem from "./TodoItem";

import {
  completeTodos,
  addTodos,
  updateTodos,
  removeTodos,
} from "../redux/reducer";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodos: (id) => dispatch(removeTodos(id)),
    updateTodos: (obj) => dispatch(updateTodos(obj)),
    completeTodos: (id) => dispatch(completeTodos(id)),
  };
};

const DisplayTodos = (props) => {
  const [sort, setSort] = useState("active");
  return (
    <div className="displaytodos">
      <div className="buttons">
        <button onClick={() => setSort("active")}>Active</button>
        <button onClick={() => setSort("completed")}>completed</button>
        <button onClick={() => setSort("all")}>All</button>
      </div>
      <ul>
        {props.todos.length > 0 && sort === "active"
          ? props.todos.map((item) => {
              return (
                item.completed === false && (
                  <TodoItem
                    key={item.id}
                    item={item}
                    removeTodos={props.removeTodos}
                    updateTodos={props.updateTodos}
                    completeTodos={props.completeTodos}
                  />
                )
              );
            })
          : null}
        {props.todos.length > 0 && sort === "completed"
          ? props.todos.map((item) => {
              return (
                item.completed === true && (
                  <TodoItem
                    key={item.id}
                    item={item}
                    removeTodos={props.removeTodos}
                    updateTodos={props.updateTodos}
                    completeTodos={props.completeTodos}
                  />
                )
              );
            })
          : null}
        {props.todos.length > 0 && sort === "all"
          ? props.todos.map((item) => {
              return (
                <TodoItem
                  key={item.id}
                  item={item}
                  removeTodos={props.removeTodos}
                  updateTodos={props.updateTodos}
                  completeTodos={props.completeTodos}
                />
              );
            })
          : null}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);

//   <ul>
// {props.todos.map((item) => {
//   return (
//     <li key={item.id}>
//       <textarea
//         ref={inputRef}
//         disabled={inputRef}
//         defaultValue={item.item}
//         onKeyDown={(e) => update(item.id, inputRef.current.value, e)}
//       />
//       <button onClick={() => changeFocus()}>Edit</button>
//       <button onClick={() => props.completeTodos(item.id)}>
//         complete
//       </button>
//       <button onClick={() => props.removeTodos(item.id)}>Delete</button>{" "}
//     </li>
//   );
// })}
// </ul>
