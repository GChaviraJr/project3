import React from "react";
import "./style.css";

// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <div className="list-overflow-container white br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <ul className="list-group black-80">{children}</ul>
    </div>
  );
}

export function ListItem({ children }) {
  return <li className="list-group-item black-80">{children}</li>;
}
