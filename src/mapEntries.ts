import { BusinessUnit } from "./interfaces";
import {
	CRMStage,
	MethodologyCategory,
	CoachingAbilityTag,
	Methodology,
} from "./interfaces";

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export function mapEntryToMethodology(entry: any): Methodology {
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

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export function mapEntryToMethodologyCategory(entry: any): MethodologyCategory {
	return {
		name: entry.name,
		id: entry.sys.id,
		methodologyId: entry.methodology.sys.id,
		description: entry.description,
		version: entry.sys.publishedVersion,
		createdAt: entry.sys.firstPublishedAt,
		updatedAt: entry.sys.publishedAt,
	};
}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export function mapEntryToCRMStage(entry: any): CRMStage {
	return {
		name: entry.name,
		id: entry.sys.id,
		methodologyId: entry.methodology.sys.id,
		description: entry.description,
		version: entry.sys.publishedVersion,
		createdAt: entry.sys.firstPublishedAt,
		updatedAt: entry.sys.publishedAt,
	};
}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export function mapEntryToCoachingAbility(entry: any): CoachingAbilityTag {
	return {
		name: entry.name,
		id: entry.sys.id,
		methodologyId: entry.methodology.sys.id,
		description: entry.description,
		version: entry.sys.publishedVersion,
		createdAt: entry.sys.firstPublishedAt,
		updatedAt: entry.sys.publishedAt,
	};
}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export function mapEntryToBusinessUnit(entry: any): BusinessUnit {
	return {
		name: entry.name,
		id: entry.sys.id,
		description: entry.description,
		version: entry.sys.publishedVersion,
		createdAt: entry.sys.firstPublishedAt,
		updatedAt: entry.sys.publishedAt,
	};
}
