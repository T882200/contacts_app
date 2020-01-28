import React, { Component } from 'react'

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Search extends Component {
    render() {
        return (
            <div class="search-input">
                <input type="text" value={this.props.value} onChange={this.props.onChange} placeholder={this.props.placeholder}/>
                <div class="search-icon">
                <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>
        )
    }
}

export default Search
