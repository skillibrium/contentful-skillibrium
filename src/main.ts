import "./style.css";
import * as contentful from "contentful";

import { getGQMethodologies, initClient } from "./g";

import {
	BusinessUnit,
	Certifications,
	MethodologyCategory,
	CoachingAbilityTag,
	CoachingQuestion,
	Methodology,
	FullCoachingMethodologies,
} from "./interfaces";
import { FieldsType } from "contentful/dist/types/types/query/util";

import { mapEntryToMethodology, mapEntryToBusinessUnit } from "./mapEntries";

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
 * Get all the methodologies in contentful that meet the certifications
 * @returns list of Methodologies that exists in Contentful
 */
async function getMethodologies(
	certifications: Certifications,
): Promise<Methodology[]> {
	let methodologies: Methodology[] = [];

	// Define which certifications we need
	let options = {
		content_type: "methodology",
		...(certifications.isCoachingCertified && {
			"fields.isCoachingCertified": certifications.isCoachingCertified,
		}),
		...(certifications.isDMCertified && {
			"fields.isDMCertified": certifications.isDMCertified,
		}),
	};
	const entries = await client.getEntries(options);
	entries.items.forEach(function (entry) {
		methodologies.push(mapEntryToMethodology(entry));
	});

	return methodologies;
}

/**
 *
 * @param selectedMethodologies List of ids of the methodologies that we want to get
 */
async function getCoaching(
	selectedMethodologies: string[],
): Promise<FullCoachingMethodologies> {
	let fullCoachingMethodologies: FullCoachingMethodologies;
	let methodologies: Methodology[] = [];
	let businessUnits: BusinessUnit[] = [];

	// Get all Business Units
	const businessUnitEntries = await client.getEntries({
		content_type: "businessUnit",
	});
	businessUnitEntries.items.forEach(function (businessUnitEntry) {
		businessUnits.push(mapEntryToBusinessUnit(businessUnitEntry));
	});

	// Get selected methodologies
	const methodologyEntries = await client.getEntries({
		"sys.id[in]": selectedMethodologies.toString(),
	});
	methodologyEntries.items.forEach(function (methodologyEntry) {
		methodologies.push(mapEntryToMethodology(methodologyEntry));
	});

	const entries = await client.getEntries({
		content_type: "methodology",
		include: 5,
	});
	entries.items.forEach(function (entry) {
		console.log("Entry", entry);
	});

	fullCoachingMethodologies = {
		businessUnits,
		methodologies,
	};

	// console.log(fullMethodologies);

	return {
		businessUnits,
		methodologies,
	};
}

/**
 * Test function that will not be used in the actual codebase
 */
async function test() {
	const ACCESS_TOKEN = "7rjVXUpBnvUC4BXz5CK0udDwDZjauDREL4eSo98vuio";
	const SPACE = "sv54roagnofr";
	const ENVIRONMENT = "master";

	init(ACCESS_TOKEN, SPACE);

	// // Get methodologies
	const m = await getMethodologies({
		isCoachingCertified: true,
	});
	console.log(m);

	const methodologies = await getCoaching([
		"4KyuajUmAYhaPO8rhHhP77",
		"1lZQPJLQhYbHu7ZRYYSufO",
	]);

	console.log(methodologies);

	initClient(SPACE, ACCESS_TOKEN, ENVIRONMENT);
	getGQMethodologies({
		isCoachingCertified: true,
	});
}
