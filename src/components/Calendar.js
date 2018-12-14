import React, { Component } from 'react'
import Thead from './tablePieces/THeader'
import Tbody from './tablePieces/TBody'

import Button from './Button'
import Axios from './Axios'
class Calendar extends Component {

    state = {
        currentYear: new Date().getFullYear(),
        currentMonth: new Date().getMonth(),
        isToday: false
    }

    createCalendarTitle = () => {
        return this.state.currentYear + '.' + (this.state.currentMonth + 1) + '.'
    }

    checkIsToday = () => {
        this.setState((state) => {
            state.currentMonth === new Date().getMonth() && state.currentYear === new Date().getFullYear()
                ? state.isToday = false
                : state.isToday = true
        })
    }

    /* toggle prev/next month */
    handleTogglePrevMonth = () => {
        if (this.state.currentMonth <= 0) {
            this.setState({
                currentYear: new Date(this.state.currentYear - 1, 11, 1).getFullYear(),
                currentMonth: new Date(this.state.currentYear - 1, 11, 1).getMonth()
            })
        } else {
            this.setState({
                currentYear: new Date(this.state.currentYear, this.state.currentMonth - 1, 1).getFullYear(),
                currentMonth: new Date(this.state.currentYear, this.state.currentMonth - 1, 1).getMonth()
            })
        }

        this.checkIsToday()
    }

    handleToggleNextMonth = () => {
        if (this.state.currentMonth === 11) {
            this.setState({
                currentYear: new Date(this.state.currentYear + 1, 0, 1).getFullYear(),
                currentMonth: new Date(this.state.currentYear + 1, 0, 1).getMonth()
            })
        } else {
            this.setState({
                currentYear: new Date(this.state.currentYear, this.state.currentMonth + 1, 1).getFullYear(),
                currentMonth: new Date(this.state.currentYear, this.state.currentMonth + 1, 1).getMonth()
            })
        }

        this.checkIsToday()
    }
    /* end */

    handleToggleGoToday = () => {
        this.setState({
            currentYear: new Date().getFullYear(),
            currentMonth: new Date().getMonth(),
            isToday: false
        })
    }

    render() {
        Axios()
        const { isToday } = this.state;
        const titleYearMonth = this.createCalendarTitle();
        const firstDay  = new Date(this.state.currentYear, this.state.currentMonth, 1).getDay();
        const lastDate  = new Date(this.state.currentYear, this.state.currentMonth+1, 0).getDate();
        
        return (
            <div className='calendar_area'>
            
                <div className='calendar_header'>
                    <strong className='calendar_title'>
                        <Button 
                            onClick={ this.handleTogglePrevMonth }
                            buttonValue = { '<' }></Button>
                        { titleYearMonth }
                        { isToday 
                            && ( <Button 
                                onClick={ this.handleToggleGoToday }
                                buttonValue= {'오늘'}></Button> )
                        }
                        <Button 
                            onClick={ this.handleToggleNextMonth }
                            buttonValue={ '>' }></Button>
                    </strong>
                </div>
                <div className='calendar_body'>
                    <table className='calendar_table'>
                        <Thead/>
                        <Tbody 
                            firstDay={ firstDay } lastDate={ lastDate }
                            currentMonth={ this.state.currentMonth }
                            currentYear ={ this.state.currentYear  }
                        />
                    </table>
                </div>
            </div>
        )
    }
}

export default Calendar;