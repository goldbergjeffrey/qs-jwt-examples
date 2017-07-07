# qs-jwt-examples
Examples of JSON web token authentication with Qlik Sense Enterprise / QAP.

## Requirements

* Node.js
* Qlik Sense Enterprise or QAP: June2017 release

## Helpful

* a domain that can be used by the mashup server (node) and the Qlik Sense Server.  This helps resolve cross-origin scripting issues and see the cookie in dev tools.  If it's possible to succeed where each server has it's own domain, please educate me by leaving a message on the issues page.

* The Consumer Goods Sales app is included with this repository for the purpose of demonstrating mashup functionality with jwt tokens.  Import is required only if you intend to use the mashup example as written and Consumer Goods Sales app is not already imported to Qlik Sense server.  The app is located in the qlik-apps folder.

* See below for instructions on how to set up and configure a virtual proxy for json web tokens.

## [JWT Virtual Proxy Configuration](docs/vpconfig.md)

Currently, only Node examples are built, but will build out for other languages as time goes on.  The premise will be the same.

## [Node Examples](docs/node-examples.md)

## License == MIT