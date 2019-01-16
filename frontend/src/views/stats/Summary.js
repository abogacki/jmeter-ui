import React from 'react';
import { defaults } from 'react-chartjs-2';
import { Title, Columns, Column, Box, } from 'bloomer'
import { connect } from 'react-redux';
import statsLite from 'stats-lite';
import Info from './Info'

defaults.global.defaultFontFamily = "'Oxygen', sans-serif";

const mapStateToProps = state => ({
    testData: state.tests.data.testData
})

const OverallStats = ({ testData }) => {
    const values = testData.map(r => r.elapsed);

    const statistics = {
        // sum: Math.round(statsLite.sum(values) * 100) / 100,
        mean: Math.round(statsLite.mean(values) * 100) / 100,
        median: Math.round(statsLite.median(values) * 100) / 100,
        mode: statsLite.mode(values),
        // variance: Math.round(statsLite.variance(values) * 100) / 100,
        standardDeviation: Math.round(statsLite.stdev(values) * 100) / 100,
        // sampleStandardDeviation: Math.round(statsLite.sampleStdev(values) * 100) / 100,
        '85thpercentile': Math.round(statsLite.percentile(values, 0.85) * 100) / 100,
        '90thpercentile': Math.round(statsLite.percentile(values, 0.90) * 100) / 100,
        '95thpercentile': Math.round(statsLite.percentile(values, 0.95) * 100) / 100,
        // histogram: Math.round(statsLite.histogram(values, 10) * 100) / 100
    }

    return (
        <React.Fragment>
        <Title className="heading">
            Overall statistics
        </Title>
        <Box className="notification is-danger">
            <Columns>
            {Object.keys(statistics).filter(stat => stat !== "mode").map((stat, index) => 
                <Column key={index}>
                    <div>
                        <div className="heading">{stat} [s]</div>
                        <Title isSize={5}>
                            {statistics[stat].toString()} 
                        </Title>
                    </div>
                </Column>)}
            </Columns>
        </Box>
        </React.Fragment>
    )
}

const Summary = connect(mapStateToProps)(OverallStats)

export default props => (
    <React.Fragment>
        <Info />
        <Summary />
    </React.Fragment>
)