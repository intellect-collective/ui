# UI Components #

[![Build Status](https://travis-ci.org/intellect-collective/ui.svg?branch=master)](https://travis-ci.org/intellect-collective/ui) [![Coverage Status](https://coveralls.io/repos/github/intellect-collective/ui/badge.svg?branch=master)](https://coveralls.io/github/intellect-collective/ui?branch=master)

Provides a uniform set of UI components that may be used to provided a consistent user experience across an application. Used and maintained by the Intellect Collective for their projects, and made freely available to the public.


## Overview ##

This project is motivated by the need for a consistent interface across various projects, which supports simple theming. It is a living compendium of elements which are specifically designed to interact well with each other. We have the following goals:

* Simple usage
* Simple theming
* Consistent design and architecture
* Complete test suite
* Decent documentation
* Server-side-rendering compatible
* Align with [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) as much as possible
* Support IE8, and the last three versions of all other major browsers


## Components ##

Currently we support the following sets of components:

### Form ###

| Field        | Handler  |
| ------------ | -------- |
| Button       | onClick  |
| Checkbox     | onClick  |
| Date         | onChange |
| File         | onChange |
| Hidden       | -        |
| Password     | onChange |
| Radio        | onClick  |
| ResetButton  | onClick  |
| Select       | onChange |
| SubmitButton | onClick  |
| Text         | onChange |
| Textarea     | onChange |

All event handlers receive the event that resulted in the invocation as the sole argument.


The form components work by using React's context functionality to retrieve information from ancestral context providers, such as forms or field groups. You do not need to compute state for the individual form components, as all that state exists in the top-level form and intermediate-level field groups. Consider the following:

```js
import { Checkbox, Field, Form, Text } from '@intellectcollective/ui';

const data = {
    name: 'John Smith',
    preferences: ['sausages', 'hotdogs']
}

return (
    <Form action="/preferences" method="post" data={ data }>
        <Field name="name" label="Name" component={ Text } />

        <FieldGroup name="preferences" multiple>
            <Field label="Sausages" component={ Checkbox } value="sausages" />
            <Field label="Hotdogs" component={ Checkbox } value="hotdogs" />
            <Field label="Burgers" component={ Checkbox } value="burgers" />
        </FieldGroup>
    </Form>
);
```

When you supply the data property, all that information is made available to the form components contained within the form. In the above example, the `name` field would be pre-populated with "John Smith" and the "sausages" and "hotdogs" checkboxes would be pre-checked.