import { Fragment } from 'react';
import './App.css';

//components
import InputToDo from './components/inputToDo';
import UpdateToDo from './components/updateToDo';
import DeleteItem from './components/deleteItem';
// import ListToDo from './components/listToDo';

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputToDo />
        <UpdateToDo />
        <DeleteItem />
      </div>
    </Fragment>
  );

}

export default App;
