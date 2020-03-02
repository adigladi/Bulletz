import React, { Component } from "react";
import axios from "axios";
import cheerio from "cheerio";

export default class fetchSHL extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const $ = this.fetchData();
    const postJobButton = $(
      ".sticky-wrapper > .rmss_t-menu__inline-items-item-link"
    ).text();
    console.log(postJobButton); // Logs 'Post a Job'
  }

  fetchData = async () => {
    const url =
      "https://cors-anywhere.herokuapp.com/https://www.shl.se/statistik/tabell?season=2019&gameType=regular";
    const result = await axios.get(url);
    return cheerio.load(result.data);
  };
  render() {
    return <div></div>;
  }
}
