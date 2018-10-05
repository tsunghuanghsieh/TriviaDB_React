import React from 'react';
import ReactDOM from 'react-dom';
import TdbCategory from './TdbCategory'
import TdbDifficulty from './TdbDifficulty'
import TdbType from './TdbType'
import Trivia from './Trivia'
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            params: {}, // declare api parameter object for setState() to do deep merge
            trivia: {}  // declare travia object for setState() to do deep merge
        }
    }

    getSelected = (key, value) => {
        // setState does shallow merge, so we need to do deep merge for params ourselves
        var newParams = this.state.params;
        newParams[key] = value;
        this.setState({
            params: newParams
        });
    }

    getTrivia = () => {
        // sample url
        // https://opentdb.com/api.php?amount=1&category=14&difficulty=medium&difficulty=multiple
        // https://opentdb.com/api.php?amount=5&category=10&difficulty=medium&type=multiple
        var url = "https://opentdb.com/api.php?amount=1";

        if (this.state.params) {
            Object.keys(this.state.params).map(key => {
                if (this.state.params[key] && this.state.params[key] !== 'any') {
                    url = url + '&' + key + '=' + this.state.params[key]
                }
                // returned strings will be concatenated with comma as delimiter
                // so taking a shortcut by constructing url above, and not using
                // returned strings.
                return '';
            });
        }

        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            // sample response
            // {
            //     "response_code": 0,
            //     "results": [
            //         {
            //             "category": "Geography",
            //             "type": "multiple",
            //             "difficulty": "easy",
            //             "question": "What is Canada&#039;s smallest province?",
            //             "correct_answer": "Prince Edward Island",
            //             "incorrect_answers": [
            //                 "New Brunswick",
            //                 "Nova Scotia",
            //                 "Yukon"
            //             ]
            //         }
            //     ]
            // }
            var answeredSorted = [
                ...responseJson.results[0].incorrect_answers,
                responseJson.results[0].correct_answer
            ];
            answeredSorted.sort();            
            this.setState({
                trivia: {
                    correct_answer: responseJson.results[0].correct_answer,  // TriviaContent uses this to determine new trivia
                    question: responseJson.results[0].question,
                    answers: answeredSorted
                }
            });
        })
        .catch((error) => {
            console.error(error);
        })
    }

    render() { 
        return (
            <section className="App">
                <div>
                    <TdbCategory getSelected={this.getSelected}/>
                    <TdbDifficulty getSelected={this.getSelected}/>
                    <TdbType getSelected={this.getSelected}/>
                    <button onClick={this.getTrivia}>Get Trivia</button>
                </div>
                <Trivia triviaData={this.state.trivia}/>
            </section>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
