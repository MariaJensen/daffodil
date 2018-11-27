import React, { Component } from 'react';
import './App.css';
import Menu from './components/menu/Menu.js';
import Kongekabale from './components/kongekabale/Kongekabale.js';
import Pouch from './components/pouch-couch-cloudant/Pouch.js';
import Frida from './components/frida/Frida.js';

const color = 'hsl(180, 10%, 25%)';
const backgroundColor = 'hsl(180, 10%, 70%)';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            component: Frida,
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
        });
    }

    components() {
        return [
            {
                text: 'Kongekabale',
                component: Kongekabale,
                handler: this.setComponent,
            },
            {
                text: 'Pouch',
                component: Pouch,
                handler: this.setComponent,
            },
            {
                text: 'Frida',
                component: Frida,
                handler: this.setComponent,
            },
        ];
    }

    render() {
        return(
            <div 
                style={{
                    width: 0.8*this.state.windowWidth,
                    margin: 'auto',
                    marginTop: 0.01*this.state.windowWidth,
                }}
            >
                <Menu
                    width={0.05*this.state.windowWidth}
                    top={0.01*this.state.windowWidth}
                    left={0.01*this.state.windowWidth}
                    color={color}
                    backgroundColor={backgroundColor}
                    components={this.components()}
                />
                {React.createElement(
                    this.state.component,
                    {
                        width: this.state.windowWidth,
                        color: color,
                        backgroundColor: backgroundColor,
                    }
                )}
            </div>
        );
    } 
}

export default App;
