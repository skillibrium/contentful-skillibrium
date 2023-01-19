import { gql, ApolloClient } from "@apollo/client/core";
// import { isReference, isInlineFragment } from "@apollo/client/utilities";
import { InMemoryCache, NormalizedCacheObject } from "@apollo/client/cache";
import {
	getMethodologiesQuery,
	getSelectedMethodologiesQuery,
	getSelectedMethodologyCategoriesQuery,
	getCRMStageQuery,
	getCoachingAbilityQuery,
} from "./queries";

import {
	BusinessUnit,
	Certifications,
	MethodologyCategory,
	CRMStage,
	CoachingQuestion,
	Methodology,
	FullCoachingMethodologies,
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

export async function getGQMethodologies(
	certifications: Certifications,
): Promise<Methodology[]> {
	const query = getMethodologiesQuery(certifications);
	const result = await client.query({ query });
	let methodologies: Methodology[] = new Array();

	result.data.methodologyCollection.items.forEach((entry) => {
		methodologies.push(mapEntryToMethodology(entry));
	});
	console.log(methodologies);
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
	console.log(methodologies);
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
	console.log(methodologyCategories);
	return methodologyCategories;
}

export async function getCRMStages(
	selectedMethodologyIds: string[],
): Promise<CRMStage[]> {
	const query = getCRMStageQuery(selectedMethodologyIds);
	const result = await client.query({ query });
	let crmStages: CRMStage[] = new Array();

	result.data.crmStageCollection.items.forEach((entry) => {
		crmStages.push(mapEntryToCRMStage(entry));
	});
	console.log(crmStages);
	return crmStages;
}

export async function getCoachingAbilities(
	selectedMethodologyIds: string[],
): Promise<CoachingAbilityTag[]> {
	const query = getCoachingAbilityQuery(selectedMethodologyIds);
	const result = await client.query({ query });
	let coachingAbilityTag: CoachingAbilityTag[] = new Array();
	result.data.coachingCategoryCollection.items.forEach((entry) => {
		coachingAbilityTag.push(mapEntryToCoachingAbility(entry));
	});
	console.log(coachingAbilityTag);
	return coachingAbilityTag;
}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
function mapEntryToMethodology(entry: any): Methodology {
	return {
		name: entry.name,
		id: entry.sys.id,
		isCoachingCertified: entry.isCoachingCertified,
		isDMCertified: entry.isDmCertified,
		description: entry.description,
		iconURL: entry.icon?.url,
		iconTitle: entry.icon?.title,
		version: entry.sys.publishedVersion,
		createdAt: entry.sys.firstPublishedAt,
		updatedAt: entry.sys.publishedAt,
	};
}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
function mapEntryToMethodologyCategory(entry: any): MethodologyCategory {
	return {
		name: entry.name,
		id: entry.sys.id,
		methodologyId: entry.methodology.sys.id,
		description: entry.description,
		version: entry.sys.publishedVersion,
		createdAt: entry.sys.firstPublishedAt,
		updatedAt: entry.sys.publishedAt,
	};
}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
function mapEntryToCRMStage(entry: any): MethodologyCategory {
	return {
		name: entry.name,
		id: entry.sys.id,
		methodologyId: entry.methodology.sys.id,
		description: entry.description,
		version: entry.sys.publishedVersion,
		createdAt: entry.sys.firstPublishedAt,
		updatedAt: entry.sys.publishedAt,
	};
}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
function mapEntryToCoachingAbility(entry: any): MethodologyCategory {
	return {
		name: entry.name,
		id: entry.sys.id,
		methodologyId: entry.methodology.sys.id,
		description: entry.description,
		version: entry.sys.publishedVersion,
		createdAt: entry.sys.firstPublishedAt,
		updatedAt: entry.sys.publishedAt,
	};
}
