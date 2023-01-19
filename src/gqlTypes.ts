type Query {
  asset(id: String!, preview: Boolean, locale: String): Asset
  assetCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
    where: AssetFilter
    order: [AssetOrder]
  ): AssetCollection
  coachingAbleQuestion(
    id: String!
    preview: Boolean
    locale: String
  ): CoachingAbleQuestion
  coachingAbleQuestionCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
    where: CoachingAbleQuestionFilter
    order: [CoachingAbleQuestionOrder]
  ): CoachingAbleQuestionCollection
  coachingCategory(
    id: String!
    preview: Boolean
    locale: String
  ): CoachingCategory
  coachingCategoryCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
    where: CoachingCategoryFilter
    order: [CoachingCategoryOrder]
  ): CoachingCategoryCollection
  methodology(id: String!, preview: Boolean, locale: String): Methodology
  methodologyCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
    where: MethodologyFilter
    order: [MethodologyOrder]
  ): MethodologyCollection
  dmQuestion(id: String!, preview: Boolean, locale: String): DmQuestion
  dmQuestionCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
    where: DmQuestionFilter
    order: [DmQuestionOrder]
  ): DmQuestionCollection
  methodologyCategory(
    id: String!
    preview: Boolean
    locale: String
  ): MethodologyCategory
  methodologyCategoryCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
    where: MethodologyCategoryFilter
    order: [MethodologyCategoryOrder]
  ): MethodologyCategoryCollection
  crmStage(id: String!, preview: Boolean, locale: String): CrmStage
  crmStageCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
    where: CrmStageFilter
    order: [CrmStageOrder]
  ): CrmStageCollection
  businessUnit(id: String!, preview: Boolean, locale: String): BusinessUnit
  businessUnitCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
    where: BusinessUnitFilter
    order: [BusinessUnitOrder]
  ): BusinessUnitCollection
  entryCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
    where: EntryFilter
    order: [EntryOrder]
  ): EntryCollection
}

# Represents a binary file in a space. An asset can be any file type.
type Asset {
  sys: Sys!
  contentfulMetadata: ContentfulMetadata!
  title(locale: String): String
  description(locale: String): String
  contentType(locale: String): String
  fileName(locale: String): String
  size(locale: String): Int
  url(transform: ImageTransformOptions, locale: String): String
  width(locale: String): Int
  height(locale: String): Int
  linkedFrom(allowedLocales: [String]): AssetLinkingCollections
}

type Sys {
  id: String!
  spaceId: String!
  environmentId: String!
  publishedAt: DateTime
  firstPublishedAt: DateTime
  publishedVersion: Int
}

# A date-time string at UTC, such as 2007-12-03T10:15:30Z,
#     compliant with the 'date-time' format outlined in section 5.6 of
#     the RFC 3339 profile of the ISO 8601 standard for representation
#     of dates and times using the Gregorian calendar.
scalar DateTime

type ContentfulMetadata {
  tags: [ContentfulTag]!
}

# Represents a tag entity for finding and organizing content easily.
#     Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
type ContentfulTag {
  id: String
  name: String
}

input ImageTransformOptions {
  # Desired width in pixels. Defaults to the original image width.
  width: Dimension

  # Desired height in pixels. Defaults to the original image height.
  height: Dimension

  # Desired quality of the image in percents.
  #         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
  quality: Quality

  # Desired corner radius in pixels.
  #         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
  #         Defaults to `0`. Uses desired background color as padding color,
  #         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
  cornerRadius: Int

  # Desired resize strategy. Defaults to `FIT`.
  resizeStrategy: ImageResizeStrategy

  # Desired resize focus area. Defaults to `CENTER`.
  resizeFocus: ImageResizeFocus

  # Desired background color, used with corner radius or `PAD` resize strategy.
  #         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
  backgroundColor: HexColor

  # Desired image format. Defaults to the original image format.
  format: ImageFormat
}

# The 'Dimension' type represents dimensions as whole numeric values between `1` and `4000`.
scalar Dimension

# The 'Quality' type represents quality as whole numeric values between `1` and `100`.
scalar Quality

enum ImageResizeStrategy {
  # Resizes the image to fit into the specified dimensions.
  FIT

