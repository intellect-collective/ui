import { document } from 'global';
import React, { Component, ReactNode } from 'react';
import { styled } from '@storybook/theming';
import { EVENTS } from './constants';

import { logger } from '@storybook/client-logger';
import { Icons, IconButton, WithTooltip, TooltipLinkList } from '@storybook/components';
import addons from '@storybook/addons';

const styles = ['primary', 'secondary'];

const getSheetList = (active, set) => ([
    ...(
        active !== null
        ? [
            {
                id: 'reset',
                title: 'Reset styles',
                onClick: () => {
                    set(null);
                },
                right: undefined,
                active: false,
                loading: undefined,
            },
        ]
        : []
    ),
    ...styles.map((name) => ({
        id: name,
        title: name.charAt(0).toUpperCase() + name.slice(1),
        onClick: () => {
            set(name);
        },
        right: undefined,
        active: active === name,
        loading: undefined,
    })),
]);

export class StyleChooser extends React.Component {
    state = {
        active: 'primary'
    };

    constructor() {
        super();
        addons.getChannel().emit(EVENTS.UPDATE, 'primary');
    }

    setActive(active) {
        addons.getChannel().emit(EVENTS.UPDATE, active);
        this.setState({ active });
    };

    render() {
        const { active } = this.state;

        return (
            <WithTooltip placement="top"
                    trigger="click"
                    tooltip={({ onHide }) => {
                        const colorList = getSheetList(active, (i) => {
                            this.setActive(i);
                            onHide();
                        });
                        return <TooltipLinkList links={ colorList } />;
                    }}
                    closeOnClick
                    onDoubleClick={() => this.setActive(null)}>
                <IconButton key="filter" title="Styling">
                    <Icons icon="paintbrush" />
                </IconButton>
            </WithTooltip>
        );
    }
}