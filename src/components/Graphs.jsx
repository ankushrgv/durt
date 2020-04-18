import React, { Component } from 'react'
import { Grid } from '@material-ui/core';
import GraphComponent from './GraphComponent';

export default class Graphs extends Component {

    renderGraphs() {
        const {graphData} = this.props;
        let graphList = []

        graphData.forEach(graph => {
            graphList.push(
                <Grid item className="list-column" key={graph.id}>
                    <GraphComponent graph={graph} />
                </Grid>
            )
        })
        return graphList
    }

    render() {
        return (
            <Grid
                className="all-teams-list"
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                { this.renderGraphs()}
            </Grid>
        )
    }
}
