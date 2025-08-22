"use client";

import { useTranslations } from "next-intl";
import React from "react";
import { ChangeEvent } from "react";

type FiltersBarProps = {
  // değerler
  selectedCategory: string;
  sortBy: "none" | "price-asc" | "price-desc";
  minPrice: string;
  maxPrice: string;

  // event'ler
  onCategoryChange: (value: string) => void;
  onSortChange: (value: "none" | "price-asc" | "price-desc") => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;

  // kategori
  categories: string[];
};

const FiltersBar = ({
  selectedCategory,
  sortBy,
  minPrice,
  maxPrice,
  onCategoryChange,
  onSortChange,
  onMinPriceChange,
  onMaxPriceChange,
  categories,
}: FiltersBarProps) => {
  const t = useTranslations("project");

  return (
    <div className="w-full bg-white/80 border border-gray-200 rounded-lg p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      {/* Kategori */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600 min-w-[90px]">
          {t("filter.category")}
        </label>
        <select
          className="border rounded-md px-3 py-2 text-sm"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="all">{t("filter.all")}</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Sıralama */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600 min-w-[90px]">
          {t("filter.arrangement")}
        </label>
        <select
          className="border rounded-md px-3 py-2 text-sm"
          value={sortBy}
          onChange={(e) =>
            onSortChange(e.target.value as "none" | "price-asc" | "price-desc")
          }
        >
          <option value="none">{t("filter.default")}</option>
          <option value="price-asc">{t("filter.price_ascending")}</option>
          <option value="price-desc">{t("filter.price_descending")}</option>
        </select>
      </div>

      {/* Fiyat aralığı */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600 min-w-[90px]">
          {t("filter.price")}
        </label>
        <input
          type="number"
          inputMode="decimal"
          placeholder="Min"
          className="w-24 border rounded-md px-3 py-2 text-sm"
          value={minPrice}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onMinPriceChange(e.target.value)
          }
        />
        <span className="text-gray-400">—</span>
        <input
          type="number"
          inputMode="decimal"
          placeholder="Max"
          className="w-24 border rounded-md px-3 py-2 text-sm"
          value={maxPrice}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onMaxPriceChange(e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default FiltersBar;
