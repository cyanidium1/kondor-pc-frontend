import type { Game } from "../../types/game";

export const cs2: Game = {
  slug: "cs2",
  nameUk: "Counter-Strike 2",
  nameEn: "Counter-Strike 2",
  heroImage: "/games/cs2-hero.jpg",
  officialUrl: "https://www.counter-strike.net/cs2",
  minSpecs: {
    cpu: "Intel Core i5-750 / AMD Phenom II X4 965",
    gpu: "NVIDIA GeForce GTX 660 / AMD Radeon HD 5700 (1 GB VRAM)",
    ram: "8 GB",
    storage: "85 GB",
  },
  recSpecs: {
    cpu: "Intel Core i5-10600K / AMD Ryzen 5 5600X",
    gpu: "NVIDIA RTX 3060 / AMD RX 6600 XT",
    ram: "16 GB DDR4",
    storage: "85 GB NVMe SSD",
  },
  competitiveSpecs: {
    cpu: "Intel Core i7-13700K / AMD Ryzen 7 7800X3D",
    gpu: "NVIDIA RTX 4070 / RTX 5060 Ti",
    ram: "32 GB DDR5 6000",
    storage: "NVMe Gen4 SSD",
  },
  graphicsSettings: [
    {
      name: "Загальна якість тіней",
      low: "Низькі",
      medium: "Середні",
      high: "Високі",
      ultra: "Дуже високі",
      fpsImpact: "-15 FPS на ultra",
    },
    {
      name: "Деталізація моделей",
      low: "Низька",
      medium: "Середня",
      high: "Висока",
      ultra: "Дуже висока",
    },
    {
      name: "Згладжування MSAA",
      low: "Вимкнено",
      medium: "2x",
      high: "4x",
      ultra: "8x",
      fpsImpact: "-30 FPS на 8x",
    },
    {
      name: "Анізотропна фільтрація",
      low: "Білінійна",
      medium: "2x",
      high: "8x",
      ultra: "16x",
    },
    {
      name: "Ефекти частинок",
      low: "Низькі",
      medium: "Середні",
      high: "Високі",
      ultra: "Дуже високі",
    },
  ],
  tags: ["fps", "esports", "competitive", "multiplayer"],
};
