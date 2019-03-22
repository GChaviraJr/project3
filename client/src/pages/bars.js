import React from "react";

import API from "../utils/API";


class Bars extends Component {
  state = {
    bars: []
  };

  componentDidMount() {
    this.loadBars();
  }

  loadBars = () => {
    API.getBars()
      .then(res => this.setState({ bars: res.data }))
      .catch(err => console.log(err));
      console.log(setState);
  }; 