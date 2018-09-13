import React from 'react';
import {
    Row
} from '../../../..';

describe('Row', () => {
    it('Can display', () => {
        const wrapper = mount(
            <Row>test</Row>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.row').exists()).toBe(true);
    });
    it('Can change classname', () => {
        const wrapper = mount(<Row className="my-row" />);
        expect(wrapper.find('.my-row').exists()).toBe(true);
    });
});
