import React from 'react'

class Td extends React.Component {

    state = {
        isActive: false
    }

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
            {/* TODO
                1. 날짜 선택하면 입력창 수정 가능하게
                2. 연속 날짜 선택 시 범위 표시
                3. 날짜 선택 후, 월 변경해도 선택한건 남아있게..
            */}
            </td>
        )
    }
}

export default Td;