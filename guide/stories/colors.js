import React from 'react';
import Swatch from '../../src/Swatch';

const DefaultSwatch = ({ name }) => (
	<Swatch color={ `var(--color-${ name })` }>
		<ul className="no-padding no-margin no-list">
			<li>{ getComputedStyle(document.documentElement).getPropertyValue(`--color-${ name }`) }</li>
			<li><small>$color-{ name }</small></li>
		</ul>
	</Swatch>
);

export default () => (
    <div>
    	<h2>Colors</h2>
    	<p>Most colors have the same meaning for users the world around, but subtle differences in culture and locale mean differences in understanding.Always strive to avide by generally-accepted and well-established conventions, explained later in this section.</p>

    	<h3>Brand Colors</h3>
    	<p>Brand colors draw the user's attention to elements of importance, and serve to create a contrast between both the background, as well as the general content. Because most of our page is one color (usually white), the contrast creates attention. Avoid harsh colors, and strive for complementary colors, especially triads or tetrads.</p>

    	<DefaultSwatch name="primary" />
    	<DefaultSwatch name="secondary" />
    	<DefaultSwatch name="tertiary" />
    	<DefaultSwatch name="default" />

    	<h3>Shades</h3>

    	<h4>Default</h4>
    	{
    		[...Array(9)].map((key, i) => (
    			<DefaultSwatch name={ `default-${ (i + 1) * 10 }`} />
			))
    	}
    	<h4>Primary</h4>
    	{
    		[...Array(9)].map((key, i) => (
    			<DefaultSwatch name={ `primary-${ (i + 1) * 10 }`} />
			))
    	}
    	<h4>Secondary</h4>
    	{
    		[...Array(9)].map((key, i) => (
    			<DefaultSwatch name={ `secondary-${ (i + 1) * 10 }`} />
			))
    	}
    	<h4>Tertiary</h4>
    	{
    		[...Array(9)].map((key, i) => (
    			<DefaultSwatch name={ `tertiary-${ (i + 1) * 10 }`} />
			))
    	}
    </div>
);