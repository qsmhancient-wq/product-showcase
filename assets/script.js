// 讀取 products.json
fetch("products.json")
  .then((res) => res.json())
  .then((products) => {
    const productList = document.getElementById("product-list");
    const searchBox = document.getElementById("search-box");
    const categoryFilter = document.getElementById("category-filter");

    let filteredProducts = products;

    // 取出所有分類
    const categories = ["全部", ...new Set(products.map((p) => p.category))];

    // 產生分類按鈕
    categories.forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    });

    // 渲染商品
    function renderProducts() {
      productList.innerHTML = "";
      filteredProducts.forEach((item) => {
        const card = document.createElement("div");
        card.className = "product-card";

        const imgSrc = item.image || "https://via.placeholder.com/200x180?text=No+Image";

        card.innerHTML = `
          <img src="${imgSrc}" alt="${item.name}" />
          <div class="info">
            <h3>${item.name}</h3>
            <div class="category">分類：${item.category}</div>
            <div class="price">價格：${item.price} 元</div>
            <div class="desc">${item.description}</div>
          </div>
        `;
        productList.appendChild(card);
      });
    }

    // 搜尋
    function doSearch() {
      const q = searchBox.value.trim().toLowerCase();
      const cat = categoryFilter.value;

      filteredProducts = products.filter((p) => {
        const matchesText = q === "" || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
        const matchesCategory = cat === "全部" || p.category === cat;
        return matchesText && matchesCategory;
      });
      renderProducts();
    }

    searchBox.addEventListener("input", doSearch);
    categoryFilter.addEventListener("change", doSearch);

    // 初始渲染
    renderProducts();
  })
  .catch((err) => {
    console.error("讀取商品資料錯誤", err);
  });