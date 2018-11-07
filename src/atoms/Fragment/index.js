import React from 'react';

const Fragment = React.Fragment || class Pure extends React.PureComponent {
    static propTypes = {
        children: React.node
    };

    render() {
        return this.props.children;
    }
};

export default Fragment;
