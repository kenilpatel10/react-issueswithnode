import React from 'react';
import {Alert} from "react-bootstrap";

function Alert1(props) {
  return (
      <div>
{props.alert &&
<Alert variant="success">
  <Alert.Heading>
  {props.alert}
  </Alert.Heading>
  
</Alert>}
  </div>
  )}
    
export default Alert1;
