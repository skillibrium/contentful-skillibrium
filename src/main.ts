import "./style.css";
import * as contentful from "contentful";

let client: contentful.ContentfulClientApi;

interface ContentfulSystem {
	locale: string | undefined;
	revision: number;
	createdAt: string;
	updatedAt: string;
	id: string;
}

interface Methodology extends ContentfulSystem {
	name: string;
	iconURL?: string | undefined;
	iconTitle?: string | undefined;
	description?: string | undefined;
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

function getMethodologies(): Methodology[] {
	let m: Methodology
	let methodologies: Methodology[] = [];
	client
		.getEntries({
			content_type: "methodology",
		})
		.then(function (entries) {
			// console.log(entries);
			entries.items.forEach(function (entry) {
				console.log(entry.fields);
				// m.createdAt = entry.sys.createdAt
				// m.updatedAt = entry.sys.updatedAt
				// m.id = entry.sys.id
				// m.revision = entry.sys.revision
				// m.locale = entry.sys.locale
				// m.name = entry.fields.name
				// m.description = entry.fields.description
				m={
					createdAt : entry.sys.createdAt,
					updatedAt : entry.sys.updatedAt,
					id : entry.sys.id,
					revision : entry.sys.revision,
					locale : entry.sys.locale,
					name : entry.fields.name,
					iconURL: entry.fields.icon?.fields?.file?.url,
					iconTitle: entry.fields.icon?.fields?.title,
					description :  entry.fields.description
				}
				methodologies.push(m);
				console.log(m)
			});
		});
	return methodologies;
}

/**
 * Test function that will not be used in the actual codebase
 */
function test() {
	const ACCESS_TOKEN = "7rjVXUpBnvUC4BXz5CK0udDwDZjauDREL4eSo98vuio";
	const SPACE = "sv54roagnofr";

	init(ACCESS_TOKEN, SPACE);

	console.log(getMethodologies());
}
