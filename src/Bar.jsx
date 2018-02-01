import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
	getCumulativeValueOfScoreSet,
	getTotalValueOfScoreSet,
	getLargestCumulativeValueInDataset,
	getLargestValueInDataset,
	getLargestValueOfScoreSet,
	colors,
	scoreNames
} from './helpers'
/**
 * @class Bar
 * 
 * A bar element, to be plotted on a Graph.
 * Can contain multiple data elements for stacked bar charts.
 */
export default class Bar extends Component {
	static propTypes = {
		data: propTypes.object,
		fields: propTypes.array
	}

	/**
	 * @inheritdoc
	 */
	render() {
		return (
			<div className='Bar__container'>
				{this.renderElements()}
			</div>
		);
	}

	/**
	 * Render the bar elements.
	 * 
	 * @return {JSX.Element}
	 */
	renderElements() {
		const totalValue = getCumulativeValueOfScoreSet(this.props.data.scores, this.props.fields)
		return (
			<div className='Bar'>
				{Object.keys(this.props.data.scores).filter(scoreKey => {
					return this.props.fields.indexOf(scoreKey) !== -1
				}).map(scoreKey => {
					return (
						<div className='Bar__segment' key={scoreKey} style={{
							height: `${this.props.data.scores[scoreKey].value / totalValue * 100}%`,
							backgroundColor: colors[scoreKey]
						}}>
							<div className='Bar__tooltip-container'>
								<div className='Bar__tooltip'>
									<div className='Bar__tooltip-triangle' />
									<div className='Bar__tooltip-data-title'>
										{scoreNames[scoreKey]}
									</div>
									<div className='Bar__tooltip-data-value'>
										{this.props.data.scores[scoreKey].value}
									</div>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		);
	}
}