export const getFilterObjectFromQuery = (searchParams) => {
    const filter = {};

    const category = searchParams.get('category');
    if (category) {
        filter.category = category.split(',');
    }

    const type = searchParams.get('type');
    if (type) {
        filter.type = type.split(',');
    }

    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');
    if (priceMin && priceMax) {
        filter.priceRange = [Number(priceMin), Number(priceMax)];
    }

    const sortAsc = searchParams.get('sortAsc');
    if (sortAsc !== null) {
        filter.sortAsc = sortAsc === 'true';
    }

    const sortBy = searchParams.get('sortBy');
    if (sortBy) {
        filter.sortBy = sortBy;
    }

    const rows = searchParams.get('rows');
    if (rows) {
        filter.rows = Number(rows);
    }

    return filter;
};

export const getUniqueFilters = (products) => {
    const uniqueFilters = {
        category: [],
        type: [],
    };

    products?.forEach(product => {
        if (product.category && !uniqueFilters.category.includes(product.category)) {
            uniqueFilters.category.push(product.category);
        }
        if (product.subCategory && !uniqueFilters.type.includes(product.subCategory)) {
            uniqueFilters.type.push(product.subCategory);
        }
    });

    return uniqueFilters;
}

export const getFilteredProducts = (products, filter) => {
    let filtered = [...products];

    if (filter.category && filter.category.length > 0) {
        filtered = filtered.filter(product => filter.category.includes(product.category));
    }

    if (filter.type && filter.type.length > 0) {
        filtered = filtered.filter(product => filter.type.includes(product.subCategory));
    }

    if (filter.sortBy === 'price') {
        filtered.sort((a, b) => filter.sortAsc ? a.price - b.price : b.price - a.price);
    }
    if (filter.priceRange && Array.isArray(filter.priceRange) && filter.priceRange.length === 2) {
        const [minPrice, maxPrice] = filter.priceRange;
        filtered = filtered.filter(product => {
            const productPrice = Number(product.price);
            return productPrice >= minPrice && productPrice <= maxPrice;
        });
    }
    if (filter.priceRange && Array.isArray(filter.priceRange) && filter.priceRange.length === 2) {
        const [minPrice, maxPrice] = filter.priceRange;
        filtered = filtered.filter(product => {
            const productPrice = Number(product.price);
            return productPrice >= minPrice && productPrice <= maxPrice;
        });
    }


    return filtered;
}