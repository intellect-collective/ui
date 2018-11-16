export default (Component) => {
    if (Component.Wrapped) {
        return Component.Wrapped;
    }
    return Component;
};
