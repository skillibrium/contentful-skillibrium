import * as contentful from "contentful";
import {
	BusinessUnit,
	CRMStage,
	MethodologyCategory,
	CoachingAbilityTag,
	CoachingQuestion,
	Methodology,
	FullCoachingMethodologies,
} from "./interfaces";
import { FieldsType } from "contentful/dist/types/types/query/util";

export function mapEntryToMethodology(
	entry: contentful.EntryWithLinkResolutionAndWithUnresolvableLinks<FieldsType>,
): Methodology {
	return {
		name: entry.fields.name,
		id: entry.sys.id,
		isCoachingCertified: entry.fields.isCoachingCertified,
		isDMCertified: entry.fields.isDMCertified,
		description: entry.fields.description,
		iconURL: entry.fields.icon?.fields.file.url,
		iconTitle: entry.fields.icon?.fields.title,
		version: entry.sys.revision,
		createdAt: entry.sys.createdAt,
		updatedAt: entry.sys.updatedAt,
	};
}

export function mapEntryToBusinessUnit(
	entry: contentful.EntryWithLinkResolutionAndWithUnresolvableLinks<FieldsType>,
): BusinessUnit {
	return {
		name: entry.fields.name,
		id: entry.sys.id,
		description: entry.fields.description,
		version: entry.sys.revision,
		createdAt: entry.sys.createdAt,
		updatedAt: entry.sys.updatedAt,
	};
}
