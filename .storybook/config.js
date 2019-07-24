import React from 'react';
import { configure, addDecorator, load } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
// import centered from './decorators/centered';
import styled from './addons/styled/decorator';
import centered from './decorators/centered';

setOptions({
    name: 'Intellect Collective Component Library',
    url: 'https://github.io/intellectcollective/ui',
    // goFullScreen: false,
    // showLeftPanel: false,
    showDownPanel: true,
    // showSearchBox: false,
    // downPanelInRight: false,
    sortStoriesByKind: false,
});

addDecorator(centered);
addDecorator(styled);

load(require.context('../src', true, /\.stories\.(js|mdx)$/), module);