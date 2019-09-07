import React from 'react';
import Content from '.';

describe('Content', () => {
    it('Can display', () => {
        const wrapper = mount(
            <Content>test</Content>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.card-body').exists()).toBe(true);
    });
    it('Can change classname', () => {
        const wrapper = mount(<Content className="my-card" />);
        expect(wrapper.find('.my-card').exists()).toBe(true);
    });
});
