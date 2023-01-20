// @ts-nocheck

import { ApolloClient } from "@apollo/client/core";
// import { isReference, isInlineFragment } from "@apollo/client/utilities";
import { InMemoryCache, NormalizedCacheObject } from "@apollo/client/cache";
import {
	getMethodologiesQuery,
	getSelectedMethodologiesQuery,
	getSelectedMethodologyCategoriesQuery,
	getCRMStagesQuery,
	getCoachingAbilitiesQuery,
	getBusinessUnitsQuery,
	getCoachingQuestionsQuery,
	getUnattachedCoachingQuestionsQuery,
} from "./queries";

import {
	mapEntryToBusinessUnit,
	mapEntryToCoachingAbility,
	mapEntryToCoachingQuestion,
	mapEntryToCRMStage,
	mapEntryToMethodology,
	mapEntryToMethodologyCategory,
} from "./mapEntries";

import {
	BusinessUnit,
	Certifications,
	MethodologyCategory,
	CRMStage,
	CoachingQuestion,
	Methodology,
	CoachingAbilityTag,
} from "./interfaces";

let client: ApolloClient<NormalizedCacheObject>;

export function initClient(
	space: string,
	accessToken: string,
	environment: string,
): void {
	const uri = `https://graphql.contentful.com/content/v1/spaces/${space}/environments/${environment}?access_token=${accessToken}`;
	client = new ApolloClient({
		uri,
		cache: new InMemoryCache(),
	});
}

export async function getMethodologies(
	certifications: Certifications,
): Promise<Methodology[]> {
	const query = getMethodologiesQuery(certifications);
	const result = await client.query({ query });
	let methodologies: Methodology[] = new Array();

	result.data.methodologyCollection.items.forEach((entry) => {
		methodologies.push(mapEntryToMethodology(entry));
	});
	// console.log(methodologies);
	return methodologies;
}

export async function getSelectedMethodologies(
	selectedMethodologyIds: string[],
): Promise<Methodology[]> {
	const query = getSelectedMethodologiesQuery(selectedMethodologyIds);
	const result = await client.query({ query });

	let methodologies: Methodology[] = new Array();
	result.data.methodologyCollection.items.forEach((entry) => {
		methodologies.push(mapEntryToMethodology(entry));
	});
	// console.log(methodologies);
	return methodologies;
}

export async function getSelectedMethodologyCategories(
	selectedMethodologyIds: string[],
): Promise<MethodologyCategory[]> {
	const query = getSelectedMethodologyCategoriesQuery(selectedMethodologyIds);
	const result = await client.query({ query });
	let methodologyCategories: MethodologyCategory[] = new Array();
	result.data.methodologyCategoryCollection.items.forEach((entry) => {
		methodologyCategories.push(mapEntryToMethodologyCategory(entry));
	});
	// console.log(methodologyCategories);
	return methodologyCategories;
}

export async function getCRMStages(
	selectedMethodologyIds: string[],
): Promise<CRMStage[]> {
	const query = getCRMStagesQuery(selectedMethodologyIds);
	const result = await client.query({ query });
	let crmStages: CRMStage[] = new Array();

	result.data.crmStageCollection.items.forEach((entry) => {
		crmStages.push(mapEntryToCRMStage(entry));
	});
	// console.log(crmStages);
	return crmStages;
}

export async function getCoachingAbilities(
	selectedMethodologyIds: string[],
): Promise<CoachingAbilityTag[]> {
	const query = getCoachingAbilitiesQuery(selectedMethodologyIds);
	const result = await client.query({ query });
	let coachingAbilitiesTag: CoachingAbilityTag[] = new Array();

	result.data.coachingCategoryCollection.items.forEach((entry) => {
		coachingAbilitiesTag.push(mapEntryToCoachingAbility(entry));
	});
	// console.log(coachingAbilitiesTag);
	return coachingAbilitiesTag;
}

export async function getBusinessUnits(): Promise<BusinessUnit[]> {
	const query = getBusinessUnitsQuery();
	const result = await client.query({ query });
	let businessUnits: BusinessUnit[] = new Array();

	result.data.businessUnitCollection.items.forEach((entry) => {
		businessUnits.push(mapEntryToBusinessUnit(entry));
	});
	// console.log(businessUnits);
	return businessUnits;
}

export async function getCoachingQuestions(
	selectedMethodologyIds: string[],
): Promise<CoachingQuestion[]> {
	// First get the coaching questions tied to the methodologies
	const attachedQuery = getCoachingQuestionsQuery(selectedMethodologyIds);

	// Then get the questions that are not attached to any methodologies
	const unattachedQuery = getUnattachedCoachingQuestionsQuery();

	const [attachedResult, unattachedResult] = await Promise.all([
		client.query({ query: attachedQuery }),
		client.query({ query: unattachedQuery }),
	]);

	const coachingQuestions: CoachingQuestion[] = new Array();

	attachedResult.data.coachingQuestionCollection.items.forEach((entry) => {
		coachingQuestions.push(mapEntryToCoachingQuestion(entry));
	});

	unattachedResult.data.coachingQuestionCollection.items.forEach((entry) => {
		coachingQuestions.push(mapEntryToCoachingQuestion(entry));
	});

	return coachingQuestions;
}
