import * as React from "react";
import ReactPlayer from 'react-player'
import QuizButton from "./QuizButton"

export interface QuizModalProps {
    show: boolean
    quizName: string
    quizSpecies: Array<string>
    onClose: () => void
}

export interface QuizModalState {
    birdList: BirdCollection
    currentBird: Bird
}

export interface BirdCollection {
    birds: Array<Bird>
}

export interface Bird {
    id: string,
    species: string,
    song: Array<string>
}

export class QuizModal extends React.Component<QuizModalProps, QuizModalState> {
    constructor(props: QuizModalProps) {
        super(props);
        this.state = { birdList: {birds: []}, currentBird: null};
    }

    randomEntry(values: Array<string>): string {
        const max = values.length
        const index = Math.floor(Math.random() * Math.floor(max));
        return values[index];
    }

    fetchBird(birdId: string, birds: Array<Bird>): Bird {
        const bird = birds.find(bird => bird.id == birdId)
        if (!bird) {
            console.error("Failed to find bird " + birdId)
        }
        return bird;
    }

    guessSong(guessedBirdId: string): boolean {
        return guessedBirdId == this.state.currentBird.id
    }

    componentWillMount() {
        fetch('/assets/data/repository.json')
            .then( result => result.json())
            .then( birds => this.setState({birdList: birds}));
    }

    nextBird() {
        this.setState({currentBird: null})
    }

    shouldComponentUpdate(nextProps: QuizModalProps, nextState: QuizModalState): boolean {
        if (nextProps.quizSpecies.length > 0) {
            if (nextProps.quizName != this.props.quizName || !nextState.currentBird) {
                const nextBird = this.fetchBird(this.randomEntry(nextProps.quizSpecies), nextState.birdList.birds)
                nextState.currentBird = nextBird;
            }
        }
        return true;
    }

    render() {
        if (this.props.show) {
            const selections = this.props.quizSpecies.map(birdId => this.fetchBird(birdId, this.state.birdList.birds))
                .map(bird => <QuizButton key={bird.id} speciesId={bird.id} speciesName={bird.species} onClick={this.guessSong.bind(this)}></QuizButton>)
            const songUrl = "/assets/data/" + this.randomEntry(this.state.currentBird.song)
            return <div className="quiz-modal">
                <span className="header">
                    <a className="close" onClick={this.props.onClose}>x</a>
                    <a className="next" onClick={this.nextBird.bind(this)}>Next</a>
                </span>
                <ReactPlayer url={songUrl} playing />
                {selections}
            </div>
        } else {
            return <div></div>
        }
    }
}

export default QuizModal