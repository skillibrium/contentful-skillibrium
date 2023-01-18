import * as contentful from "contentful";
import {
	BusinessUnit,
	CRMStage,
	MethodologyCategory,
	CoachingAbilityTag,
	CoachingQuestion,
	Methodology,
	FullMethodologies,
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
		revision: entry.sys.revision,
		createdAt: entry.sys.createdAt,
		updatedAt: entry.sys.updatedAt,
		locale: entry.sys.locale,
	};
}
