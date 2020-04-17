import React, { Component} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../Styles/Body.scss';
import { Paper, Button, Grid } from '@material-ui/core';

import Filters from '../components/Filters';
import Graphs from '../components/Graphs';

const colorOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
];

const flavourOptions = [
    { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
    { value: 'chocolate', label: 'Chocolate', rating: 'good' },
    { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
    { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy' },
];

const stateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AS', label: 'American Samoa' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'DC', label: 'District Of Columbia' },
    { value: 'FM', label: 'Federated States Of Micronesia' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'GU', label: 'Guam' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MH', label: 'Marshall Islands' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'MP', label: 'Northern Mariana Islands' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PW', label: 'Palau' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'PR', label: 'Puerto Rico' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VI', label: 'Virgin Islands' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
];

const filterDummyData = [{
        name: "Colors",
        options: colorOptions
    }, {
        name: "Flavors",
        options: flavourOptions
    }, {
        name: "States",
        options: stateOptions
    }
]

const graphData = [
    {
        id: "228",
        options: {
            title: {
                text: 'Here goes the chart title'
            },
            series: [{
                data: [1, 2, 3]
            },
            {
                data: [2, 3, 1]
            },
            {
                data: [3, 2, 1]
            }]
        }
    },
    {
        id: "218",
        options: {
            title: {
                text: 'Here goes the chart title'
            },
            series: [{
                data: [1, 2, 3]
            },
            {
                data: [2, 3, 1]
            }]
        }
    },
    {
        id: "208",
        options: {
            title: {
                text: 'Here goes the chart title'
            },
            series: [{
                data: [1, 2, 3]
            },
            {
                data: [2, 3, 1]
            },
            {
                data: [3, 2, 1]
            }]
        }
    }
]

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
    }

    handleDateChange = (date) => {
        this.setState({
            date: date
        })
    }

    // async fetchFilterData(){
    //     const {date} = this.state;
    //     let dateEpoch = new Date(date).valueOf()
    //     let url = `https://google.com/${dateEpoch}`

    //     return await fetch(url)
    // }

    fetchFilterData() {
        let filterdata = {
            "symbolList": ["TATA", "VOLTAS"],
            "instrumentList": ["something1", "something2"],
            "expiryDateList": ["something3", "something4"]
        }
        this.setState({
            filters: filterdata,
            dateButtonDisable: false
        })
    }

    onDateSubmit = () => {
        console.log("onDateSubmit")
        this.setState({
            dateButtonDisable: true
        })

        this.fetchFilterData()
    }
    
    handleFilterSubmit = (selectedFilters) => {
        console.log("handleFilterSubmit = ", selectedFilters)
        this.setState({
            graphData: graphData
        })
    }
  
    render() {
        const {date, dateButtonDisable, filters, graphData} = this.state;
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
                            disabled={dateButtonDisable} onClick={this.onDateSubmit} >
                            Go
                        </Button>
                    </Grid>
                </Grid>
                    {
                        Object.keys(filters).length
                        ? <Filters filters={filters} onSubmitFilters={this.handleFilterSubmit}/>
                        : null
                    }
                    <Graphs graphData={graphData}/>
                </Paper>
            </main>
        )
    }
}
