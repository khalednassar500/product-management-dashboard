export const filterProducts = (products, searchTerm, category) => {
  return products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory = category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });
};

export const sortProducts = (products, sortConfig) => {
  if (!sortConfig.key) return products;

  return [...products].sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (sortConfig.key === "rating") {
      aValue = a.rating.rate;
      bValue = b.rating.rate;
    }

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
};
