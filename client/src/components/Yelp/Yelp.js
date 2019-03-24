import React from 'react';
import { ListItem } from "../List";
import { Row, Col } from "../Grid";


function Yelp({ restaurantName, restaurantAddress }) {
  return (
    <ListItem>
      <Row className="flex-wrap-reverse">
        <Col size="md-8">
          <h3 className="font-italic">{restaurantName}</h3>
          {restaurantName && <h5 className="font-italic">{restaurantName}</h5>}
        </Col>
      </Row>
      <Row>
        <Col size="md-6">
          <p className="font-italic small">location: {restaurantAddress}</p>
        </Col>
      </Row>
    </ListItem>
  );
}


export default Yelp;