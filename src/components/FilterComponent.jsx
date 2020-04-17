import React, { Component } from 'react'
import Select from 'react-select';
import { Grid } from '@material-ui/core';


export default class FilterComponent extends Component {

    onFilterChange = (selectedFilters) => {
        let {name,  handleFilterChange} = this.props
        let filterPlainList = []
        if (selectedFilters){
            selectedFilters.forEach(filter => {
                filterPlainList.push(filter.value)
            })
        }
        handleFilterChange(name, filterPlainList)
    }

    render() {
        const {name, options} = this.props;
        
        return (
            <Grid item xs>
                <h3>
                    {name}
                </h3>

                <Select
                    className="filter-select"
                    isMulti
                    closeMenuOnSelect={false}
                    options={options}
                    onChange={this.onFilterChange}
                />
        </Grid>
)
    }
}
