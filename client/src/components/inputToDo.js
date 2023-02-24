import React, { Fragment, useState } from 'react';


const InputToDo = () => {

    const [listname, setListname] = useState("");
    const [item, setItem] = useState("");

    const onSubmitForm = async e => {
      e.preventDefault();
      try {
        const response =
        await fetch(`http://localhost:5431/addToList?listname=${listname}&item=${item}`, {
          method: "POST",
          headers: { "Content-Type": "application/json"},
        });
        console.log(response);
        alert(JSON.stringify(response));

        window.location = "/";
      } catch (err) {
        console.error(err.message);
      }
    };

    return (
        <Fragment>
          <h1 className="text-center mt-5">Input Todo List</h1>
          <form className="d-flex mt-5" onSubmit={onSubmitForm}>
            <input
              type="text"
              className="form-control"
              label="listname"
              name="listname"
              value={listname}
              onChange={e => setListname(e.target.value)}
              placeholder="list to add to"
            />
            <input
              type="text"
              className="form-control"
              label="item"
              name="item"
              value={item}
              onChange={e => setItem(e.target.value)}
              placeholder="item to add"
            />
            <button className="btn btn-success">Add</button>
          </form>
        </Fragment>
      );
};


export default InputToDo;