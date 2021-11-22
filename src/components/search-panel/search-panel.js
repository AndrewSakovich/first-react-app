import React, {Component} from "react";

import "./search-panel.css";

export default class SearchPanel extends Component {

 


  // onLabelChange = (e) => {
  //   this.setState({
  //     findState: e.target.value,
  //   });
  // };

  

  render() {
    const {onFindItem, findState} = this.props
    
    return (
      <input
        type="text"
        className="form-control search-input"
        onChange={onFindItem}
        placeholder="find your assignment"
        value={findState}
      />
    );
  }
}

// const SearchPanel = () => {
//   return (
//     <input
//       type="text"
//       className="form-control search-input"
//       placeholder="find your assignment"
//     />
//   );
// };

// export default SearchPanel;
