import React,{Component} from "react";
import { Link } from 'react-router-dom';
export default class PageBar extends Component {
  constructor(props) {
    super(props);
  }
  _handleOnPageChangeEvent = (PageNumber) => {
    const {PageChangeEvent} = this.props;
    PageChangeEvent(PageNumber);
  }
  render () {
    const {casepages,selectedPage} = this.props;
    return (
    <div className="pagination-div">
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center mb-0">
          <li className = {selectedPage == 1 ? "page-item c-drop" : "page-item"}>
            <button className={selectedPage == 1?"page-link disabled":"page-link"} onClick={() =>{this._handleOnPageChangeEvent(selectedPage-1)}} >
              Previous
            </button>
          </li>
         {casepages.map((p, i) => {
           return(
            <li key={p[0].pageNumber} className="page-item">
        <button
          className={
            this.props.selectedPage == p[0].pageNumber ? "page-link active" : "page-link"
          }
          onClick={() =>{ this._handleOnPageChangeEvent(p[0].pageNumber)}}
        >
          {i + 1}
        </button>
      </li>
           )
         })} 
          
          <li className = {selectedPage == casepages.length ? "page-item c-drop" : "page-item"}>
            <button className={selectedPage== casepages.length ? "page-link disabled":"page-link"} onClick={() =>{this._handleOnPageChangeEvent(selectedPage+1)}}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
    )
  }
}

