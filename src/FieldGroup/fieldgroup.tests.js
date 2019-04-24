import React from 'react';
import { FieldGroup, Text } from '../..';

describe('Form Components - FieldGroup', () => {
    it('Can render with string wrapper', () => {
        const wrapper = mount(
            <FieldGroup name="test" wrapper="div">
                <Text />
            </FieldGroup>
        );
        expect(wrapper.find('div').length).toEqual(1);
        expect(wrapper.find('div').props()).toMatchObject({
            role: 'group'
        });
    });
});
