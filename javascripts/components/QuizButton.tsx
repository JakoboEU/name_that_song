import * as React from "react";

export interface QuizButtonProps {
    speciesName: string
    speciesId: string
    onClick: (speciesId: string) => boolean
}

export interface QuizButtonState {
    className: string
}

export class QuizButton extends React.Component<QuizButtonProps, QuizButtonState> {
    constructor(props: QuizButtonProps) {
        super(props);
        this.state = {className: "quiz"};
    }

    onGuess() {
        if (this.props.onClick(this.props.speciesId)) {
            this.setState({className: "quiz correct"})
        } else {
            this.setState({className: "quiz wrong"})
        }
    }

    shouldComponentUpdate(nextProps: QuizButtonProps, nextState: QuizButtonState): boolean {
        if (nextState.className != "quiz" && nextState.className == this.state.className) {
            nextState.className = "quiz"
        }

        return true
    }

    render() {
        return  <li key={this.props.speciesId} className={this.state.className}>
                    <a key={this.props.speciesId} onClick={(e) => this.onGuess.bind(this)()}>{this.props.speciesName}</a>
                </li>
    }
}

export default QuizButton