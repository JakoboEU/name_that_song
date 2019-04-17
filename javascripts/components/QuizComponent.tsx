import * as React from "react";

export interface QuizComponentProps {
    key: string
    name: string
    species: Array<string>
}

export interface QuizState {
    name: string
    species: Array<string>
}

export class QuizComponent extends React.Component<QuizComponentProps, QuizState> {
    render() {
        return <li className="quiz">{this.props.name}</li>
    }
}

export default QuizComponent