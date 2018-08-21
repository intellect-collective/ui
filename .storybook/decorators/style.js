import React from 'react';

export default (style) => (story) => (
    <div className="style-wrapper">
        <style type="text/css" dangerouslySetInnerHTML={{ __html: style }} />
        { story() }
    </div>
);