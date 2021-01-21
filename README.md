# Image Slider
![Version](https://img.shields.io/badge/Version-0.0.1-green.svg)
[![Build Status](https://dev.azure.com/scfagan/pipelineBuilds/_apis/build/status/spfx/ImageSlider?repoName=FaganSC%2FspfxImageSlider&branchName=master)](https://dev.azure.com/scfagan/pipelineBuilds/_build/latest?definitionId=19&repoName=FaganSC%2FspfxImageSlider&branchName=master)
![SPFX Version](https://img.shields.io/badge/SPFX%20Version-1.11-green.svg)
[![GitHub issues](https://img.shields.io/github/issues/Naereen/StrapDown.js.svg)](https://GitHub.com/Naereen/StrapDown.js/issues/)

## Summary

Short summary on functionality and used technologies.

[picture of the solution in action, if possible]

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

### 3rd Party Packages
* [PnPjs](https://pnp.github.io/pnpjs/)
* [PnP Controls React](https://pnp.github.io/sp-dev-fx-controls-react/)
* [PnP Property Controls](https://pnp.github.io/sp-dev-fx-property-controls/)

## Office 365 CDN
~~~powershell
Connect-SPOService https://<tenant>-admin.sharepoint.com
Set-SPOTenantCdnEnabled -CdnType Both -Enable $true
Add-SPOTenantCdnOrigin -CdnType Public -OriginUrl */SliderImgs
~~~ 

## Solution

Solution|Author(s)
--------|---------
SPFX Image Slider | [Shawn Fagan](https://twitter.com/fagansc)

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 20, 2021|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
~~~
npm install
gulp serve
~~~
> Include any additional steps as needed.

## Features

Description of the extension that expands upon high-level summary above.

This extension illustrates the following concepts:

- topic 1
- topic 2
- topic 3

> Notice that better pictures and documentation will increase the sample usage and the value you are providing for others. Thanks for your submissions advance.

> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
