//todo for typescript try "contentful": "10.0.0-beta-v10.8"

interface ContentfulSystem {
	id: string;
	name?: string;
	description?: string | undefined;
	version: number;
	createdAt: string;
	updatedAt: string;
}

interface ContentfulAsset {
	iconURL?: string | undefined;
	iconTitle?: string | undefined;
}

export interface Certifications {
	isCoachingCertified?: boolean;
	isDMCertified?: boolean;
}

export interface BusinessUnit extends ContentfulSystem {}

export interface CRMStage extends ContentfulSystem {
	methodologyId: string;
}

export interface MethodologyCategory extends ContentfulSystem {
	methodologyId: string;
}

export interface CoachingAbilityTag extends ContentfulSystem {
	methodologyId: string;
}

export interface CoachingQuestion extends ContentfulSystem {
	question: string;
	willingAble: string;
	isStarRating: boolean;
	methodologyId?: string;
	abilityCategoryId?: string;
	abilityTagId?: string;
	businessUnitIds?: string[];
}

export interface Methodology
	extends ContentfulSystem,
		ContentfulAsset,
		Certifications {}

export interface FullCoachingMethodologies {
	businessUnits?: BusinessUnit[];
	methodologies?: Methodology[];
	abilityCategories?: MethodologyCategory[];
	abilityTags?: CoachingAbilityTag[];
	questions?: CoachingQuestion[];
}
