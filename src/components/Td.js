import React from 'react'

class Td extends React.Component {

    getToday = () => {
        return new Date().getFullYear() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getDate() + '.'
    }

    checkClassName = () => {
        let lastClassName = '';
        
        this.props.className !== undefined
            ? lastClassName = lastClassName + this.props.className 
            : lastClassName = ''
     
        this.props.thisDate === this.getToday() 
            ? lastClassName = lastClassName + 'calendar_today' 
            : lastClassName = lastClassName + '';

        return lastClassName
    }

    render() {
        const { thisDate, innerIdx, value } = this.props
        return (
            <td 
                className={ this.checkClassName() }
                data-date={ thisDate }
                key={ innerIdx }
            >
            { value }
            <br/>
            
            { 
                thisDate === this.getToday() 
                    ? <span>오늘</span>
                    : null
            }
            </td>
        )
    }
}

export default Td;