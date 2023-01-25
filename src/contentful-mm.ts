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

	const coachingMethodology: FullCoachingMethodologies = {
		businessUnits: businessUnits,
		methodologies: selectedMethodologies,
		abilityCategories: methodologyCategories,
		abilityTags: coachingAbilitiesTag,
		questions: coachingQuestions,
	};
	return coachingMethodology;
}
