export default function getSort (sort) {
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