  # Resizes the image to the specified dimensions, padding the image if needed.
  #         Uses desired background color as padding color.
  PAD

  # Resizes the image to the specified dimensions, cropping the image if needed.
  FILL

  # Resizes the image to the specified dimensions, changing the original aspect ratio if needed.
  SCALE

  # Crops a part of the original image to fit into the specified dimensions.
  CROP

  # Creates a thumbnail from the image.
  THUMB
}

enum ImageResizeFocus {
  # Focus the resizing on the center.
  CENTER

  # Focus the resizing on the top.
  TOP

  # Focus the resizing on the top right.
  TOP_RIGHT

  # Focus the resizing on the right.
  RIGHT

  # Focus the resizing on the bottom right.
  BOTTOM_RIGHT

  # Focus the resizing on the bottom.
  BOTTOM

  # Focus the resizing on the bottom left.
  BOTTOM_LEFT

  # Focus the resizing on the left.
  LEFT

  # Focus the resizing on the top left.
  TOP_LEFT

  # Focus the resizing on the largest face.
  FACE

  # Focus the resizing on the area containing all the faces.
  FACES
}

# The 'HexColor' type represents color in `rgb:ffffff` string format.
scalar HexColor

enum ImageFormat {
  # JPG image format.
  JPG

  # Progressive JPG format stores multiple passes of an image in progressively higher detail.
  #         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
  #         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
  #         early as possible to make the layout look as designed.
  JPG_PROGRESSIVE

  # PNG image format
  PNG

  # 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
  #         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
  PNG8

  # WebP image format.
  WEBP
  AVIF
}

type AssetLinkingCollections {
  entryCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
  ): EntryCollection
  methodologyCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
  ): MethodologyCollection
}

type EntryCollection {
  total: Int!
  skip: Int!
  limit: Int!
  items: [Entry]!
}

interface Entry {
  sys: Sys!
  contentfulMetadata: ContentfulMetadata!
}

type MethodologyCollection {
  total: Int!
  skip: Int!
  limit: Int!
  items: [Methodology]!
}

# Methodology [See type definition](https://app.contentful.com/spaces/sv54roagnofr/content_types/methodology)
type Methodology implements Entry {
  sys: Sys!
  contentfulMetadata: ContentfulMetadata!
  linkedFrom(allowedLocales: [String]): MethodologyLinkingCollections
  name(locale: String): String
  icon(preview: Boolean, locale: String): Asset
  isCoachingCertified(locale: String): Boolean
  isDmCertified(locale: String): Boolean
  description(locale: String): String
}

type MethodologyLinkingCollections {
  entryCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
  ): EntryCollection
  coachingAbleQuestionCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
  ): CoachingAbleQuestionCollection
  coachingCategoryCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
  ): CoachingCategoryCollection
  methodologyCategoryCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
  ): MethodologyCategoryCollection
  crmStageCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
  ): CrmStageCollection
}

type CoachingAbleQuestionCollection {
  total: Int!
  skip: Int!
  limit: Int!
  items: [CoachingAbleQuestion]!
}

# Questions for coaching - only for Able (skill) questions [See type definition](https://app.contentful.com/spaces/sv54roagnofr/content_types/coachingAbleQuestion)
type CoachingAbleQuestion implements Entry {
  sys: Sys!
  contentfulMetadata: ContentfulMetadata!
  linkedFrom(allowedLocales: [String]): CoachingAbleQuestionLinkingCollections
  question(locale: String): String
  willingAble(locale: String): String
  methodology(preview: Boolean, locale: String): Methodology
  methodologyCategory(preview: Boolean, locale: String): MethodologyCategory
  abilityTag(preview: Boolean, locale: String): CoachingCategory
  businessUnitCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
  ): CoachingAbleQuestionBusinessUnitCollection
  isStarRating(locale: String): Boolean
  description(locale: String): String
}

type CoachingAbleQuestionLinkingCollections {
  entryCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
  ): EntryCollection
}

# Categories for the methodologies [See type definition](https://app.contentful.com/spaces/sv54roagnofr/content_types/methodologyCategory)
type MethodologyCategory implements Entry {
  sys: Sys!
  contentfulMetadata: ContentfulMetadata!
  linkedFrom(allowedLocales: [String]): MethodologyCategoryLinkingCollections
  name(locale: String): String
  methodology(preview: Boolean, locale: String): Methodology
  description(locale: String): String
}

