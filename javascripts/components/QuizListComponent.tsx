import * as React from "react";

import {QuizComponent} from "./QuizComponent";

export interface QuizListComponentProps {
    onClick: (name: string, species: Array<String>) => void
}

export interface QuizListComponentState {
    quizes: Array<QuizDefinition>
}

export interface QuizDefinition {
    id: string
    name: string
    species: Array<string>
}

export class QuizListComponent extends React.Component<QuizListComponentProps, QuizListComponentState> {
    constructor(props: QuizListComponentProps) {
        super(props);
        this.state = { quizes: [] };
    }

    componentDidMount() {
        fetch('/assets/data/quizes.json')
            .then( result => result.text().then(t => this.setState(JSON.parse(t))))
    }

    render() {
        const quizes = this.state.quizes.map(quiz =>
            <QuizComponent key={quiz.id} name={quiz.name} species={quiz.species} onClick={this.props.onClick} />
        );
        return <div className="quizes">
            <ul className="quizes">
                {quizes}
            </ul>
        </div>
    }
}

export default QuizListComponent