import { gql, ApolloClient } from "@apollo/client/core";
// import { isReference, isInlineFragment } from "@apollo/client/utilities";
import { InMemoryCache, NormalizedCacheObject } from "@apollo/client/cache";
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

export function getGQMethodologies({
	isCoachingCertified = false,
	isDMCertified = false,
}: Certifications) {
	const condition = {
		...(isCoachingCertified && { isCoachingCertified: true }),
		...(isDMCertified && { isDMCertified: true }),
	};
	const stringifiedCondition = JSON.stringify(condition).replace(
		/"([^"]+)":/g,
		"$1:",
	);

	// Should there be a "where" clause?
	const whereClause =
		Object.keys(condition).length > 0 ? `(where:${stringifiedCondition})` : "";

	const queryString = `
		query {
			methodologyCollection ${whereClause} {
				items {
					sys {
						id
					}
					name
				}
			}
		}
	`;
	console.log(queryString);
	const query = gql`${queryString}`;

	client.query({ query }).then((result) => console.log(result));
}
