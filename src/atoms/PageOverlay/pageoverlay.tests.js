import React from 'react';
import ReactDOM from 'react-dom';
import {
    PageOverlay
} from '../../..';

// NOTE: Because the Modal renders to a component outside the React tree, we
// don't have the opportunity to use Jest snapshots here :(

describe('PageOverlay', () => {
    it('Can display', () => {
        const wrapper = mount(<PageOverlay>test</PageOverlay>);
        expect(wrapper).toMatchSnapshot();
    });
    it('Can make visible', () => {
        const wrapper = mount(<PageOverlay visible>test</PageOverlay>);
        expect(wrapper).toMatchSnapshot();
    });
});
