A lot of elements will support the following attributes:

- `size` (String) ('xsmall', 'small', 'medium/default', 'large', 'xlarge')
  Determines the size of the element. May accept other values than those listed, assuming the developer has updated the stylesheets accordingly
- `square` (Boolean) (true, false, undefined)
  Determines whether or not the element has border-radius. If undefined, defers to the global setting. If true, forces no border-radius. If false, forces border-radius
- `color` (String) ('primary', 'secondary', 'tertiary', 'error', 'warn', 'info', 'default')
  Determines the color of the element (and by default, the text color). May accept other values than those listed, assuming the developer has updated the stylesheets accordingly