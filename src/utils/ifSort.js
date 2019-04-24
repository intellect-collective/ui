import getSort from './getSort';

export default function ifSort(col, sort, ascending, descending, unsorted) {
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
