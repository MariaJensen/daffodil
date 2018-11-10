import React, { Component } from 'react';
import './App.css';
import Menu from './components/menu/Menu.js';
import Kongekabale from './components/kongekabale/Kongekabale.js';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            component: () => <p>Welcome</p>,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
        };

        this.setComponent = this.setComponent.bind(this);
        this.components = this.components.bind(this);
        this.resizeHandler = this.resizeHandler.bind(this);
    }

    resizeHandler() {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeHandler);
    }

    setComponent(component, componentProps) {
        this.setState({
            component: component,
            componentProps: componentProps
        });
    }

    components() {
        return [
            {
                text: 'Kongekabale',
                component: Kongekabale,
                componentProps: {width: 0.8*this.state.windowWidth},
                handler: this.setComponent,
            },
            {
                text: 'Component1',
                component: () => {return (<p>This is component 1</p>);},
                handler: this.setComponent,
            },
            {
                text: 'Component2',
                component: () => {return (<p>This is component 2</p>);},
                handler: this.setComponent,
            },
            {
                text: 'Component3',
                component: () => {return (<p>This is component 3</p>);},
                handler: this.setComponent,
            }
        ];
    }

    render() {
        return(
            <div 
                style={{
                    width: 0.8*this.state.windowWidth,
                    margin: 'auto',
                }}
            >
                <Menu
                    width={0.05*this.state.windowWidth}
                    top={0}
                    left={0}
                    color={'red'}
                    backgroundColor={'pink'} 
                    components={this.components()}
                />
                {React.createElement(
                    this.state.component,
                    this.state.componentProps
                )}
            </div>
        );
    } 
}

export default App;
