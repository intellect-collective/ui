import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import LoadingButton from './index';

storiesOf('2 - Components / Form / LoadingButton', module)
    .add('default', withState()(({ store }) => {
        const handler = () => {
            onChange('loading', true);
            setTimeout(() => { store.set({ loading: false }); }, 1000);
        };
        return (<LoadingButton type="submit" name="test-button-1" onClick={ handler } className="btn" loading={ store.state.loading }>Test</LoadingButton>);
    }));
