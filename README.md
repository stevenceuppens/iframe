# iFrame test

## Prerequirements

- nodejs & npm - https://nodejs.org

## Install

Clone project
```bash
$ git clone https://github.com/stevenceuppens/iframe.git
```

Root directory
```bash
$ cd iframe
```

Install required modules
```bash
$ npm install
```

## Run Example

```bash
$ npm run-script run
```

## Description

- The "RootApp" loads 6 different iFrames
- All iFrames are configured differently
- All iFrames load exactly the same content

iFrame configurations:

- iFrame1: No Cross Origin, No Sandbox
- iFrame1: No Cross Origin, Sandbox
- iFrame1: No Cross Origin, Sandbox, Allow-Srcipts
- iFrame1: Cross Origin, No Sandbox
- iFrame1: Cross Origin, Sandbox
- iFrame1: Cross Origin, Sandbox, Allow-Srcipts

## Sandbox testing
I added simple javascript library, that is loaded by the GuestApp. 
The library checks if we are in a sandboxed iFrame. If this is the case we load the HTML (dumy form)

Changing the sanbox attributes after the page has loaded does not affect the iFrame. A page reload is required.

## Test case 1 - unprotected iframe (RootApp can access GuestApp)

Try to access content from RootApp to GuestApp (No Sandbox)

Open javascript console inside the webbrowser (right click, inspect)
and type the following. This will show you the HTML content of the iFrame.

```bash
$ document.getElementById('iframe1').contentWindow.document.body;
> <body onload="load()">…</body>
```

## Test case 2 - protected iframe (RootApp cannot access GuestApp)

Try to access content from RootApp to GuestApp (Sandbox)

Open javascript console inside the webbrowser (right click, inspect)
and type the following. This will show you the HTML content of the iFrame.

```bash
$ document.getElementById('iframe6').contentWindow.document.body;
> SecurityError: Sandbox access violation: Blocked a frame at "http://127.0.0.1:3000" from accessing a cross-origin frame.  The frame being accessed is sandboxed and lacks the "allow-same-origin" flag.
```

## Test case 3 - protected iframe (Change sandbox attributes)

Try to remove sandbox attribute and access content from RootApp to GuestApp (Drop Sandbox)

Open javascript console inside the webbrowser (right click, inspect)
and type the following. This will show you the HTML content of the iFrame.

Remove sandbox attribute:
```bash
$ document.getElementById('iframe6').removeAttribute('sandbox');
```

Try to access content: (fails as removing attributes do not take effect without reloading)
```bash
$ document.getElementById('iframe6').contentWindow.document.body;
> SecurityError: Sandbox access violation: Blocked a frame at "http://127.0.0.1:3000" from accessing a cross-origin frame.  The frame being accessed is sandboxed and lacks the "allow-same-origin" flag.
```

Reload content:
```bash
$ document.getElementById('iframe6').src = document.getElementById('iframe6').src;
```

Access content:
```bash
$ document.getElementById('iframe6').contentWindow.document.body;
> SecurityError: Blocked a frame with origin "http://127.0.0.1:3000" from accessing a cross-origin frame. Protocols, domains, and ports must match.
```