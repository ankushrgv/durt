import React, { Component} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../Styles/Body.scss';
import { Paper, Button, Grid } from '@material-ui/core';

import Filters from '../components/Filters';
import Graphs from '../components/Graphs';

const today = new Date()
const yesterday = new Date(today)

yesterday.setDate(yesterday.getDate() - 1)

export default class Body extends Component {

    constructor () {
        super()
        this.onDateSubmit = this.onDateSubmit.bind(this);
        this.fetchFilterData = this.fetchFilterData.bind(this);
    }
    
    state = {
        filters: {},
        graphData: [],
        date: yesterday,
        dateButtonDisable: false,
        filterButtonDisable: true
    }

    handleDateChange = (date) => {
        this.setState({
            date: date
        })
    }

    fetchFilterData(){
        const {date} = this.state;
        let dateEpoch = new Date(date).valueOf()
        let url = `/initial_filter_list/${dateEpoch}`

        let _this = this;

        fetch(url)
        .then(res => res.json())
        .then(response => {
            _this.setState({
                filters: response,
                dateButtonDisable: false
            })
        })
    }

    onDateSubmit = () => {
        this.setState({
            dateButtonDisable: true
        })

        this.fetchFilterData()
    }
    
    handleFilterSubmit = (selectedFilters) => {
        this.setState({
            filterButtonDisable: true
        })
        this.fetchGraphData(selectedFilters);
    }

    fetchGraphData = (selectedFilters) => {
        const {symbolList, instrumentList, expiryDateList} = selectedFilters;
        const {date} = this.state;
        let dateEpoch = new Date(date).valueOf();
        let url = `/reports/?reportDate=${dateEpoch}&symbolList=${symbolList}&instrumentList=${instrumentList}&expiryDateList=${expiryDateList}`

        let _this = this;

        fetch(encodeURI(url))
        .then(res => res.json())
        .then(response => {
            let transformedGraphData = this.transformGraphData(response)
            _this.setState({
                graphData: transformedGraphData,
                filterButtonDisable: false
            })
        })
    }

    transformGraphData (inputData) {
        let graphData = [
            {
                "id": 1,
                "title": "Open Interest",
                "series": [],
                "xData": []
            },
            {
                "id": 2,
                "title": "Change In Open Interest",
                "series": [],
                "xData": []
            },
            {
                "id": 3,
                "title": "Change In Open Interest From Open",
                "series": [],
                "xData": []
            }
        ]
        let openInterestSeries = [
            {
                "name": "CE",
                "data": []
            },
            {
                "name": "PE",
                "data": []
            }
        ];
        let changeInOpenInterestSeries = [
            {
                "name": "CE",
                "data": []
            },
            {
                "name": "PE",
                "data": []
            }
        ];
        let changeInOpenInterestFromOpenSeries = [
            {
                "name": "CE",
                "data": []
            },
            {
                "name": "PE",
                "data": []
            }
        ];

        let xAxisData = []

        let xPoints = new Set();

        inputData.forEach(dataPoint => {
            xPoints.add(dataPoint.strikePrice)

            if(dataPoint.optionType === "CE") {
                openInterestSeries[0].data.push(dataPoint.openInterest)
                changeInOpenInterestSeries[0].data.push(dataPoint.changeInOpenInterest)
                changeInOpenInterestFromOpenSeries[0].data.push(dataPoint.changeInOpenInterestFromOpen)
            }
            else {
                openInterestSeries[1].data.push(dataPoint.openInterest)
                changeInOpenInterestSeries[1].data.push(dataPoint.changeInOpenInterest)
                changeInOpenInterestFromOpenSeries[1].data.push(dataPoint.changeInOpenInterestFromOpen)
            }
        })

        xAxisData = Array.from(xPoints);
        graphData[0].xData = graphData[1].xData = graphData[2].xData = xAxisData

        graphData[0].series = openInterestSeries
        graphData[1].series = changeInOpenInterestSeries
        graphData[2].series = changeInOpenInterestFromOpenSeries

        return graphData
    } 
  
    render() {
        const {date, dateButtonDisable, filters, filterButtonDisable, graphData} = this.state;
        return (
            <main className="main-body">
                <Paper className="main-body-container">
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-end"
                    spacing={3} 
                    className="filters-container">
                    <Grid item>
                        <DatePicker selected={date} onChange={this.handleDateChange} />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" disableElevation
                            disabled={dateButtonDisable}
                            onClick={this.onDateSubmit} >
                            Go
                        </Button>
                    </Grid>
                </Grid>
                    {
                        Object.keys(filters).length
                        ? <Filters 
                            filters={filters}
                            buttonDisabled={filterButtonDisable}
                            onSubmitFilters={this.handleFilterSubmit}/>
                        : null
                    }
                    <Graphs graphData={graphData}/>
                </Paper>
            </main>
        )
    }
}
