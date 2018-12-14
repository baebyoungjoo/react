import React, { Component } from 'react'

class Button extends Component {

    render () {
        return (
            <React.Fragment>
                <button
                    className = { this.props.className }
                    onClick = { this.props.onClick }
                >
                { this.props.buttonValue }
                </button>
            </React.Fragment>
        )
    }
}

Button.defaultProps = {
    className: 'btn btn-sm'
}

export default Button;