type MethodologyCategoryLinkingCollections {
  entryCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
  ): EntryCollection
  coachingAbleQuestionCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
  ): CoachingAbleQuestionCollection
}

# Categories that the coaching questions would be tied to [See type definition](https://app.contentful.com/spaces/sv54roagnofr/content_types/coachingCategory)
type CoachingCategory implements Entry {
  sys: Sys!
  contentfulMetadata: ContentfulMetadata!
  linkedFrom(allowedLocales: [String]): CoachingCategoryLinkingCollections
  name(locale: String): String
  methodology(preview: Boolean, locale: String): Methodology
  description(locale: String): String
}

type CoachingCategoryLinkingCollections {
  entryCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
  ): EntryCollection
  coachingAbleQuestionCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
  ): CoachingAbleQuestionCollection
}

type CoachingAbleQuestionBusinessUnitCollection {
  total: Int!
  skip: Int!
  limit: Int!
  items: [BusinessUnit]!
}

# Business Unit [See type definition](https://app.contentful.com/spaces/sv54roagnofr/content_types/businessUnit)
type BusinessUnit implements Entry {
  sys: Sys!
  contentfulMetadata: ContentfulMetadata!
  linkedFrom(allowedLocales: [String]): BusinessUnitLinkingCollections
  name(locale: String): String
  description(locale: String): String
}

type BusinessUnitLinkingCollections {
  entryCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
  ): EntryCollection
  coachingAbleQuestionCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
  ): CoachingAbleQuestionCollection
}

type CoachingCategoryCollection {
  total: Int!
  skip: Int!
  limit: Int!
  items: [CoachingCategory]!
}

type MethodologyCategoryCollection {
  total: Int!
  skip: Int!
  limit: Int!
  items: [MethodologyCategory]!
}

type CrmStageCollection {
  total: Int!
  skip: Int!
  limit: Int!
  items: [CrmStage]!
}

# CRM Stage that are tied to methodology [See type definition](https://app.contentful.com/spaces/sv54roagnofr/content_types/crmStage)
type CrmStage implements Entry {
  sys: Sys!
  contentfulMetadata: ContentfulMetadata!
  linkedFrom(allowedLocales: [String]): CrmStageLinkingCollections
  name(locale: String): String
  methodology(preview: Boolean, locale: String): Methodology
  description(locale: String): String
}

type CrmStageLinkingCollections {
  entryCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
  ): EntryCollection
}

type AssetCollection {
  total: Int!
  skip: Int!
  limit: Int!
  items: [Asset]!
}

input AssetFilter {
  sys: SysFilter
  contentfulMetadata: ContentfulMetadataFilter
  title_exists: Boolean
  title: String
  title_not: String
  title_in: [String]
  title_not_in: [String]
  title_contains: String
  title_not_contains: String
  description_exists: Boolean
  description: String
  description_not: String
  description_in: [String]
  description_not_in: [String]
  description_contains: String
  description_not_contains: String
  url_exists: Boolean
  url: String
  url_not: String
  url_in: [String]
  url_not_in: [String]
  url_contains: String
  url_not_contains: String
  size_exists: Boolean
  size: Int
  size_not: Int
  size_in: [Int]
  size_not_in: [Int]
  size_gt: Int
  size_gte: Int
  size_lt: Int
  size_lte: Int
  contentType_exists: Boolean
  contentType: String
  contentType_not: String
  contentType_in: [String]
  contentType_not_in: [String]
  contentType_contains: String
  contentType_not_contains: String
  fileName_exists: Boolean
  fileName: String
  fileName_not: String
  fileName_in: [String]
  fileName_not_in: [String]
  fileName_contains: String
  fileName_not_contains: String
  width_exists: Boolean
  width: Int
  width_not: Int
  width_in: [Int]
  width_not_in: [Int]
  width_gt: Int
  width_gte: Int
  width_lt: Int
  width_lte: Int
  height_exists: Boolean
  height: Int
  height_not: Int
  height_in: [Int]
  height_not_in: [Int]
  height_gt: Int
  height_gte: Int
  height_lt: Int
  height_lte: Int
  OR: [AssetFilter]
  AND: [AssetFilter]
}

