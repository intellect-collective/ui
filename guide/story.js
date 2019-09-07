import React from 'react';
import { storiesOf } from '@storybook/react';

const getCssVarValue = (name) => {
	return getComputedStyle(document.documentElement).getPropertyValue(name);
}

const Swatch = ({ name }) => (
	<div style={{ display: 'inline-block' }}>
		<div style={{ height: '100px', width: '100px', background: `var(--color-${ name })`, display: 'flex', alignItems: 'bottom' }}>
			<div style={{ height: '25%', width: '50%', background: `var(--color-${ name }-light)`, alignSelf: 'flex-end', border: '1px solid white' }} />
			<div style={{ height: '25%', width: '50%', background: `var(--color-${ name }-dark)`, alignSelf: 'flex-end', border: '1px solid white' }} />
		</div>
		<dl>
			<dt>CSS</dt>
			<dd>--color-{ name }</dd>
			<dt>SCSS</dt>
			<dd>$color-{ name }</dd>
			<dt>HEX</dt>
			<dd>{ getCssVarValue(`--color-${ name }`) }</dd>
		</dl>
	</div>
);

storiesOf('Guide', module)
	.add('General', () => (
		<div>
			<div className="row">
				<div className="col col-md-7">
					<h2>Color Palette <span className="section-number">01</span></h2>

					<Swatch name="default" />
					<Swatch name="primary" />
					<Swatch name="secondary" />
					<Swatch name="tertiary" />
				</div>
				<div className="col col-md-5">
					<h2>Typography <span className="section-number">02</span></h2>
				</div>
			</div>
		</div>
	));
