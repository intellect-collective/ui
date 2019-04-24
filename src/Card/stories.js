import React from 'react';
import { storiesOf } from '@storybook/react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter
} from '../..';

storiesOf('Card', module)
    .add('default', () => (
        <div style={{ background: '#179aa3', padding: '5em' }}>
            <Card>
                <CardHeader title="Clicks" />
                <CardBody>
                    <h1 className="no-margins">28, 174</h1>
                </CardBody>
                <CardFooter>
                    <small>Compared to last month +16%</small>
                </CardFooter>
            </Card>
        </div>
    ));