input SysFilter {
  id_exists: Boolean
  id: String
  id_not: String
  id_in: [String]
  id_not_in: [String]
  id_contains: String
  id_not_contains: String
  publishedAt_exists: Boolean
  publishedAt: DateTime
  publishedAt_not: DateTime
  publishedAt_in: [DateTime]
  publishedAt_not_in: [DateTime]
  publishedAt_gt: DateTime
  publishedAt_gte: DateTime
  publishedAt_lt: DateTime
  publishedAt_lte: DateTime
  firstPublishedAt_exists: Boolean
  firstPublishedAt: DateTime
  firstPublishedAt_not: DateTime
  firstPublishedAt_in: [DateTime]
  firstPublishedAt_not_in: [DateTime]
  firstPublishedAt_gt: DateTime
  firstPublishedAt_gte: DateTime
  firstPublishedAt_lt: DateTime
  firstPublishedAt_lte: DateTime
  publishedVersion_exists: Boolean
  publishedVersion: Float
  publishedVersion_not: Float
  publishedVersion_in: [Float]
  publishedVersion_not_in: [Float]
  publishedVersion_gt: Float
  publishedVersion_gte: Float
  publishedVersion_lt: Float
  publishedVersion_lte: Float
}

input ContentfulMetadataFilter {
  tags_exists: Boolean
  tags: ContentfulMetadataTagsFilter
}

input ContentfulMetadataTagsFilter {
  id_contains_all: [String]
  id_contains_some: [String]
  id_contains_none: [String]
}

enum AssetOrder {
  url_ASC
  url_DESC
  size_ASC
  size_DESC
  contentType_ASC
  contentType_DESC
  fileName_ASC
  fileName_DESC
  width_ASC
  width_DESC
  height_ASC
  height_DESC
  sys_id_ASC
  sys_id_DESC
  sys_publishedAt_ASC
  sys_publishedAt_DESC
  sys_firstPublishedAt_ASC
  sys_firstPublishedAt_DESC
  sys_publishedVersion_ASC
  sys_publishedVersion_DESC
}

input CoachingAbleQuestionFilter {
  methodology: cfMethodologyNestedFilter
  methodologyCategory: cfMethodologyCategoryNestedFilter
  abilityTag: cfCoachingCategoryNestedFilter
  sys: SysFilter
  contentfulMetadata: ContentfulMetadataFilter
  question_exists: Boolean
  question: String
  question_not: String
  question_in: [String]
  question_not_in: [String]
  question_contains: String
  question_not_contains: String
  willingAble_exists: Boolean
  willingAble: String
  willingAble_not: String
  willingAble_in: [String]
  willingAble_not_in: [String]
  willingAble_contains: String
  willingAble_not_contains: String
  methodology_exists: Boolean
  methodologyCategory_exists: Boolean
  abilityTag_exists: Boolean
  businessUnitCollection_exists: Boolean
  isStarRating_exists: Boolean
  isStarRating: Boolean
  isStarRating_not: Boolean
  description_exists: Boolean
  description: String
  description_not: String
  description_in: [String]
  description_not_in: [String]
  description_contains: String
  description_not_contains: String
  OR: [CoachingAbleQuestionFilter]
  AND: [CoachingAbleQuestionFilter]
}

input cfMethodologyNestedFilter {
  sys: SysFilter
  contentfulMetadata: ContentfulMetadataFilter
  name_exists: Boolean
  name: String
  name_not: String
  name_in: [String]
  name_not_in: [String]
  name_contains: String
  name_not_contains: String
  icon_exists: Boolean
  isCoachingCertified_exists: Boolean
  isCoachingCertified: Boolean
  isCoachingCertified_not: Boolean
  isDMCertified_exists: Boolean
  isDMCertified: Boolean
  isDMCertified_not: Boolean
  description_exists: Boolean
  description: String
  description_not: String
  description_in: [String]
  description_not_in: [String]
  description_contains: String
  description_not_contains: String
  OR: [cfMethodologyNestedFilter]
  AND: [cfMethodologyNestedFilter]
}

