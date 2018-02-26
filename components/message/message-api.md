<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [MESSAGE_DEFAULTS](#message_defaults)
-   [About](#about)
-   [destroy](#destroy)

## MESSAGE_DEFAULTS

**Properties**

-   `title` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Title text or content shown in the message
-   `isError` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** If true, will show title styled as an error with an error icon
-   `message` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The message content or text
-   `width` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Pass a specific with or defaults to auto
-   `buttons` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Array of buttons to add to the message (see modal examples as well)
-   `cssClass` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Extra Class to add to the dialog for customization.
-   `returnFocus` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** JQuery Element selector to focus on return

## About

The Message Component is used to show warning / error messages.

**Parameters**

-   `element` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The component element.
-   `settings` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The component settings.

## destroy

Tear Down and destroy events. However the message will destroy itself on close.