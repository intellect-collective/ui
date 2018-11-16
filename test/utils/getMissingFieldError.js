export default (name) => (
    new RegExp(`Warning: Failed prop type: The prop \`${ name }\` is marked as required *`)
);
