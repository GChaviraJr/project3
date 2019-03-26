import React from "react";

function Card({ title, children }) {
  return (
    <div className="card mt-4 white br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <div className="card-header black-80 br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <h3>
          <strong>
            <i className={`black-80 fa fa-${title}`} aria-hidden="true" /> {title}
          </strong>
        </h3>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}

export default Card;
