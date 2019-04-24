import React from 'react';
import { storiesOf } from '@storybook/react';
import stateful from '../../.storybook/decorators/stateful';
import LoadingButton from './index';

storiesOf('LoadingButton', module)
    .addDecorator(stateful())
    .add('default', () => (onChange, state) => {
        const handler = () => {
            onChange('loading', true);
            setTimeout(() => { onChange('loading', false); }, 1000);
        };
        return (<LoadingButton type="submit" name="test-button-1" onClick={ handler } className="btn" loading={ state.loading }>Test</LoadingButton>);
    });
