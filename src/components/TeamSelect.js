import React, { Component } from "react";
import DropDown from "./DropDown";
export default class TeamSelect extends Component {
  render() {
    return (
      <div className="flex flex-row">
        <DropDown label="Home" />
        <DropDown label="Away" />
      </div>
    );
  }
}
