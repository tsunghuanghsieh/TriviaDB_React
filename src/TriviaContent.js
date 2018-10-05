import React, { Component } from 'react';

// Durstenfeld shuffle, a computer-optimized version of Fisher-Yates
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

class TriviaContent extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    doSubmit = () => {
        var txtAreaCAns = document.createElement("textarea");
        txtAreaCAns.innerHTML = this.props.triviaJson['correct_answer'];
        var cAns = txtAreaCAns.innerHTML.replace(/\s/g, '')
        // value of correct answer could have been cleaned up and then passed in from index.js 
        if (this.state.selected === cAns) {
            alert('Great! You got it righ!')
        }
        else {
            alert('I am afraid this is not correct. Try picking a different answer!')
        }
    }

    setSelected = (event) => {
        var txtAreaQuestion = document.createElement("textarea");
        txtAreaQuestion.innerHTML = this.props.triviaJson['question'];
        this.setState({
            question: txtAreaQuestion.innerText,   // any better way to determine new trivia?
            selected: event.target.value
        })
    }

    render() {
        const { triviaJson } = this.props;
        var txtArea = document.createElement("textarea");
        var newTrivia = false;
        // could have just used triviaJson["key"] directly, instead of using map to iterate all keys and if statements
        const attrs = Object.keys(triviaJson).map(key => {
            if (!Array.isArray(triviaJson[key])) {
                if (key === 'correct_answer') return <div key={key}></div> // eat this
                // show question
                // strip html entities
                txtArea.innerHTML = triviaJson[key];
                if (this.state.question !== txtArea.innerText) {
                    // set flag for new trivia
                    newTrivia = true;
                }
                return <div key={key}>{txtArea.innerText}</div>
            }
            else {
                // construct answer radio buttons
                var answers = []
                answers = triviaJson[key].map((value, index) => {
                    // strip html entities
                    txtArea.innerHTML = value;

                    var inputValue = txtArea.innerHTML.replace(/\s/g, '')
                    // TODO: checked and lack of is causing controlled/uncontrolled component warning
                    if (newTrivia) {
                        // clear selection for new trivia
                        return <div key={index}><input type="radio" id={index} name={key} value={inputValue} checked={false} onChange={this.setSelected}></input>
                            <label htmlFor={index}>{txtArea.innerText}</label></div>
                    }
                    else {
                        // maintain selection for existing trivia
                        return <div key={index}><input type="radio" id={index} name={key} value={inputValue} onChange={this.setSelected}></input>
                            <label htmlFor={index}>{txtArea.innerText}</label></div>
                    }
                })
                const btnSubmit = <div><br /><input type="button" value="Final answer" onClick={this.doSubmit}></input></div>
                return <form key={key}><br /><div>{answers}</div>{btnSubmit}</form>
            }
        })

        return <div>{attrs}</div>
    }
}

export default TriviaContent;