export default (arr = [], value) => {
    const result = [...arr];
    if (result.indexOf(value) === -1) {
        result.push(value);
    }
    return result;
};
