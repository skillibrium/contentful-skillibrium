import { gql, ApolloClient } from "@apollo/client/core";
// import { isReference, isInlineFragment } from "@apollo/client/utilities";
import { InMemoryCache, NormalizedCacheObject } from "@apollo/client/cache";
import { getMethodologiesQuery } from "./queries";

import {
	BusinessUnit,
	Certifications,
	MethodologyCategory,
	CoachingAbilityTag,
	CoachingQuestion,
	Methodology,
	FullCoachingMethodologies,
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

export async function getGQMethodologies(certifications: Certifications) {
	// console.log(queryString);
	const query = gql`${getMethodologiesQuery(certifications)}`;

	// client.query({ query }).then((result) => console.log(result));
	const result = await client.query({ query });
	result.data.methodologyCollection.items.forEach((entry) => {
		// console.log(entry);
		console.log(mapEntryToMethodology(entry));
	});
}


// rome-ignore lint/suspicious/noExplicitAny: <explanation>
function mapEntryToMethodology(entry: any): Methodology {
	console.log("Entry", entry);
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

async function getCoaching(selectedMethodologies: string[]){

}