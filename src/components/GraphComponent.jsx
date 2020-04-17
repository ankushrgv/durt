import React, { Component } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock'


export default class GraphComponent extends Component {

    render() {
        const {graph} = this.props;

        return (
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'chart'}
                options={graph.options}
            />
        )
    }
}
