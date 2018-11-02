import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './index';

storiesOf('Atoms / Forms / Button', module)
	.add('button element', () => (
		<div>
			<Button className="btn">Default</Button>
			<Button className="btn btn-primary">btn-primary</Button>
			<Button className="btn btn-success">btn-success</Button>
			<Button className="btn btn-info">btn-info</Button>
			<Button className="btn btn-warning">btn-warning</Button>
			<Button className="btn btn-danger">btn-danger</Button>
		</div>
	))
	.add('other elements', () => (
		<div>
			<a className="btn btn-primary" href="#" role="button">Link</a>
			<button className="btn btn-primary" type="submit">Button</button>
			<input className="btn btn-primary" type="button" value="Input" />
			<input className="btn btn-primary" type="submit" value="Submit" />
			<input className="btn btn-primary" type="reset" value="Reset" />
		</div>
	))
	.add('outline', () => (
		<div>
			<button type="button" class="btn btn-primary btn-outline">btn-outline-primary</button>
			<button type="button" class="btn btn-success btn-outline">btn-outline-success</button>
			<button type="button" class="btn btn-info btn-outline">btn-outline-info</button>
			<button type="button" class="btn btn-warning btn-outline">btn-outline-warning</button>
			<button type="button" class="btn btn-danger btn-outline">btn-outline-danger</button>
		</div>
	));
