import React from 'react';
import cartesian from 'storybook-cartesian';
import { storiesOf } from '@storybook/react';
import { Button } from '../..';

storiesOf('2 - Components / Form / Button', module)
    .add('Colors', () => (
    	<div>
    		<Button color="primary">Primary</Button>
    		<Button color="secondary">Secondary</Button>
    		<Button color="tertiary">Tertiary</Button>
    		<Button color="success">Success</Button>
    		<Button color="info">Info</Button>
    		<Button color="warning">Warning</Button>
    		<Button color="error">Error</Button>
    		<Button>Default</Button>
    	</div>
	))
	.add('Sizes', () => (
    	<div>
    		<Button size="xsmall">X-Small</Button>
    		<Button size="small">Small</Button>
    		<Button size="medium">Medium</Button>
    		<Button>Default</Button>
    		<Button size="large">Large</Button>
    		<Button size="xlarge">X-Large</Button>
    	</div>
	))
	.add('Shape', () => (
    	<div>
    		<Button>Default</Button>
    		<Button shape="square">Square</Button>
    		<Button shape="rounded">Rounded</Button>
    		<Button shape="circle">Circle</Button>
    	</div>
	))
	.add('Contents', () => (
    	<div>
    		<Button>Click Me</Button>
    		<Button>你好</Button>
    	</div>
	));
