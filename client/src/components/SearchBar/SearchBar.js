import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
       input: undefined, 
      }
  }
  handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target);
    /*NOTE: you access FormData fields with `data.get(fieldName)`
    fieldname tai divo ar input Name={} tag*/
    const searchQuery = data.get("Search");

    this.props.OnSubmitFetch(searchQuery);
    
  }
  onInputChange(event){
    this.setState({input: event.target.value});
  }
  render() {
    return (
        <form className="form-inline active-purple-4" onSubmit={event =>this.handleSubmit(event)}>
          <div className="container">
            <div className="row justify-content-center">
              <input className="p-1 w-50" onChange={event =>this.onInputChange(event)} type="text" placeholder="Search" aria-label="Search" name="Search"/>
              <button className="btn btn-dark" type="submit">Search<i className="fa fa-search"></i></button> 
            </div>
          </div>
        </form>

    )
  }

}


export default SearchBar