input cfMethodologyCategoryNestedFilter {
  sys: SysFilter
  contentfulMetadata: ContentfulMetadataFilter
  name_exists: Boolean
  name: String
  name_not: String
  name_in: [String]
  name_not_in: [String]
  name_contains: String
  name_not_contains: String
  methodology_exists: Boolean
  description_exists: Boolean
  description: String
  description_not: String
  description_in: [String]
  description_not_in: [String]
  description_contains: String
  description_not_contains: String
  OR: [cfMethodologyCategoryNestedFilter]
  AND: [cfMethodologyCategoryNestedFilter]
}

input cfCoachingCategoryNestedFilter {
  sys: SysFilter
  contentfulMetadata: ContentfulMetadataFilter
  name_exists: Boolean
  name: String
  name_not: String
  name_in: [String]
  name_not_in: [String]
  name_contains: String
  name_not_contains: String
  methodology_exists: Boolean
  description_exists: Boolean
  description: String
  description_not: String
  description_in: [String]
  description_not_in: [String]
  description_contains: String
  description_not_contains: String
  OR: [cfCoachingCategoryNestedFilter]
  AND: [cfCoachingCategoryNestedFilter]
}

enum CoachingAbleQuestionOrder {
  question_ASC
  question_DESC
  willingAble_ASC
  willingAble_DESC
  isStarRating_ASC
  isStarRating_DESC
  sys_id_ASC
  sys_id_DESC
  sys_publishedAt_ASC
  sys_publishedAt_DESC
  sys_firstPublishedAt_ASC
  sys_firstPublishedAt_DESC
  sys_publishedVersion_ASC
  sys_publishedVersion_DESC
}

input CoachingCategoryFilter {
  methodology: cfMethodologyNestedFilter
  sys: SysFilter
  contentfulMetadata: ContentfulMetadataFilter
  name_exists: Boolean
  name: String
  name_not: String
  name_in: [String]
  name_not_in: [String]
  name_contains: String
  name_not_contains: String
  methodology_exists: Boolean
  description_exists: Boolean
  description: String
  description_not: String
  description_in: [String]
  description_not_in: [String]
  description_contains: String
  description_not_contains: String
  OR: [CoachingCategoryFilter]
  AND: [CoachingCategoryFilter]
}

enum CoachingCategoryOrder {
  name_ASC
  name_DESC
  sys_id_ASC
  sys_id_DESC
  sys_publishedAt_ASC
  sys_publishedAt_DESC
  sys_firstPublishedAt_ASC
  sys_firstPublishedAt_DESC
  sys_publishedVersion_ASC
  sys_publishedVersion_DESC
}

input MethodologyFilter {
  sys: SysFilter
  contentfulMetadata: ContentfulMetadataFilter
  name_exists: Boolean
  name: String
  name_not: String
  name_in: [String]
  name_not_in: [String]
  name_contains: String
  name_not_contains: String
  icon_exists: Boolean
  isCoachingCertified_exists: Boolean
  isCoachingCertified: Boolean
  isCoachingCertified_not: Boolean
  isDMCertified_exists: Boolean
  isDMCertified: Boolean
  isDMCertified_not: Boolean
  description_exists: Boolean
  description: String
  description_not: String
  description_in: [String]
  description_not_in: [String]
  description_contains: String
  description_not_contains: String
  OR: [MethodologyFilter]
  AND: [MethodologyFilter]
}

enum MethodologyOrder {
  name_ASC
  name_DESC
  isCoachingCertified_ASC
  isCoachingCertified_DESC
  isDMCertified_ASC
  isDMCertified_DESC
  sys_id_ASC
  sys_id_DESC
  sys_publishedAt_ASC
  sys_publishedAt_DESC
  sys_firstPublishedAt_ASC
  sys_firstPublishedAt_DESC
  sys_publishedVersion_ASC
  sys_publishedVersion_DESC
}

# Discovery Manager Question [See type definition](https://app.contentful.com/spaces/sv54roagnofr/content_types/dmQuestion)
type DmQuestion implements Entry {
  sys: Sys!
  contentfulMetadata: ContentfulMetadata!
  linkedFrom(allowedLocales: [String]): DmQuestionLinkingCollections
  name(locale: String): String
}

type DmQuestionLinkingCollections {
  entryCollection(
    skip: Int = 0
    limit: Int = 100
    preview: Boolean
    locale: String
  ): EntryCollection
}

