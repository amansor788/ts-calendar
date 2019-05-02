import React from 'react';
import moment from 'moment';
import {Calendar} from 'react-calendar';

require('./bootstrap-theme.less');

class BookingsCalendar extends React.Component {
    state = {
        //date: moment().startOf('year')
        date: moment().startOf('month')
    }

    render(){
        console.log(this.state.date);
        return (
            <div>
                <Calendar weekNumbers={ true }
                  startDate={ this.state.date }
                  date={ this.state.date }
                  //endDate={ this.state.date.clone().endOf('year') }
                  endDate={ this.state.date.clone().add(3, 'month') }
                  mods={
                  [
                    // {
                    //   date: moment(),
                    //   classNames: [ 'current' ],
                    //   component: [ 'day', 'month', 'week' ]
                    // },
                    {
                      startDate: moment().add(3, 'days'),
                      endDate: moment().add(7, 'days'),
                      classNames: [ 'longEvent' ],
                      component: [ 'day' ]
                    },
                    // {
                    //   date: moment().add(3, 'days'),
                    //   classNames: [ 'appointment' ],
                    //   component: [ 'day' ]
                    // },
                    // {
                    //   date: moment().add(4, 'days'),
                    //   classNames: [ 'event', 'warning' ],
                    //   component: [ 'day' ],
                    //   events: {
                    //     onClick: (date, e) => alert(`${date.format('dddd')}'s event!`)
                    //   }
                    // },
                    // {
                    //   date: moment().add(5, 'days'),
                    //   classNames: [ 'event' ],
                    //   component: [ 'day' ]
                    // },
                    {
                      component: 'day',
                      events: {
                        onClick: (date, e) => alert(date.format())
                      }
                    }
                  ]
                } />
            </div>
        )
    }
}

export default BookingsCalendar;