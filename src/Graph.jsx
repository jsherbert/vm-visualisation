import React, { Component } from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

import { scoreNames, colors } from './helpers';
import Axis from './Axis.jsx';
import Bar from './Bar.jsx';
import {
	getCumulativeValueOfScoreSet,
	getTotalValueOfScoreSet,
	getLargestCumulativeValueInDataset,
	getLargestValueInDataset,
	getLargestValueOfScoreSet
} from './helpers'

/**
 * @class Graph
 * 
 * Represents a graph in its entirety, containing axis, charting elements, etc.
 * 
 * This is one, coupled, approach to the problem for brevity, but a charts system
 * would ideally be able to pump data into child charting components, so
 * we could compose charts with arbitrary combinations of charting components.
 */
export default class Graph extends Component {
	static propTypes = {
	  data: propTypes.array
	}
  
	/**
	 * @inheritdoc
	 */
	render() {
	  return (
		<div className='Graph'>
			<div className='Graph__container'>
				<div className='Graph__body'>
					<Axis pointCount={this.props.data.length}
						direction='x'
						labels={this.props.data.map(countryData => countryData.name)}
						title='Country' />
					<Axis pointCount={10}
						direction='y'
						max={this.getLargestCumulativeValueInDataset(this.props.fields)}
						grid={true}
						title='Score' />
					{this.renderGraphElements()}
				</div>
			</div>
			<div className='Graph__key'>
				{Object.keys(this.props.data[0].scores).map(scoreKey => (
					<div key={scoreKey} className='Graph__key-item'>
						<div className='Graph__key-swatch' style={{ backgroundColor: colors[scoreKey] }}/>
						<div className='Graph__key-label'>{scoreNames[scoreKey]}</div>
					</div>
				))}
			</div>
		</div>
	  );
	}
  
	/**
	 * Render the elements for the graph data.
	 *
	 * @return {JSX.Element}
	 */
	renderGraphElements = () => {
		const largestValue = this.getLargestValueInDataset();
		return this.props.data.map(countryData => {
			const largestValueOfBar = getLargestValueOfScoreSet(countryData.scores, this.props.fields);
			return (
				<div className='ElementContainer' key={countryData.name} style={{
					height: `${largestValueOfBar / largestValue * 100}%`,
					width: `${100 / this.props.data.length}%`
				}}>
					<Bar data={countryData} fields={this.props.fields} />
				</div>
			);
		});
	}
  
	/**
	 * Get the largest possible axis size for the graph.
	 * 
	 * @return {number}
	 */
	getLargestValueInDataset = () => {
	  return this.props.data.reduce((acc, next) => {
			const highestValue = getLargestValueOfScoreSet(next.scores, this.props.fields);
			return acc < highestValue ? highestValue : acc;
	  }, 0);
	}

	/**
	 * Get the largest possible axis size for the graph.
	 * 
	 * @return {number}
	 */
	getLargestCumulativeValueInDataset = () => {
		return this.props.data.reduce((acc, next) => {
			const value = getTotalValueOfScoreSet(next.scores, this.props.fields);
			return acc < value ? value : acc;
		}, 0);
	}
}

