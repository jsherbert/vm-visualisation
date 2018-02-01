import React, { Component } from 'react';

import data from './data'
import Graph from './Graph.jsx'
import { scoreNames, colors } from './helpers';

/**
 * @class App
 * 
 * The application root class.
 */
class App extends Component {
	/**
	 * Constructor.
	 * Add the data to the state.
	 */
	constructor() {
		super()
		this.state = {
			data,
			selectedCountries: data.map(countryData => countryData.name),
			selectedFields: Object.keys(data[0].scores)
		}
	}

	/**
	 * @inheritdoc
	 */
	render() {
		return (
			<div className='App'>
				<h1 className='App__header'>Visualisation of VM data</h1>
				<h3 className='App__header'>Hover over the chart to see exact values</h3>
				<div className='App__controls-container'>
					<div className='App__controls-filter-items'>
						<fieldset>
							<h2>Available countries</h2>
							{this.state.data.map(countryData => {
								return (
									<div key={countryData.name} className='Input__container'>
										<label>{countryData.name}</label>
										<input type='checkbox'
											key={countryData.name}
											value={countryData.name}
											onChange={this.handleItemChange}
											checked={this.state.selectedCountries.indexOf(countryData.name) !== -1} />
									</div>
								);
							})}
						</fieldset>
					</div>
					<div className='App__controls-filter-fields'>
						<fieldset>
							<h2>Available fields</h2>
							{Object.keys(data[0].scores).map(scoreKey => {
								return (
									<div key={scoreKey} className='Input__container'>
										<label>{scoreNames[scoreKey]}</label>
										<input type='checkbox'
											key={scoreKey}
											value={scoreKey}
											onChange={this.handleFieldChange}
											checked={this.state.selectedFields.indexOf(scoreKey) !== -1} />
									</div>
								);
							})}
						</fieldset>
					</div>
				</div>
				<div className='App__visualisation-container'>
					<Graph data={this.getFilteredData()} fields={this.state.selectedFields} />
				</div>
			</div>
		)
	}

	/**
	 * Get the filtered dataset.
	 *
	 * @return {Object}
	 */
	getFilteredData() {
		return this.state.data.filter(countryData => this.state.selectedCountries.indexOf(countryData.name) !== -1);
	}

	/**
	 * Handle a change in a country checkbox.
	 *
	 * @param {MouseEvent<HTMLCheckboxElement>} event
	 */
	handleItemChange = event => {
		this.setState({
			selectedCountries: this.toggleItemInArray(event.target.value, this.state.selectedCountries)
		});
	}

	/**
	 * Handle a change in a country checkbox.
	 *
	 * @param {MouseEvent<HTMLCheckboxElement>} event
	 */
	handleFieldChange = event => {
		this.setState({
			selectedFields: this.toggleItemInArray(event.target.value, this.state.selectedFields)
		});
	}

	/**
	 * Toggle an item's presence in the given array.
	 * 
	 * @param {string} item
	 * @param {Array} currentItems
	 */
	toggleItemInArray(item, currentItems) {
		const indexOfItem = currentItems.indexOf(item);
		if (indexOfItem !== -1) {
			return currentItems.filter((_, index) => index !== indexOfItem);
		} else {
			return currentItems.concat(item);
		}
	}
}

export default App;

