import { Certifications } from "./interfaces";
import { DocumentNode, gql } from "@apollo/client/core";

export function getMethodologiesQuery({
	isCoachingCertified = false,
	isDMCertified = false,
}: Certifications): DocumentNode {
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
		Object.keys(condition).length > 0 ? `where: ${stringifiedCondition}` : "";

	const queryString = gql`
		query {
			methodologyCollection (order: name_ASC, ${whereClause}) {
				items {
					sys {
						id
						publishedVersion
						publishedAt
						firstPublishedAt
					}
					name
					description
					isCoachingCertified
					isDmCertified
					icon {
						title
						url
					}
				}
			}
		}
	`;
	return queryString;
}

export function getSelectedMethodologiesQuery(
	selectedMethodologyIds: string[],
): DocumentNode {
	const selectedMethodologiesString = arrayToString(selectedMethodologyIds);
	const queryString = `
		query {
			methodologyCollection
			(
				order: name_ASC, 
				where: { 
				sys:{id_in:${selectedMethodologiesString}}
				}
			) {
				items {
					sys {
						id
						publishedVersion
						publishedAt
						firstPublishedAt
					}
					name
					description
					isCoachingCertified
					isDmCertified
					icon {
						title
						url
					}
				}
			}
		}
	`;

	// console.log(queryString);

	return gql`${queryString}`;
}

export function getSelectedMethodologyCategoriesQuery(
	selectedMethodologyIds: string[],
): DocumentNode {
	const selectedMethodologiesString = arrayToString(selectedMethodologyIds);
	const queryString = `
		query {
			methodologyCategoryCollection(
				order: name_ASC
				where: {
				methodology: {
					sys: {
						id_in: ${selectedMethodologiesString}
					}
				}
				}
			) {
				items {
					methodology {
						sys {
							id
						}
					}
					sys {
						id
						publishedVersion
						publishedAt
						firstPublishedAt
					}
					name
					description
					}
				}
			}
	`;

	// console.log(queryString);

	return gql`${queryString}`;
}

export function getCRMStageQuery(
	selectedMethodologyIds: string[],
): DocumentNode {
	const selectedMethodologiesString = arrayToString(selectedMethodologyIds);
	const queryString = `
		query {
			crmStageCollection(
				order: name_ASC
				where: {
				methodology: {
					sys: {
						id_in: ${selectedMethodologiesString}
					}
				}
				}
			) {
				items {
					methodology {
						sys {
							id
						}
					}
					sys {
						id
						publishedVersion
						publishedAt
						firstPublishedAt
					}
					name
					description
					}
				}
			}
	`;

	// console.log(queryString);

	return gql`${queryString}`;
}

export function getCoachingAbilityQuery(
		selectedMethodologyIds: string[],
	): DocumentNode {
		const selectedMethodologiesString = arrayToString(selectedMethodologyIds);
		const queryString = `
		query {
			coachingCategoryCollection(
				order: name_ASC
				where: {
				methodology: {
					sys: {
						id_in: ${selectedMethodologiesString}
					}
				}
				}
			) {
				items {
					methodology {
						sys {
							id
						}
					}
					sys {
						id
						publishedVersion
						publishedAt
						firstPublishedAt
					}
					name
					description
					}
				}
			}
	`;

		// console.log(queryString);

		return gql`${queryString}`;
	}

function arrayToString(arr: string[]): string {
	return `["${arr.join('","')}"]`;
}
