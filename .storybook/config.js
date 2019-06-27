import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
// import centered from './decorators/centered';
import styled from './decorators/styled';
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

const guide = require.context('../guide', true, /stories\.js$/);
const src = require.context('../src', true, /stories\.js$/);

function loadStories() {
    guide.keys()
        .forEach((filename) => guide(filename));
    src.keys()
        .forEach((filename) => src(filename));
}

configure(loadStories, module);