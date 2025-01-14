export const getFilterObjectFromQuery = (searchParams) => {
    let processedFilter = {
        category: [],
        type: [],
        sortAsc: true,
        sortBy: 'relevant',
        rows: 8,
    };

    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const sortAsc = searchParams.get('sortAsc');
    const sortBy = searchParams.get('sortBy');
    const rows = searchParams.get('rows');

    if (category) {
        processedFilter.category = category.split(',').filter(cat => cat);
    }

    if (type) {
        processedFilter.type = type.split(',').filter(sub => sub);
    }

    if (sortAsc !== null) {
        processedFilter.sortAsc = sortAsc === 'true';
    }

    if (sortBy) {
        processedFilter.sortBy = sortBy;
    }

    if (rows) {
        const parsedRows = parseInt(rows, 10);
        if (!isNaN(parsedRows)) {
            processedFilter.rows = parsedRows;
        }
    }

    return processedFilter;
}

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

    return filtered;
}