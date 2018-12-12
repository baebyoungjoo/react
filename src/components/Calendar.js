import React, { Component } from 'react'

class Calendar extends Component {

    state = {
        currentYear: new Date().getFullYear(),
        currentMonth: new Date().getMonth()
    }

    createCalendarTitle = () => {
        return this.state.currentYear + '.' + (this.state.currentMonth + 1) + '.'
    }

    createCalendarTableHeader = () => {
        const week = [ '일', '월', '화', '수', '목', '금', '토' ]
        const tableHeader = (
            <thead><tr>
                { week.map(function(column, idx) {
                    return (
                        <th key={ idx }>{ column }</th>
                    )
                }) }            
            </tr></thead>
        )

        return tableHeader
    }

    /* toggle prev/next month */
    handleTogglePrevMonth = () => {
        // TODO
        // getMonth() < 0 ? year - 1, 11, 1 : year, getMonth() - 1, 1
    }

    handleToggleNextMonth = () => {
        // TODO
        // getMonth() === 11 ? year + 1, 0, 1 : year, getMonth() + 1, 1
    }
    /* end */

    render() {
        return (
            <div className='calendar_area'>
                <div className='calendar_header'>
                    <strong className='calendar_title'>
                        <button onclick={ this.handleTogglePrevMonth }>&lt;</button>
                        { this.createCalendarTitle() }
                        <button className='today'>
                            {/* select month || day === current month || today ? no show : show */}
                            오늘
                        </button>
                        <button onclick={ this.handleToggleNextMonth }>&gt;</button>
                    </strong>
                </div>
                <div className='calendar_body'>
                    <table className='calendar_table'>
                        { this.createCalendarTableHeader() }
                        <tbody>
                            <tr>
                                <td> 1 </td>
                                <td>...</td>
                                <td>31 </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Calendar;