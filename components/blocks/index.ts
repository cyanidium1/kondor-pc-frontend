import type { ComponentType } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { HeroWithBuild } from "./HeroWithBuild";
import { AnchorNav } from "./AnchorNav";
import { SpecsSystemRequirements } from "./SpecsSystemRequirements";
import { FpsTablePerGame } from "./FpsTablePerGame";
import { ProductRecommendedForGame } from "./ProductRecommendedForGame";
import { SpecsGraphicsSettings } from "./SpecsGraphicsSettings";
import { SocialTestimonialForGame } from "./SocialTestimonialForGame";
import { CtaWizardPrefilled } from "./CtaWizardPrefilled";
import { FaqAccordion } from "./FaqAccordion";
import { BuildCardSingle } from "./BuildCardSingle";
import { StatsStrip } from "./StatsStrip";
import { TextBlock } from "./TextBlock";
import { ImageTextSplit } from "./ImageTextSplit";
import { ImageFull } from "./ImageFull";
import { FeatureList } from "./FeatureList";
import { BuildsRow } from "./BuildsRow";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BLOCKS: Record<string, ComponentType<any>> = {
  breadcrumbs: Breadcrumbs,
  heroWithBuild: HeroWithBuild,
  anchorNav: AnchorNav,
  specsSystemRequirements: SpecsSystemRequirements,
  fpsTablePerGame: FpsTablePerGame,
  productRecommendedForGame: ProductRecommendedForGame,
  specsGraphicsSettings: SpecsGraphicsSettings,
  socialTestimonialForGame: SocialTestimonialForGame,
  ctaWizardPrefilled: CtaWizardPrefilled,
  faqAccordion: FaqAccordion,
  buildCardSingle: BuildCardSingle,
  statsStrip: StatsStrip,
  // content blocks (universal — work in any context)
  textBlock: TextBlock,
  imageTextSplit: ImageTextSplit,
  imageFull: ImageFull,
  featureList: FeatureList,
  buildsRow: BuildsRow,
};

export {
  Breadcrumbs,
  HeroWithBuild,
  AnchorNav,
  SpecsSystemRequirements,
  FpsTablePerGame,
  ProductRecommendedForGame,
  SpecsGraphicsSettings,
  SocialTestimonialForGame,
  CtaWizardPrefilled,
  FaqAccordion,
  BuildCardSingle,
  StatsStrip,
  TextBlock,
  ImageTextSplit,
  ImageFull,
  FeatureList,
  BuildsRow,
};
