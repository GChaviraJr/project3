import React from 'react';
import { ListItem } from "../List";
import { Row, Col } from "../Grid";



function Yelp(props) {
  const {name, address, url } = props
  return (
    <ListItem onClick={props.onClick} {...props} className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <Row className="flex-wrap-reverse pa4 black-80">
        <Col size="md-8">
          <h3 className="font-italic black-80">{name}</h3>
          {name && <h5 className="font-italic black-80">{name}</h5>}
        </Col>
      </Row>
      <Row>
        <Col size="md-6">
            <p className="font-italic small black-80">address: <button>{address}</button></p>
        </Col>
      </Row>
      <Row>
        <Col size="md-6">
          <p className="font-italic small black-80">url: {url}</p>
        </Col>
      </Row>
    </ListItem>
  );
}


export default Yelp;