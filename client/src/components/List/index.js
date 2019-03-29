import React from "react";
import "./style.css";

// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <div className="list-overflow-container center white br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 tc">
      <ul className="list-group tc black-80">{children}</ul>
    </div>
  );
}

export function ListItem({ children, onClick, name, address, coordinates }) {
  return <li onClick={() => onClick(name, address, coordinates)} className="tc list-group-item white br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5">{children}</li>;
}
