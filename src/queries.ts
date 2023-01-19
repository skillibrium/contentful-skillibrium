import { Certifications } from "./interfaces";

export function getMethodologiesQuery({
	isCoachingCertified = false,
	isDMCertified = false,
}: Certifications): string {
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

	const queryString = `
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
