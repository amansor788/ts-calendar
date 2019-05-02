import React from 'react';
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import moment from 'moment';
import { DragDropContext } from "react-dnd";
import HTML5Backend from 'react-dnd-html5-backend';

class Calendar extends React.Component {
    
    constructor(props){
        super(props);

        let schedulerData = new SchedulerData(
            // '2019-04-22'
            new moment().format(DATE_FORMAT)
            , ViewTypes.Quarter
            , false, false
            , {
                startResizable: true,
                endResizable: true,
                movable: false,
                creatable: false,
                schedulerWidth: '350',
                quarterResourceTableWidth: '15',
                quarterCellWidth: '25',
            }
        );
        this.state = {
            viewModel: schedulerData
        }
    }

    resources = [
        {
           id: '1',
           name: 'Cabana 1'
        },
        {
            id: '2',
            name: 'Cabana 2'
         },
         {
           id: '3',
           name: 'Cabana 3'
        },
        {
            id: '4',
            name: 'Cabana 4'
         },
         {
            id: '5',
            name: 'Cabana 5'
         },
         {
            id: '6',
            name: 'Cabana 6'
         },
         {
            id: '7',
            name: 'Cabana 7'
         },
         {
            id: '8',
            name: 'Cabana 8'
         }
    ];

    events = [
        {
             id: 1,
             start: '2019-04-17',
             end: '2019-04-19 23:59:00',
             resourceId: '1',
             title: 'Maria Jose Alcaraz',
             bgColor: '#339CFF'
         }
     ];

    componentDidMount(){
        const {viewModel} = this.state;
        viewModel.localeMoment.locale('en');
        viewModel.setResources(this.resources);
        viewModel.setEvents(this.events);
    }

    render(){
        const {viewModel} = this.state;
        return(
            <div style={{width: '100%', border: '2'}}>
                <Scheduler schedulerData={viewModel}
                        prevClick={this.prevClick}
                        nextClick={this.nextClick}
                        onSelectDate={this.onSelectDate}
                        onViewChange={this.onViewChange}
                />
            </div>
        )
            
    }

    prevClick = (schedulerData)=> {
        schedulerData.prev();
        schedulerData.setEvents(this.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
        schedulerData.setEvents(this.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(this.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(this.events);
        this.setState({
            viewModel: schedulerData
        })
    }
}

export default DragDropContext(HTML5Backend)(Calendar);