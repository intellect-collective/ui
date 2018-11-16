export default (name) => (
    new RegExp(`Warning: Failed prop type: Invalid prop \`${ name }\`*`)
);
