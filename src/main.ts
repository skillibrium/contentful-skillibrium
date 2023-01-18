import "./style.css";
import * as contentful from "contentful";

import {
	BusinessUnit,
	CRMStage,
	MethodologyCategory,
	CoachingAbilityTag,
	CoachingQuestion,
	Methodology,
	FullMethodologies,
} from "./interfaces";
import { FieldsType } from "contentful/dist/types/types/query/util";

import { mapEntryToMethodology } from "./mapEntries";

let client: contentful.ContentfulClientApi;

test();

/**
 * Creates and connects a client that will be used for the rest of the session
 * @param accessToken Access token to connect to Contentful
 * @param space SpaceID for contentful
 */
function init(
	accessToken: string,
	space: string,
	environment: string = "master",
): void {
	try {
		client = contentful.createClient({
			accessToken: accessToken,
			space: space,
			environment,
		});
	} catch (e) {
		console.error(e);
	}
}

// Methodology Functions

/**
 * Get all the methodologies in contentful
 * @returns list of Methodologies that exists in Contentful
 */
async function getMethodologies(): Promise<Methodology[]> {
	let methodologies: Methodology[] = [];

	const entries = await client.getEntries({ content_type: "methodology" });
	entries.items.forEach(function (entry) {
		methodologies.push(mapEntryToMethodology(entry));
		// console.log(methodologies);
	});

	return methodologies;
}

/**
 *
 * @param selectedMethodologies List of ids of the methodologies that we want to get
 */
async function getCoaching(
	selectedMethodologies: string[],
): Promise<FullMethodologies> {
	let fullMethodologies: FullMethodologies;
	let businessUnits: BusinessUnit[] = [];

	// Get all Business Units
	const businessUnitEntries = await client.getEntries({
		content_type: "businessUnit",
	});
	businessUnitEntries.items.forEach(function (entry) {
		businessUnits.push(mapEntryToMethodology(entry));
	});

	// Loop through each selected methodology selected to get relevant data
	selectedMethodologies.forEach(async function (methodology) {
		const entries = await client.getEntries({
			"sys.id[in]": "4KyuajUmAYhaPO8rhHhP77,1lZQPJLQhYbHu7ZRYYSufO",
			// content_type: "methodologyCategory",
		});
		console.log(entries);
	});

	// const entries = await client.getEntries({ content_type: "businessUnit" });
	// entries.items.forEach(function (entry) {});

	fullMethodologies = {
		businessUnits,
		methodologies: [],
	};

	// console.log(fullMethodologies);

	return {
		businessUnits,
		methodologies: [],
	};
}

/**
 * Test function that will not be used in the actual codebase
 */
async function test() {
	const ACCESS_TOKEN = "7rjVXUpBnvUC4BXz5CK0udDwDZjauDREL4eSo98vuio";
	const SPACE = "sv54roagnofr";

	init(ACCESS_TOKEN, SPACE);

	// Get methodologies
	const m = await getMethodologies();
	console.log(m);

	const methodologies = await getCoaching([
		"4KyuajUmAYhaPO8rhHhP77",
		"1lZQPJLQhYbHu7ZRYYSufO",
	]);

	console.log(methodologies);
}
