import * as React from "react";

import {QuizComponent} from "./QuizComponent";

export interface QuizListComponentProps {

}

export interface QuizCollection {
    quizes: Array<QuizDefinition>
}

export interface QuizDefinition {
    id: string
    name: string
    species: Array<string>
}

export class QuizListComponent extends React.Component<QuizListComponentProps, QuizCollection> {
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
            <QuizComponent key={quiz.id} name={quiz.name} species={quiz.species} />
        );
        return <div className="quizes">
            <ul className="quizes">
                {quizes}
            </ul>
        </div>
    }
}

export default QuizListComponent