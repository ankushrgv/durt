import React, { Component } from 'react'
import { Grid } from '@material-ui/core';
import GraphComponent from './GraphComponent';

export default class Graphs extends Component {
   render() {
        const {graphData} = this.props;

        return (
            <Grid
                className="all-teams-list"
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                {
                    graphData.map((graph) => {
                        return <Grid item className="list-column" key={graph.id}>
                                <GraphComponent graph={graph} />
                            </Grid>
                    })
                }
            </Grid>
        )
    }
}
