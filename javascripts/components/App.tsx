import * as React from "react";

import QuizListComponent from "./QuizListComponent"

export interface AppProps { compiler: string; framework: string; }

export class App extends React.Component<AppProps, {}> {
    render() {
        return <div>
            <h1>Name that Song</h1>
            <QuizListComponent></QuizListComponent>
        </div>
    }
}