import type { Game } from "./game";
import type { UseCase } from "./useCase";

export type Section = {
  _type: string;
  _key: string;
  [k: string]: unknown;
};

export type LandingPageContextRef = {
  refType: "game" | "event" | "use_case";
  refSlug: string;
};

export type LandingPage = {
  slug: string;
  type: "game" | "event" | "use_case";
  context: LandingPageContextRef;
  seo: { title: string; description: string; ogImage?: string };
  sections: Section[];
};

export type ResolvedPageContext = {
  refType: "game" | "event" | "use_case";
  refSlug: string;
  game?: Game;
  useCase?: UseCase;
  /** Human-readable name resolved from the underlying ref (game.nameUk / useCase.nameUk / refSlug). */
  displayName: string;
};
