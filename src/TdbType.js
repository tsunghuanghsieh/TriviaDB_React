import React, { Component } from 'react';

class TdbType extends Component {
    getSelected = (event) => {
        this.props.getSelected(event.target.name, event.target.value);
    }
    render() {
        return (
            <div>
                <label htmlFor="type">Select Type: </label>
                <select name="type" className="form-control" onChange={this.getSelected}>
                    <option value="any">Any Type</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True / False</option>
                </select>
            </div>
        )
    }
}

export default TdbType;