import React, { Component } from "react";

import "./item-status-filter.css";

export default class ItemStatusFilter extends Component {
  getButClass = (filter) => {
    if (filter.done) {
      return [
        "btn btn-outline-secondary",
        "btn btn-outline-secondary",
        "btn btn-info",
      ];
    }
    if (filter.active) {
      return [
        "btn btn-outline-secondary",
        "btn btn-info",
        "btn btn-outline-secondary",
      ];
    }
    return [
      "btn btn-info",
      "btn btn-outline-secondary",
      "btn btn-outline-secondary",
    ];
  };

  // btn btn-info
  // btn btn-outline-secondary

  render() {
    const { onClickAll, onClickActive, onClickDone, filter } = this.props;

    const [butClassAll, butClassActive, butClassDone] =
      this.getButClass(filter);

    return (
      <div className="btn-group">
        <button type="button" className={butClassAll} onClick={onClickAll}>
          All
        </button>
        <button
          type="button"
          className={butClassActive}
          onClick={onClickActive}
        >
          Active
        </button>
        <button type="button" className={butClassDone} onClick={onClickDone}>
          Done
        </button>
      </div>
    );
  }
}
