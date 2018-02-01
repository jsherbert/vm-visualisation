import React, { Component } from 'react';
import propTypes from 'prop-types';

/**
 * @class Axis
 *
 * An axis of a graph. Extends to provide gridlines.
 */
export default class Axis extends Component {
	static propTypes = {
		pointCount: propTypes.number,
		direction: propTypes.string,
		grid: propTypes.bool,
		title: propTypes.string
	}

	static defaultProps = {
		grid: false
	}

	/**
	 * @inheritdoc
	 */
	render() {
		const { pointCount, direction } = this.props;
		return (
			<div className={`Axis__${direction}`}>
				<div className={`Axis__title-${direction}`}>{this.props.title}</div>
				{this.getAxisPoints(pointCount)}
			</div>
		)
	}

	/**
	 * Render the axis points.
	 * @return {Array<JSX.Element}}
	 */
	getAxisPoints = () => {
		const points = [];
		const positionParam = this.getPositionParam();
		const sizeParam = this.getSizeParam();

		for (let i = 0; i < this.props.pointCount; i++) {
			const positionStyle = { [positionParam]: i === 0 ? 0 : `${i / this.props.pointCount * 100}%` };
			const sizeStyle = { [sizeParam]: `${1 / this.props.pointCount * 100}%` };
			points.push(
				<div className={`Axis__point-${this.props.direction}`} key={`axis-${i}`} style={{ ...positionStyle, ...sizeStyle }}>
					{this.props.labels && <div className='Axis__label'>{this.props.labels[i]}</div>}
					{!!this.props.max && <div className='Axis__figure'>{(this.props.max - (this.props.max / 10 * i)).toFixed(2)}</div>}
				</div>
			);
			this.props.grid && points.push(
				<div className={`Axis__grid-${this.props.direction}`} style={{ ...positionStyle }} key={`grid-${i}`} />
			);
		}
		return points;
	}

	/**
	 * Get the correct position param for the axis orientation
	 * @return {string}
	 */
	getPositionParam = () => {
		return this.props.direction === 'x' ? 'left' : 'top';
	}

	/**
	 * Get the correct size param for the axis orientation.
	 * 
	 * @param {string} direction
	 * @return {string}
	 */
	getSizeParam(direction) {
		return direction = 'x' ? 'width' : 'height'
	}
}
