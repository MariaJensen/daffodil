

module.exports = (width) => {
        
    const gap = 0.015*width;
    const cardWidth = (1/13)*(width - 14*gap);
    const cardHeight = (19/14)*cardWidth;
    const height = 4*cardHeight + 5*gap;

    // poker: 7/5, bridge: 9/4, solitaire: 19/14

    const wrapperStyle = {
        width: width,
        gridRowGap: 0.02*width,
    };

    const cardTableStyle = {
        height: height,
        gridRowGap: gap,
        gridColumnGap: gap,
        padding: gap,
        borderRadius: 0.01*width,
    };

    const cardStyle = {
        fontSize: 0.025*width,
        borderRadius: 0.005*width,
    };

    const headerStyle = {
        fontSize: 0.1*width,
        height: 0.135*width,
        borderRadius: 0.01*width,
    };

    const buttonStyle = {
        borderRadius: 0.01*width,
        fontSize: 0.03*width,
        padding: 0.015*width,
    };

    const selectedStyle = {
        boxShadow: `-${0.005*width}px ${0.005*width}px ${0.01*width}px hsl(345, 20%, 10%)`,
    };

    const messageStyle = {
        top: 0.25*height,
        left: 0.1*width,
        
        fontSize: 0.3*height,
        textAlign: 'center',
        
        paddingTop: 0.1*height,
        paddingLeft: 0.1*height, 
        paddingRight: 0.1*height, 
        
        borderRadius: 0.02*width,
        borderWidth: 0.01*width,
        boxShadow: `-${0.05*width}px ${0.05*width}px ${0.1*width}px hsl(345, 20%, 10%)`,
    }

    const rulesStyle = {
        top: 0.25*height,
        left: 0.1*width,
        right: 0.1*width,
        
        fontSize: 0.05*height,
        
        paddingTop: 0.1*height,
        paddingLeft: 0.1*height, 
        paddingRight: 0.1*height, 
        paddingBottom: 0.05*height,
        
        borderRadius: 0.02*width,
        borderWidth: 0.01*width,
        boxShadow: `-${0.05*width}px ${0.05*width}px ${0.1*width}px hsl(345, 20%, 10%)`,
    }

    return {
        wrapper: wrapperStyle,
        cardTable: cardTableStyle,
        card: cardStyle,
        header: headerStyle,
        button: buttonStyle,
        selected: selectedStyle,
        message: messageStyle,
        rules: rulesStyle,
    };
};

