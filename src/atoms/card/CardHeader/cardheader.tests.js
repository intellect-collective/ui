import React from 'react';
import {
    CardHeader
} from '../../../..';

describe('CardHeader', () => {
    it('Can display', () => {
        const wrapper = mount(
            <CardHeader title="Test" />
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.card-header').exists()).toBe(true);
    });
    it('Can change classname', () => {
        const wrapper = mount(<CardHeader title="Test" className="my-card" />);
        expect(wrapper.find('.my-card').exists()).toBe(true);
    });
});
