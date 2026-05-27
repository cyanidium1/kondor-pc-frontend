"use client";
/**
 * Items-per-page used by the blog list paginator.
 * Ported from nbyg-front — preserve API & breakpoints.
 */
import { useState, useEffect } from "react";

export const useBlogArticlesPerPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(12);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  return itemsPerPage;
};
