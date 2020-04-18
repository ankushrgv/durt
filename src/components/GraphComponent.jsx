import React, { Component } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock'

export default class GraphComponent extends Component {

    render() {
        const {graph} = this.props;
        const {series, title, xData} = graph;

        let graphConf = {
            chart: {
                type: 'column'
              },
              title: {
                text: ''
              },
              subtitle: {
                text: 'Derivatives'
              },
              xAxis: {
                categories: [
                ],
                crosshair: true,
                title: {
                    text: 'Strike Price'
                }
              },
              yAxis: {
                title: {
                  text: 'No. of Requests'
                }
              },
              tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                  '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
              },
              plotOptions: {
                column: {
                  pointPadding: 0.2,
                  borderWidth: 0
                }
              },
              series: []
        }

        graphConf.series = series
        graphConf.xAxis.categories = xData
        graphConf.title.text = title

        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={graphConf}
            />
        )
    }
}
