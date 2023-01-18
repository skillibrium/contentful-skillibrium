import { gql, ApolloClient } from "@apollo/client/core";
import { isReference, isInlineFragment } from "@apollo/client/utilities";
import { InMemoryCache, NormalizedCacheObject } from "@apollo/client/cache";

const URL =
	"https://graphql.contentful.com/content/v1/spaces/sv54roagnofr/environments/master?access_token=7rjVXUpBnvUC4BXz5CK0udDwDZjauDREL4eSo98vuio";

let client: ApolloClient<NormalizedCacheObject>;

function initClient(
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

export function g() {
	const query = gql`
		query {
			methodologyCollection {
				items {
					sys {
						id
					}
					name
				}
			}
		}
	`;

	client.query({ query }).then((result) => console.log(result));
}
