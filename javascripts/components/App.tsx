import * as React from "react";

import BirdRepository from "./BirdRepository"

export interface AppProps { compiler: string; framework: string; }

export class App extends React.Component<AppProps, {}> {
    render() {
        return <div><h1>Hello from {this.props.compiler} and {this.props.framework}!</h1> <BirdRepository></BirdRepository></div>;
    }
}