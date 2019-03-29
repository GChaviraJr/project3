import React from "react";
import Card from "../Card/Card"
import { ListItem } from "../List";
import { Row, Col } from "../Grid";



function Selected({ key, id, searchProducts, onClick, name, address, longitude, latitude, isSelected, toggleSelected}) {
  return (
    <Card className="center">
        <ListItem onClick={{onClick}} className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <Row className="flex-wrap-reverse pa4 black-80">
                <Col size="md-8">
                    <h3 className="font-italic black-80">{name}</h3>
                    {name && <h5 className="font-italic black-80">{name}</h5>}
                </Col>
            </Row>
            <Row>
                <Col size="md-6">
                    <p className="font-italic small black-80">address: {address}</p>
                </Col>
            </Row>
            <Row>
                <Col size="md-6">
                <div >If you need a ride, use Uber!</div>
                <button onClick={searchProducts}>Uber Button</button>
                </Col>
            </Row>
        </ListItem>
    </Card>
  );
}


export default Selected;