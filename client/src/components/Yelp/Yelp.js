import React from 'react';
import { ListItem } from "../List";
import { Row, Col } from "../Grid";



function Yelp(props) {
  const {name, address, url } = props
  return (
    <ListItem onClick={props.onClick} {...props}>
      <Row className="flex-wrap-reverse pa4 black-80">
        <Col size="md-8">
          <h3 className="font-italic black-80">{name}</h3>
          {name && <h5 className="font-italic black-80">{name}</h5>}
        </Col>im stuck in the main room
      </Row> 
      <Row>
        <Col size="md-6">
            <p className="font-italic small black-80">address: {address}</p>
        </Col>
      </Row>
      <Row>
        <Col size="md-6" className="tc">
          <p className="font-italic tc small black-80">url: {url}</p>
        </Col>
      </Row>
    </ListItem>
  );
}


export default Yelp;