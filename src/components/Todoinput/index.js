import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { createTodo } from "../../actions";

import { Input, Button, DatePicker } from 'antd';

const Todoinput = ({dispatch}) => {

  const [task, setTask] = useState("");
  const [dateValue, setDate] = useState("");

  const tasks = {
    task,
    date: dateValue
  };

  const onChangeDate = (date, dateString) => {
    setDate(date._d);
  };

  const inputEl = useRef(null);
  return (
    <div>
      <div className="input__field">
        <Input
          onChange={e=>setTask(e.target.value)}
          size="large"
          placeholder="Task"
          ref={inputEl}
          type="text"
        />
        <Button
          size="large"
          type="primary"
          onClick={()=>{
            dispatch(createTodo(tasks))
            inputEl.current.input.value = ""
          }}
        >
          Add
        </Button>
      </div>
      <div className="input__date">
        <DatePicker onChange={onChangeDate} />
      </div>
    </div>
  )
}



export default connect()(Todoinput);