type DmQuestionCollection {
  total: Int!
  skip: Int!
  limit: Int!
  items: [DmQuestion]!
}

input DmQuestionFilter {
  sys: SysFilter
  contentfulMetadata: ContentfulMetadataFilter
  name_exists: Boolean
  name: String
  name_not: String
  name_in: [String]
  name_not_in: [String]
  name_contains: String
  name_not_contains: String
  OR: [DmQuestionFilter]
  AND: [DmQuestionFilter]
}

enum DmQuestionOrder {
  name_ASC
  name_DESC
  sys_id_ASC
  sys_id_DESC
  sys_publishedAt_ASC
  sys_publishedAt_DESC
  sys_firstPublishedAt_ASC
  sys_firstPublishedAt_DESC
  sys_publishedVersion_ASC
  sys_publishedVersion_DESC
}

input MethodologyCategoryFilter {
  methodology: cfMethodologyNestedFilter
  sys: SysFilter
  contentfulMetadata: ContentfulMetadataFilter
  name_exists: Boolean
  name: String
  name_not: String
  name_in: [String]
  name_not_in: [String]
  name_contains: String
  name_not_contains: String
  methodology_exists: Boolean
  description_exists: Boolean
  description: String
  description_not: String
  description_in: [String]
  description_not_in: [String]
  description_contains: String
  description_not_contains: String
  OR: [MethodologyCategoryFilter]
  AND: [MethodologyCategoryFilter]
}

enum MethodologyCategoryOrder {
  name_ASC
  name_DESC
  sys_id_ASC
  sys_id_DESC
  sys_publishedAt_ASC
  sys_publishedAt_DESC
  sys_firstPublishedAt_ASC
  sys_firstPublishedAt_DESC
  sys_publishedVersion_ASC
  sys_publishedVersion_DESC
}

input CrmStageFilter {
  methodology: cfMethodologyNestedFilter
  sys: SysFilter
  contentfulMetadata: ContentfulMetadataFilter
  name_exists: Boolean
  name: String
  name_not: String
  name_in: [String]
  name_not_in: [String]
  name_contains: String
  name_not_contains: String
  methodology_exists: Boolean
  description_exists: Boolean
  description: String
  description_not: String
  description_in: [String]
  description_not_in: [String]
  description_contains: String
  description_not_contains: String
  OR: [CrmStageFilter]
  AND: [CrmStageFilter]
}

enum CrmStageOrder {
  name_ASC
  name_DESC
  sys_id_ASC
  sys_id_DESC
  sys_publishedAt_ASC
  sys_publishedAt_DESC
  sys_firstPublishedAt_ASC
  sys_firstPublishedAt_DESC
  sys_publishedVersion_ASC
  sys_publishedVersion_DESC
}

type BusinessUnitCollection {
  total: Int!
  skip: Int!
  limit: Int!
  items: [BusinessUnit]!
}

input BusinessUnitFilter {
  sys: SysFilter
  contentfulMetadata: ContentfulMetadataFilter
  name_exists: Boolean
  name: String
  name_not: String
  name_in: [String]
  name_not_in: [String]
  name_contains: String
  name_not_contains: String
  description_exists: Boolean
  description: String
  description_not: String
  description_in: [String]
  description_not_in: [String]
  description_contains: String
  description_not_contains: String
  OR: [BusinessUnitFilter]
  AND: [BusinessUnitFilter]
}

enum BusinessUnitOrder {
  name_ASC
  name_DESC
  sys_id_ASC
  sys_id_DESC
  sys_publishedAt_ASC
  sys_publishedAt_DESC
  sys_firstPublishedAt_ASC
  sys_firstPublishedAt_DESC
  sys_publishedVersion_ASC
  sys_publishedVersion_DESC
}

input EntryFilter {
  sys: SysFilter
  contentfulMetadata: ContentfulMetadataFilter
  OR: [EntryFilter]
  AND: [EntryFilter]
}

enum EntryOrder {
  sys_id_ASC
  sys_id_DESC
  sys_publishedAt_ASC
  sys_publishedAt_DESC
  sys_firstPublishedAt_ASC
  sys_firstPublishedAt_DESC
  sys_publishedVersion_ASC
  sys_publishedVersion_DESC
}
