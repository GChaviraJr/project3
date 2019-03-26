import React from 'react';
import { ListItem } from "../List";
import { Row, Col } from "../Grid";



function Yelp({ key, id, name, address }) {
  return (
    <ListItem>
      <Row className="flex-wrap-reverse">
        <Col size="md-8">
          <h3 className="font-italic">{id}</h3>
          {id && <h5 className="font-italic">{id}</h5>}
        </Col>
      </Row>
      <Row>
        <Col size="md-6">
            <p className="font-italic small">place: <button>{name}</button></p>
        </Col>
      </Row>
      <Row>
        <Col size="md-6">
          <p className="font-italic small">address: {address}</p>
        </Col>
      </Row>
    </ListItem>
  );
}


export default Yelp;