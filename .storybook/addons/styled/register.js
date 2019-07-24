import React from 'react';
import { addons, types } from '@storybook/addons';
import { ADDON_ID, PANEL_ID } from './constants';
import { StyleChooser } from './StyleChooser';

addons.register(ADDON_ID, api => {
    addons.add(PANEL_ID, {
        title: '',
        type: types.TOOL,
        match: ({ viewMode }) => viewMode === 'story',
        render: () => (<StyleChooser api={ api } />),
    });
});
