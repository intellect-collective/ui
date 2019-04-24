import React from 'react';
import {
    Container
} from '../..';

describe('Container', () => {
    it('Can display', () => {
        const wrapper = mount(
            <Container>test</Container>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.container').exists()).toBe(true);
    });
    it('Can change classname', () => {
        const wrapper = mount(<Container className="my-container" />);
        expect(wrapper.find('.my-container').exists()).toBe(true);
    });
});
