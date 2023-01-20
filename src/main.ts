import "./style.css";

import {
	getSelectedMethodologies,
	getSelectedMethodologyCategories,
	getCoachingAbilities,
	initClient,
	getBusinessUnits,
	getCoachingQuestions,
} from "./contentful";

import { FullCoachingMethodologies } from "./interfaces";

test();

/**
 * Test function that will not be used in the actual codebase
 */
async function test() {
	const ACCESS_TOKEN = "7rjVXUpBnvUC4BXz5CK0udDwDZjauDREL4eSo98vuio";
	const SPACE = "sv54roagnofr";
	const ENVIRONMENT = "master";
	const methodologiesArray = [
		"2QKnI6T51yPp6h9HSylVpK",
		"1lZQPJLQhYbHu7ZRYYSufO",
		"55kQlowECVmIlXMm4p3qpW",
	];

	initClient(SPACE, ACCESS_TOKEN, ENVIRONMENT);
	// let methodologies: Methodology[] = await getMethodologies({
	// 	isCoachingCertified: true,
	// });

	// let crmStages: CRMStage[] = await getCRMStages(methodologiesArray);

	// let selectedMethodologies: Methodology[] = await getSelectedMethodologies(
	// 	methodologiesArray,
	// );

	// let methodologyCategories: MethodologyCategory[] =
	// 	await getSelectedMethodologyCategories(methodologiesArray);

	// let coachingAbilitiesTag: CoachingAbilityTag[] = await getCoachingAbilities(
	// 	methodologiesArray,
	// );

	// const businessUnits: BusinessUnit[] = await getBusinessUnits();

	// const coachingQuestions: CoachingQuestion[] = await getCoachingQuestions(
	// 	methodologiesArray,
	// );

	const [
		selectedMethodologies,
		methodologyCategories,
		coachingAbilitiesTag,
		businessUnits,
		coachingQuestions,
	] = await Promise.all([
		getSelectedMethodologies(methodologiesArray),
		getSelectedMethodologyCategories(methodologiesArray),
		getCoachingAbilities(methodologiesArray),
		getBusinessUnits(),
		getCoachingQuestions(methodologiesArray),
	]);

	const coachingMethodologies: FullCoachingMethodologies = {
		businessUnits: businessUnits,
		methodologies: selectedMethodologies,
		abilityCategories: methodologyCategories,
		abilityTags: coachingAbilitiesTag,
		questions: coachingQuestions,
	};
	console.log(coachingMethodologies);
}
