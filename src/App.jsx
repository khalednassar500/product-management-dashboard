import React, { useState, useMemo } from "react";
import List from "./components/List/List";
import ColumnSelector from "./components/ColumnSelector/ColumnSelector";
import SearchFilter from "./components/SearchFilter/SearchFilter";
import Loading from "./components/Loading/Loading";
import { useProducts } from "./hooks/useProducts";
import { filterProducts, sortProducts } from "./utils/helpers";
import "./App.css";

const App = () => {
  const { products, loading, error, updateProduct } = useProducts();
  const [visibleColumns, setVisibleColumns] = useState([
    "title",
    "category",
    "price",
    "rating",
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "title",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleDataUpdate = (productId, field, newValue) => {
    updateProduct(productId, field, newValue);
  };

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];
    return ["all", ...uniqueCategories];
  }, [products]);

  const processedProducts = useMemo(() => {
    let filtered = filterProducts(products, searchTerm, selectedCategory);
    filtered = sortProducts(filtered, sortConfig);
    return filtered;
  }, [products, searchTerm, selectedCategory, sortConfig]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [processedProducts, currentPage]);

  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);

  const columns = {
    id: {
      header: "ID",
      render: (item) => item.id,
      sortable: true,
      editable: false,
    },
    title: {
      header: "Title",
      render: (item) => item.title,
      sortable: true,
      editable: true,
    },
    price: {
      header: "Price",
      render: (item) => `$${item.price}`,
      sortable: true,
      editable: true,
    },
    category: {
      header: "Category",
      render: (item) => item.category,
      sortable: true,
      editable: true,
    },
    description: {
      header: "Description",
      render: (item) => item.description.substring(0, 50) + "...",
      editable: true,
    },
    rating: {
      header: "Rating",
      render: (item) => (
        <div>
          <div>Rate: {item.rating.rate}</div>
          <div>Count: {item.rating.count}</div>
        </div>
      ),
      sortable: true,
      editable: false,
    },
    image: {
      header: "Image",
      render: (item) => (
        <img
          src={item.image}
          alt={item.title}
          className="w-12 h-12 object-contain"
        />
      ),
      editable: false,
    },
  };

  if (loading) return <Loading />;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Product Management Dashboard</h1>
        <p>Total Products: {processedProducts.length}</p>
        <div className="edit-instructions">
          💡 Click on any editable cell (with pencil icon) to edit
        </div>
      </header>

      <div className="dashboard-controls">
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        <ColumnSelector
          columns={columns}
          visibleColumns={visibleColumns}
          onVisibleColumnsChange={setVisibleColumns}
        />
      </div>

      <List
        data={paginatedProducts}
        columns={columns}
        visibleColumns={visibleColumns}
        sortConfig={sortConfig}
        onSort={setSortConfig}
        onDataUpdate={handleDataUpdate}
      />

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
