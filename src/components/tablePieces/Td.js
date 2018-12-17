import React from 'react'
import { Axios } from '../Axios'

class Td extends React.Component {
    state = {
        isActive: false,
        holidayList: [],
        totalCount: 0
    }

    getToday = () => {
        return new Date().getFullYear() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getDate() + '.'
    }

    isHoliday = () => {
        let year  = new Date(this.props.thisDate).getFullYear();
        let month = new Date(this.props.thisDate).getMonth() + 1;
        let date  = new Date(this.props.thisDate).getDate();

        date  = date > 9 ? date : '0' + date;
        month = month > 9 ? month : '0' + month;

        let fullDate = year + '' + month + '' + date
        Axios(year, month)
        .then(response => {
            console.log(response)
        })
        return fullDate
    }

    checkClassName = () => {
        // console.log( new Date(this.props.thisDate).getMonth(), new Date(this.props.thisDate).getDate() );

        let lastClassName = '';
        
        this.props.className !== undefined
            ? lastClassName = lastClassName + this.props.className 
            : lastClassName = '';
     
        this.props.thisDate === this.getToday() 
            ? lastClassName = lastClassName + ' calendar_today' 
            : lastClassName = lastClassName + '';
            
        if (this.state.isActive) lastClassName = lastClassName + ' calendar_select';

            return lastClassName
    }
    
    handleOnClick = () => {
        const currentState = this.state.isActive;
        this.setState({
            isActive: !currentState
        })
    }

    render() {
        this.isHoliday()
        const { thisDate, innerIdx, value } = this.props
        const { isActive } = this.state
        return (
            <td 
                className={ this.checkClassName() }
                data-date={ thisDate }
                key={ innerIdx }
                onClick={ this.handleOnClick }
            >
            { value }
            <br/>

            { 
                thisDate === this.getToday() && isActive === true
                    ? <span>select</span>
                    : thisDate === this.getToday() && isActive !== true 
                        ? <span>오늘</span>
                            : isActive === true
                                ? <span>select</span>
                                : null
            }
            </td>
        )
    }
}

export default Td;