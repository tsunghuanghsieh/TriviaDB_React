import React, { Component } from 'react';

class TdbDifficulty extends Component {
    getSelected = (event) => {
        this.props.getSelected(event.target.name, event.target.value);
    }

    render() {
        return (
            <div>
                <label htmlFor="difficulty">Select Difficulty: </label>
                <select name="difficulty" className="form-control" onChange={this.getSelected}>
                    <option value="any">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
        )
    }
}

export default TdbDifficulty;