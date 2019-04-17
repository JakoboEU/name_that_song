import * as React from "react";

export interface QuizComponentProps {
    key: string
    name: string
    species: Array<string>
    onClick: (name: string, species: Array<String>) => void
}

export interface QuizState {
    name: string
    species: Array<string>
}

export class QuizComponent extends React.Component<QuizComponentProps, QuizState> {
    handleSelection(event: React.MouseEvent<HTMLElement>, props: QuizComponentProps) {
        props.onClick(props.name, props.species)
    }

    render() {
        return <li className="quiz"><a onClick={(e: React.MouseEvent<HTMLElement>) => this.handleSelection(e, this.props)}>{this.props.name}</a></li>
    }
}

export default QuizComponent