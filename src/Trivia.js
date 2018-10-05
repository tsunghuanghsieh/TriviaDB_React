import React, { Component } from 'react';
import TriviaContent from './TriviaContent';

class Trivia extends Component {
    render() {
        const { triviaData } = this.props;
        return (
            <TriviaContent triviaJson={triviaData} />
        )
    }
}

export default Trivia;