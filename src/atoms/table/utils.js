export const getSort = (sort) => {
    if (!sort || sort === '') {
        return [undefined, undefined];
    }

    if (sort.charAt(0) === '-') {
        return [sort.substr(1), '-'];
    }

    if (sort.charAt(0) === '+') {
        return [sort.substr(1), '+'];
    }

    return [sort, '+'];
};

export const ifSort = (col, sort, ascending, descending, unsorted) => {
    const [sortcol, dir] = getSort(sort);
    if (sortcol !== col) {
        return unsorted;
    }
    if (dir === '+') {
        return ascending;
    }
    if (dir === '-') {
        return descending;
    }
    return unsorted;
};
