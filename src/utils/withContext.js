import React from 'react';

export default (Context) => (Wrapped) => {
    const WithContext = (props) => (
        <Context.Consumer>
            { (ctx) => (<Wrapped { ...props } context={ ctx } />) }
        </Context.Consumer>
    );
    WithContext.displayName = 'WithContext';
    return WithContext;
};
