import "./style.css";
import * as contentful from "contentful";

let client: contentful.ContentfulClientApi;

test();

/**
 * Creates and connects a client that will be used for the rest of the session
 * @param accessToken Access token to connect to Contentful
 * @param space SpaceID for contentful
 */
function init(accessToken: string, space: string): void {
	try {
		client = contentful.createClient({
			accessToken: accessToken,
			space: space,
		});
	} catch (e) {
		console.error(e);
	}
}

// Methodology Functions

function getMethodologies() {}

/**
 * Test function that will not be used in the actual codebase
 */
function test() {
	const ACCESS_TOKEN = "7rjVXUpBnvUC4BXz5CK0udDwDZjauDREL4eSo98vuio";
	const SPACE = "sv54roagnofr";

	init(ACCESS_TOKEN, SPACE);

	client
		.getEntry("E59dHv1djhlVMNf92ydOd")
		.then((entry) => console.log(entry))
		.catch((err) => console.log(err));
}
