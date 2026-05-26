import { getAddonItems } from "@/lib/sanity/fetchers";
import { groupProducts } from "@/lib/catalog/group";
import { CatalogCard } from "./CatalogCard";
import { AccessoriesRailMobileSlider } from "./AccessoriesRailMobileSlider";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { TechButtonLink } from "../shared/TechButton";
import ArrowIcon from "../icons/ArrowIcon";

/**
 * Server component — fetches the global `showonaddons` pool from Sanity
 * and renders a 4-up grid. Mirrors legacy Kondor Devices behavior:
 * "accessories" is a single curated pool, not per-PC references.
 */
export async function AccessoriesRail({
  title = "Зібрати з ПК",
  subtitle = "Аксесуари під твоє робоче місце — клавіатура, миша, поверхня.",
  limit = 4,
}: {
  title?: string;
  subtitle?: string;
  limit?: number;
}) {
  const addons = await getAddonItems();
  if (!addons || addons.length === 0) return null;

  // Grouping here collapses admin duplicates (same product sold as two rows)
  // so the rail shows distinct products, not the same thing twice.
  const groups = groupProducts(addons).slice(0, limit);

  return (
    <section className="pb-24 lg:pb-30">
      <div className="container-site">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            kicker="Аксесуари"
            title={title}
            subtitle={subtitle}
            className="mb-8"
            titleClassName="mt-3 lg:mt-7 mb-5 lg:mb-10 lg:text-[36px]"
            subtitleClassName="lg:max-w-[556px]"
          />
          <TechButtonLink
            href="/catalog"
            variant="white"
            className="w-full md:w-fit md:ml-auto h-[30px]"
          >
            <span className="inline-flex items-center gap-2 whitespace-nowrap font-heading">
              Весь каталог
              <ArrowIcon className="mb-0.5" />
            </span>
          </TechButtonLink>
        </div>

        <AccessoriesRailMobileSlider groups={groups} />

        <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) => (
            <CatalogCard key={group.key} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
