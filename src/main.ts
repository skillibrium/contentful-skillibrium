import "./style.css";
import * as contentful from "contentful";

import {
	getGQMethodologies,
	getSelectedMethodologies,
	getSelectedMethodologyCategories,
	getCRMStages,
	getCoachingAbilities,
	initClient,
	getBusinessUnits,
} from "./g";

import {
	BusinessUnit,
	Certifications,
	MethodologyCategory,
	CoachingAbilityTag,
	CoachingQuestion,
	Methodology,
	FullCoachingMethodologies,
	CRMStage,
} from "./interfaces";
import { FieldsType } from "contentful/dist/types/types/query/util";

test();

/**
 * Test function that will not be used in the actual codebase
 */
async function test() {
	const ACCESS_TOKEN = "7rjVXUpBnvUC4BXz5CK0udDwDZjauDREL4eSo98vuio";
	const SPACE = "sv54roagnofr";
	const ENVIRONMENT = "master";
	const selectedMethodologiesArray = [
		"2QKnI6T51yPp6h9HSylVpK",
		"1lZQPJLQhYbHu7ZRYYSufO",
		"55kQlowECVmIlXMm4p3qpW",
	];

	initClient(SPACE, ACCESS_TOKEN, ENVIRONMENT);
	let methodologies: Methodology[] = await getGQMethodologies({
		isCoachingCertified: true,
	});

	let selectedMethodologies: Methodology[] = await getSelectedMethodologies(
		selectedMethodologiesArray,
	);

	let methodologyCategories: MethodologyCategory[] =
		await getSelectedMethodologyCategories(selectedMethodologiesArray);

	let crmStages: CRMStage[] = await getCRMStages(selectedMethodologiesArray);

	let coachingAbilitiesTag: CoachingAbilityTag[] = await getCoachingAbilities(
		selectedMethodologiesArray,
	);

	const businessUnits: BusinessUnit[] = await getBusinessUnits();
}
