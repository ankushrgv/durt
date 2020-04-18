import React, { Component } from 'react'
import { Grid, Button } from '@material-ui/core';
import '../Styles/Filters.scss';
import FilterComponent from './FilterComponent';


export default class Filters extends Component {

    state = {
        "symbolList": [],
        'instrumentList': [],
        "expiryDateList": []
    }
    
    onFilterChange = (filterName, filterValue) => {        
        this.setState({
            [filterName]: filterValue
        })
    }

    renderFilters = () => {
        let {filters} = this.props
        let filterList = []

        Object.keys(filters).forEach((key) => {
            let options = [];

            filters[key].forEach(val => {
                let optionObj = {
                    "value": val,
                    "label": val
                }
                options.push(optionObj)
            })

            let filter = <FilterComponent 
                name={key}
                options={options}
                handleFilterChange={this.onFilterChange}
            />
            filterList.push(filter)
        })
        return filterList
    }

    onFilterSubmit = () => {
        let filterState = Object.assign(this.state, {});
        this.props.onSubmitFilters(filterState);
    }

    render() {
        const {symbolList, instrumentList, expiryDateList} = this.state;
        const { buttonDisabled } = this.props;

        let buttonDisable = true;

        if (!buttonDisabled && symbolList.length > 0 && instrumentList.length > 0 && expiryDateList.length > 0) {
            buttonDisable = false;
        }
        return (
            <Grid container
                direction="row"
                justify="space-evenly"
                alignItems="flex-end"
                spacing={3} 
                className="filters-container">
                {
                    this.renderFilters()
                }
                <Grid item xs>
                    <Button variant="contained" color="secondary" disableElevation
                        disabled={buttonDisable}
                        onClick={this.onFilterSubmit}
                    >
                        Apply
                    </Button>
                </Grid>
            </Grid>
        )
    }
}
