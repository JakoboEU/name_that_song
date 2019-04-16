import * as React from "react";

export interface BirdRepositoryProps {

}

export class BirdRepository extends React.Component<BirdRepositoryProps, {}> {
    constructor(props: BirdRepositoryProps) {
        super(props);
        this.state = { birds: [] };
    }

    componentDidMount() {
        fetch('/assets/data/repository.json')
            .then( result => result.json())
            .then(birds => {console.log(birds); return birds;})
            .then( birds => this.setState({birds: {birds}}));
    }

    render() {
        return <h2>Bird Repo</h2>
    }
}

export default BirdRepository