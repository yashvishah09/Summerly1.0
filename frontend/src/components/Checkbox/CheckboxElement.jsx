import React, { useState } from 'react';

import { Checkbox } from 'semantic-ui-react';
import './CheckBox.css';

function CheckboxElement(props) {
  const [check, setCheck] = useState();

  const handleChange = (e, { value }) => {
    setCheck(value);
  };

  return (
    <div className='checkbox'>
      <Checkbox
        className='checkbox_yes'
        radio
        label={props.label1}
        name={props.name}
        value={props.label1}
        checked={check === props.label1}
        onChange={props.handleChange}
      />
      <Checkbox
        className='checkbox_no'
        radio
        label={props.label2}
        name={props.name}
        value={props.label2}
        checked={check === props.label2}
        onChange={props.handleChange}
      />
    </div>
  );
}

export default CheckboxElement;
