import * as React from "react";

import QuizListComponent from "./QuizListComponent"
import QuizModal from "./QuizModal";

export interface AppProps { compiler: string; framework: string; }


export interface AppState {
    showQuizModal: boolean
    activeQuizName: string
    activeQuizSpecies: Array<string>
}

export class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = { showQuizModal: false, activeQuizName: "", activeQuizSpecies: []};
    }

    showModal(quizName: string, quizSpecies: Array<string>) {
        this.setState({ showQuizModal: true, activeQuizName: quizName, activeQuizSpecies: quizSpecies})
    }

    hideModal() {
        this.setState({ showQuizModal: false})
    }

    render() {
        return <div>
            <h1>Name that Song</h1>
            <QuizListComponent onClick={this.showModal.bind(this)} />
            <QuizModal show={this.state.showQuizModal} onClose={this.hideModal.bind(this)} quizName={this.state.activeQuizName} quizSpecies={this.state.activeQuizSpecies} />
        </div>
    }
}