import React from 'react';
import { storiesOf } from '@storybook/react';
import {
    Container,
    Row,
    Column
} from '../..';

storiesOf('Grid', module)
    .add('default', () => (
        <div>
            <style type="text/css"
                    dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
                        __html: `
                .show-grid [class^="col-"] {
                    padding-top: 10px;
                    padding-bottom: 10px;
                    background-color: #eee;
                    border: 1px solid #ddd;
                }
            `
                    }} />
            <Container className="container show-grid">
                <Row>
                    <Column width="1">1</Column>
                    <Column width="1">1</Column>
                    <Column width="1">1</Column>
                    <Column width="1">1</Column>
                    <Column width="1">1</Column>
                    <Column width="1">1</Column>
                    <Column width="1">1</Column>
                    <Column width="1">1</Column>
                    <Column width="1">1</Column>
                    <Column width="1">1</Column>
                    <Column width="1">1</Column>
                    <Column width="1">1</Column>
                </Row>
                <Row>
                    <Column width="8">8</Column>
                    <Column width="4">4</Column>
                </Row>
                <Row>
                    <Column width="4">4</Column>
                    <Column width="4">4</Column>
                    <Column width="4">4</Column>
                </Row>
                <Row>
                    <Column width="6">6</Column>
                    <Column width="6">6</Column>
                </Row>
            </Container>
        </div>
    ));
