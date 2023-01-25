import {
	getMethodologies,
	getSelectedMethodologies,
	getSelectedMethodologyCategories,
	getCoachingAbilities,
	initClient,
	getBusinessUnits,
	getCoachingQuestions,
} from "./contentful";

import {
	FullCoachingMethodologies,
	Methodology,
	CRMStage,
	Certifications,
} from "./interfaces";

export function initialize(
	space: string,
	accessToken: string,
	environment: string,
): void {
	initClient(space, accessToken, environment);
}

export async function getAllMethodologies(
	certifications: Certifications,
): Promise<Methodology[]> {
	console.log("getting methodologies");
	let methodologies: Methodology[] = await getMethodologies(certifications);
	return methodologies;
}

export async function getCRMStages(
	selectedMethodologies: string[],
): Promise<CRMStage[]> {
	const crmStages: CRMStage[] = await getCRMStages(selectedMethodologies);
	return crmStages;
}

export async function getCoaching(
	methodologiesArray: string[],
): Promise<FullCoachingMethodologies> {
	// console.log("Slected Methodologies: ", methodologiesArray);
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
	// console.log(coachingAbilitiesTag);
	return coachingMethodologies;
}

/**
 * Test function that will not be used in the actual codebase
 */
/*
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
*/
