//todo for typescript try "contentful": "10.0.0-beta-v10.8"

interface ContentfulSystem {
	id: string;
	name: string;
	description?: string | undefined;
	locale: string | undefined;
	revision: number;
	createdAt: string;
	updatedAt: string;
}

interface ContentfulAsset {
	iconURL?: string | undefined;
	iconTitle?: string | undefined;
}

export interface BusinessUnit extends ContentfulSystem {}

export interface CRMStage extends ContentfulSystem {}

export interface MethodologyCategory extends ContentfulSystem {}

export interface CoachingAbilityTag extends ContentfulSystem {}

export interface CoachingQuestion extends ContentfulSystem {
	question: string;
	willingAble: string;
	businessUnit?: BusinessUnit;
	isStarRating: boolean;
}

export interface Methodology extends ContentfulSystem, ContentfulAsset {
	isCoachingCertified: boolean;
	isDMCertified: boolean;
	CRMStages?: CRMStage[];
	methodologyCategories?: MethodologyCategory[];
	coachingAbilityTags?: CoachingAbilityTag[];
	coachingQuestion?: CoachingQuestion[];
}

export interface FullMethodologies {
	businessUnits: BusinessUnit[];
	methodologies: Methodology[];
}
