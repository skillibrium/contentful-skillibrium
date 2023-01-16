import "./style.css";
import * as contentful from "contentful";

let client: contentful.ContentfulClientApi;

interface ContentfulSystem {
	id: string;
	name: string;
	description?: string | undefined;
	locale: string | undefined;
	revision: number;
	createdAt: string;
	updatedAt: string;
}

interface ContentfulAsset {
	iconURL?: string | undefined;
	iconTitle?: string | undefined;
}

interface BusinessUnit extends ContentfulSystem {
}

interface CRMStage extends ContentfulSystem {
}

interface MethodologyCategory extends ContentfulSystem {
}

interface CoachingAbilityTag extends ContentfulSystem {
}

interface CoachingQuestion extends ContentfulSystem {
	question: string;
	willingAble: string;
	businessUnit?: BusinessUnit;
	isStarRating: boolean;
}

interface Methodology extends ContentfulSystem, ContentfulAsset {
	CRMStages?: CRMStage[];
	methodologyCategories?: MethodologyCategory[]
	coachingAbilityTags?: CoachingAbilityTag[]
	coachingQuestion?: CoachingQuestion[]
}

interface FullMethodologies {
	businessUnits: BusinessUnit[]
	methodologies: Methodology[]
}

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
	let m: Methodology;
	let methodologies: Methodology[] = [];

	const entries = await client.getEntries({ content_type: "methodology" });
	entries.items.forEach(function (entry) {
		m = {
			name: entry.fields.name,
			id: entry.sys.id,
			iconTitle: entry.fields.icon?.fields?.title,
			iconURL: entry.fields.icon?.fields?.file?.url,
			description: entry.fields.description,
			revision: entry.sys.revision,
			createdAt: entry.sys.createdAt,
			updatedAt: entry.sys.updatedAt,
			locale: entry.sys.locale,
		};
		methodologies.push(m);
		// console.log(methodologies);
	});

	return methodologies;
}

/**
 * 
 * @param selectedMethodologies List of ids of the methodologies that we want to get
 */
async function getCoaching(selectedMethodologies: string[]):Promise<FullMethodologies>{
	//TODO Implement this
};

/**
 * Test function that will not be used in the actual codebase
 */
async function test() {
	const ACCESS_TOKEN = "7rjVXUpBnvUC4BXz5CK0udDwDZjauDREL4eSo98vuio";
	const SPACE = "sv54roagnofr";

	init(ACCESS_TOKEN, SPACE);

	const m = await getMethodologies();
	console.log(m);
}
