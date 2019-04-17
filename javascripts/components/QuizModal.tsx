import * as React from "react";
import ReactPlayer from 'react-player'

export interface QuizModalProps {
    show: boolean
    quizName: string
    quizSpecies: Array<string>
    onClose: () => void
}

export interface QuizModalState {
    birdList: BirdCollection
}

export interface BirdCollection {
    birds: Array<Bird>
}

export interface Bird {
    id: string,
    species: string,
    song: string
}

export class QuizModal extends React.Component<QuizModalProps, QuizModalState> {
    constructor(props: QuizModalProps) {
        super(props);
        this.state = { birdList: {birds: []}};
    }

    nextRandomSpecies(): string {
        const max = this.props.quizSpecies.length
        const index = Math.floor(Math.random() * Math.floor(max));
        return this.props.quizSpecies[index];
    }

    fetchBird(birdId: string): Bird {
        const bird = this.state.birdList.birds.find(bird => bird.id == birdId)
        if (!bird) {
            console.error("Failed to find bird " + birdId)
        }
        return bird;
    }

    guessSong(guessedBird: Bird, actualBird: Bird): void {
        console.log("Guessed " + guessedBird.species + ", actual " + actualBird.species)
    }

    componentWillMount() {
        fetch('/assets/data/repository.json')
            .then( result => result.json())
            .then( birds => this.setState({birdList: birds}));
    }

    render() {
        if (this.props.show) {
            const currentBird = this.fetchBird(this.nextRandomSpecies())
            const selections = this.props.quizSpecies.map(birdId => this.fetchBird(birdId))
                .map(bird => <li key={bird.id}><a key={bird.id} onClick={(e) => this.guessSong(bird, currentBird)}>{bird.species}</a></li>)
            const songUrl = "/assets/data/" + currentBird.song
            return <div>
                <a className="close" onClick={this.props.onClose}>x</a>
                <ReactPlayer url={songUrl} playing />
                {selections}
            </div>
        } else {
            return <div></div>
        }
    }
}

export default QuizModal