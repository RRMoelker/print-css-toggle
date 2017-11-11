# print CSS toggle - Simulate print CSS media using JavaScript.

JavaScript functionality to enable print based CSS rules and external stylesheets.
Any screen media style rules are disabled.

Useful for previewing print layout and for reviewing end-to-end test print screenshots.

Note if you are developing a print styling your browser will likely also support print media emulation.

# Example

![Example showing print CSS simulation](https://github.com/RRMoelker/print-css-toggle-example/raw/master/print-css-toggle-example.gif)

See https://github.com/RRMoelker/print-css-toggle-example

# Install

Currently the package is not on npm, so install using remote URL or `npm install` cloned directory.

# Usage

Import

```
import { simulatePrintMedia, restoreScreenMedia } from 'print-css-toggle';
```

Activate print media simulation:

```
simulatePrintMedia();
```

And restore when done:
```
restoreScreenMedia()
```


# Applications

Simulating print media does the following:
* Enables `<link rel="stylesheet" href="print.css" media="print">`
* Enables `@media print { ... }`
* Disables `<link rel="stylesheet" href="screen.css" media="screen">`
* Disables`@media screen { ... }`

# Limitations

Many media queries are not yet simulated.
Technically simulating print media for these situations should be possible.
It is rather a question of time and effort.

Currently does not support stylesheets/rules of the following form:

## Embedded CSS
```
<html><head>
<style media="print">
...
</style>
</head></html>

```

## Embedded print media query
```
<html><head>
<style">
@media print { ... }
</style>
</head></html>

```

## Any import based styling

CSS imports are not traversed.
Meaning any rules in the imported sheet will not be simulated.

```
@import "moreStyling.css";
```

# Improvements

Lots can be improved, notably:

* Code cleanup
* Linting
* Testing
* Singular method of restoring (using mix of rules stored in memory and linked stylesheet objects flagged)
* Practical example with automatic screenshot

