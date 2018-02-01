// We hardcode the color scheme here, but with more time
// this could be dynamically generated.
export const colors = {
	'com_certifiedsustainableproduction_2018-Q1': '#FFBC67',
	'com_childlabour_2018-Q1': '#DA727E',
	'com_climatechangevulnerability_2018-Q1': '#AC6C82',
	'com_collectivebargaining_2018-Q1': '#685C79',
	'com_corruption_2018-Q1': '#455C7B',
	'com_deforestation_2018-Q1': '#283547',
	'com_discrimination_2018-Q1': '#69424F',
	'com_forcedlabour_2018-Q1': '#A67A43'
}

// A few labels for readability.
export const scoreNames = {
	'com_certifiedsustainableproduction_2018-Q1': 'Certified sustainable production',
	'com_childlabour_2018-Q1': 'Child labour',
	'com_climatechangevulnerability_2018-Q1': 'Climate change vulnerability',
	'com_collectivebargaining_2018-Q1': 'Collective bargaining',
	'com_corruption_2018-Q1': 'Corruption',
	'com_deforestation_2018-Q1': 'Deforestation',
	'com_discrimination_2018-Q1': 'Discrimination',
	'com_forcedlabour_2018-Q1': 'Forced labour'
}

/**
 * Get the highest score in the set of country scores. If the fields parameter
 * is provided, only include scores that match the keys in the supplied fields.
 *
 * @param {Array} fields
 * @param {Object} scoreSet
 * @param {number}
 */
export const getLargestValueOfScoreSet = (scoreSet, fields) => {
	let highestValue = 0;
	Object.keys(scoreSet).forEach(scoreKey => {
		if (fields && fields.indexOf(scoreKey) === -1) {
			return;
		}
		if (scoreSet[scoreKey].value > highestValue) {
			highestValue = scoreSet[scoreKey].value;
		}
	});
	return highestValue;
}

/**
 * Get the total score of the set of country scores. If the fields parameter
 * is provided, only include scores that match the keys in the supplied fields.
 *
 * @param {Array} fields
 * @param {Object} scoreSet
 * @param {number}
 */
export const getTotalValueOfScoreSet = (scoreSet, fields) => {
	let value = 0;
	Object.keys(scoreSet).forEach(scoreKey => {
		if (fields && fields.indexOf(scoreKey) === -1) {
			return;
		}
		value += scoreSet[scoreKey].value;
	});
	return value;
}

/**
 * Get the cumulative score in a set of country scores. If the fields parameter
 * is provided, only include scores that match the keys in the supplied fields.
 *
 * @param {Object} scoreSet
 * @param {Array} fields
 * @return {number}
 */
export const getCumulativeValueOfScoreSet = (scoreSet, fields) => {
	return Object.keys(scoreSet).reduce((acc, scoreKey) => {
		if (fields && fields.indexOf(scoreKey) === -1) {
			return acc;
		}
		return acc + scoreSet[scoreKey].value
	}, 0);
}
