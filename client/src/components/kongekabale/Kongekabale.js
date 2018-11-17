import React, { Component } from 'react';
import './Kongekabale.css';
import deck from './deck.js';
import points from './points.js';
import stuck from './stuck.js';
import styling from './styling.js'

const suits = ['hearts', 'spades', 'diams', 'clubs'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suitCodes = [9829, 9824, 9830, 9827];

class Kongekabale extends Component {

    /** props: 
        *   number width  
    */

    constructor(props) {
        super(props);    

        let newDeck = deck();     

        while (points(newDeck) > 47 || stuck(newDeck)) {
            newDeck = deck();
        }

        this.state = {
            deck: newDeck,
            selectedIndex: null,
            points: points(newDeck),
            stuck: false,
            showRules: false,
        }; 

        this.handleClick = this.handleClick.bind(this);
        this.restart = this.restart.bind(this);
        this.moveCard = this.moveCard.bind(this);
    }

    restart() {
        let newDeck = deck();   

        while (points(newDeck) > 10 || stuck(newDeck)) {
            newDeck = deck();
        }
        this.setState({
            deck: newDeck,
            selectedIndex: null,
            points: points(newDeck),
            stuck: false,
        }); 
    }

    moveCard(selectedIndex, clickedIndex) {

        const deck = Array.from(this.state.deck);

        deck[clickedIndex] = {
            rank: deck[selectedIndex].rank,
            suit: deck[selectedIndex].suit
        }

        deck[selectedIndex] = null; 

        this.setState({
            deck: deck,
            selectedIndex: null,
            points: points(deck),
            stuck: stuck(deck),
        });
    }

    handleClick(clickedIndex, event) {

        const selectedIndex = this.state.selectedIndex;
        const deck = this.state.deck;

        if (selectedIndex === null) {
            
            // no card is previously selected

            if (deck[clickedIndex]) {
                
                // a non-empty card was clicked
                
                this.setState({
                    selectedIndex: clickedIndex,
                });
                
                return;
            }
            
            // an empty card was clicked
            
            return;
        }

        if (deck[clickedIndex] === null) {
            
            // an empty card was clicked

            if (clickedIndex % 14 === 0 && deck[selectedIndex].rank === 12) {
                
                // the clicked empty card is in the beginning of a row
                // and the selected card is a king

                this.moveCard(selectedIndex, clickedIndex);

                return;    
            }

            if (
                deck[clickedIndex-1].suit === deck[selectedIndex].suit &&
                deck[clickedIndex-1].rank === deck[selectedIndex].rank+1
            ) {
                
                // The card to the left of the clicked empty card has same suit as the
                // selected card and rank one above the rank of the selected card

                this.moveCard(selectedIndex, clickedIndex);

                return;
            }
            
            this.setState({
                selectedIndex: null,
            });

            return;
        }

        if (clickedIndex === selectedIndex) {
            
            // the selected card was clicked
            
            this.setState({
                selectedIndex: null,
            });

            return;
        }

        // a non-empty card different from the selected card was clicked
        
        this.setState({
            selectedIndex: clickedIndex,
        });
    }

    render() {
        const style = styling(0.8*this.props.width);

        const cards = this.state.deck.map( (card, index) => {

            if (card) {

                const style1 = {};
                Object.assign(style1, style.card);
                
                let className = `card ${suits[card.suit]}`;

                if (this.state.selectedIndex === index) {
                    className = className + ' selected';
                    Object.assign(style1, style.selected);
                }
                return(
                    <div className={className} key={index} onClick={event => this.handleClick(index, event)} style={style1}>
                        {String.fromCharCode(suitCodes[card.suit]) + ranks[card.rank]}
                    </div>
                );
            }
            
            return(
                <div key={index} onClick={event => this.handleClick(index, event)}></div>
            ); 
        });

        return(
            <div 
                id="wrapper" 
                style={style.wrapper}
            >
                <header 
                    style={style.header}
                >
                    {String.fromCharCode(9819)} KongeKabale {String.fromCharCode(9819)}
                </header>
                <div 
                    id="cardTable" 
                    style={style.cardTable}
                >
                    {cards}                    
                    { (this.state.points === 52) && 
                        <div 
                            style={style.message} 
                            className="message" 
                            onClick={event => this.setState({points: 53})}
                        >
                            Du har vundet!
                        </div>
                    }
                    { (this.state.stuck) && 
                        <div 
                            style={style.message} 
                            className="message" 
                            onClick={event => this.setState({stuck: false})} 
                        >
                            Du er færdig!
                        </div>
                    }
                    { (this.state.showRules) && 
                        <div
                            style = {style.rules}
                            className="message"
                            onClick={event => this.setState({showRules: false})}
                        >
                            <ul>
                                <li><b>Formål: </b>At ordne kortene, så alle kort med samme kulør ligger på samme række med kongen først, derefter damen, etc.</li>
                                <br />
                                <li><b>Tilladte træk: </b></li>
                                
                                <ul>
                                    <li>Man må flytte et kort til en tom plads, hvis kortet har samme kulør som det kort, der ligger til venstre for den tomme plads, og er een mindre i rang.</li>
                                    <li>Hvis der er en tom plads i starten af en række, må man flytte enhver konge derhen.</li>
                                    <br />
                                    Så hvis der for eksempel er en tom plads til venstre for hjerter konge, så kan man flytte hjerter dame derhen. 
                                </ul>
                            </ul>
                            

                        </div>
                    }
                </div>
                <div 
                    id="bar"
                >
                    <div 
                        className="button" 
                        style={style.button}
                    >
                        Points: {this.state.points}
                    </div>
                    <div 
                        className="button" 
                        style={style.button} 
                        onClick={this.restart}
                    >
                        Nyt spil
                    </div>
                    <div
                        className="button"
                        style={style.button}
                        onClick={event => this.setState(prevState => {
                            return {showRules: !prevState.showRules};
                        })}
                    >
                        Regler
                    </div>
                </div>
            </div>
        );
    }  
}

export default Kongekabale;


