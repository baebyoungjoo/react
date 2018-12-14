import React, { Component } from 'react'
import Td from './Td'

class Calendar extends Component {

    state = {
        currentYear: new Date().getFullYear(),
        currentMonth: new Date().getMonth(),
        isToday: false
    }

    getWeekend = (dayCount) => {
        return new Date(this.state.currentYear, this.state.currentMonth, dayCount).getDay();
    }

    makeThisDay = (dayCount) => {
        return this.state.currentYear + '.' + (this.state.currentMonth + 1) + '.' + dayCount + '.'
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

    /* create calendar table header/body */
    createCalendarTableHeader = () => {
        const week = [ '일', '월', '화', '수', '목', '금', '토' ]
        const tableHeader = (
            <tr>
                { week.map((column, idx) => {
                    return (
                        <th key={ idx }>{ column }</th>
                    )
                }) }
            </tr>
        )

        return tableHeader
    }
    
    createCalendarTableBody = () => {
        const firstDay  = new Date(this.state.currentYear, this.state.currentMonth, 1).getDay();
        const lastDate  = new Date(this.state.currentYear, this.state.currentMonth+1, 0).getDate();
        
        const oneWeek = 7;
        const remain  = lastDate - (oneWeek - firstDay);
        const remainWeek = Number.parseInt(remain/oneWeek);
        let totalWeek = 0;

        (remain % oneWeek === 0) 
            ? totalWeek = remainWeek + 1 
            : totalWeek = remainWeek + 2;
        
        let tableBodyTr = [];
        let dayCount = 1;

        for (let idx = 0; idx < totalWeek; idx++) {
            let tableBodyTd = []

            for (let innerIdx = 0; innerIdx < oneWeek; innerIdx++) {
                if (idx === 0 && innerIdx < firstDay) {
                    tableBodyTd.push(<td key={ innerIdx }></td>)
                    continue
                } else if (dayCount <= lastDate && this.getWeekend(dayCount) === 6) {
                    tableBodyTd.push(
                        <Td className={'sat'} thisDate={ this.makeThisDay(dayCount) } 
                            key={ innerIdx } value = { dayCount++ }/>
                    )
                    continue
                } else if (dayCount <= lastDate && this.getWeekend(dayCount) === 0) {
                    tableBodyTd.push(
                        <Td className={ 'sun' } thisDate={ this.makeThisDay(dayCount) } 
                            key={ innerIdx } value = { dayCount++ }/>
                    )
                    continue
                } else if (dayCount <= lastDate) {
                    tableBodyTd.push(
                        <Td thisDate={ this.makeThisDay(dayCount) } 
                            key={ innerIdx } value = { dayCount++ }/>
                    )
                    continue
                } else {
                    tableBodyTd.push(<td key={ innerIdx }></td>)
                }
            }

            tableBodyTr.push(<tr key={ idx }>{ tableBodyTd }</tr>)
        }

        return tableBodyTr;
    }
    /* end */

    /* toggle prev/next month */
    handleTogglePrevMonth = () => {
        // TODO
        // getMonth() < 0 ? year - 1, 11, 1 : year, getMonth() - 1, 1

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
        // TODO
        // getMonth() === 11 ? year + 1, 0, 1 : year, getMonth() + 1, 1

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

        const { isToday } = this.state;
        return (
            <div className='calendar_area'>
                <div className='calendar_header'>
                    <strong className='calendar_title'>
                        <button 
                            className='btn btn-sm'
                            onClick={ this.handleTogglePrevMonth }>&lt;</button>
                        { this.createCalendarTitle() }
                        { isToday && (<button 
                            className='btn btn-sm'
                            onClick={ this.handleToggleGoToday }>
                            {/* TODO
                            select month || day === current month || today ? no show : show */}
                            오늘
                        </button>) }
                        <button 
                            className='btn btn-sm'
                            onClick={ this.handleToggleNextMonth }>&gt;</button>
                    </strong>
                </div>
                <div className='calendar_body'>
                    <table className='calendar_table'>
                        <thead className='calendar_table_header'>
                            { this.createCalendarTableHeader() }
                        </thead>
                        <tbody className='calendar_table_body'>
                            { this.createCalendarTableBody() }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Calendar;