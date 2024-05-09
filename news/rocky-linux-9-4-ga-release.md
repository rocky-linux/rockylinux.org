---
title: Rocky Linux 9.4 Available Now
date: "2024-05-09"
author: "Release Engineering Team"
---

We are excited to announce the general availability of Rocky Linux 9.4. This release is now available for the x86_64, aarch64, ppc64le, and s390x architectures. Please consult the release notes on the [Rocky Linux Documentation](https://docs.rockylinux.org/release_notes/9_4) for important information, including known issues and detailed changes in this version.

## Highlights

### Notable New Features and Changes

- Since Rocky Linux 9.3, Azure images are be published under the new publisher name: `resf`, moving away from the earlier, less intuitive name.
* In addition to the Azure Marketplace, Rocky Linux is available for free on the Azure Community Gallery, providing incredibly easy access to run Rocky on Microsoft Azure. Instructions on how to utilize the Community Gallery images can be found on this [news post](https://rockylinux.org/news/rocky-on-azure-community-gallery/).

For a thorough list of updates and changes, refer to the [Rocky Linux 9.4 Release Notes](https://docs.rockylinux.org/release_notes/9_4).

### Special Interest Group Notes

* AWS images should now be able to boot in IPv6-only subnets, closing a [longstanding bug](https://bugs.rockylinux.org/view.php?id=279) that the Cloud SIG has worked with upstream to resolve
* Most images are now built with [KIWI](https://github.com/OSInside/kiwi/) and our [empanadas](https://git.resf.org/sig_core/toolkit) toolkit, with the exception of a few variants that are still using the old imagefactory method. If you have any trouble, please get in touch. More information is available in the full release notes.

### Testing

Each Rocky Linux release undergoes extensive testing for accuracy and stability, incorporating both manual and automated checks across various environments and setups.

Rocky Linux 9.4 has been rigorously tested for a week before getting the final nod. Testing artifacts, discussions, and the release checklist are available [here](https://chat.rockylinux.org/rocky-linux/channels/rocky-release-v94).

We welcome those interested in the release process to connect with the team at [chat.rockylinux.org](https://chat.rockylinux.org/rocky-linux/channels/testing).

## Upgrades and Conversions

Existing Rocky Linux 9 users can update to version 9.4 using `dnf update` through the terminal or via desktop tools like GNOME Software, KDE Discover, etc.

Users from other Enterprise Linux 9 based distributions can transition to Rocky Linux 9.4 using the [migrate2rocky](https://github.com/rocky-linux/rocky-tools/blob/main/migrate2rocky/migrate2rocky9.sh) script.

## Acknowledgements

Our heartfelt thanks go to the Rocky Linux project volunteers and leaders for their dedication to compiling, testing, and documenting this release. Our gratitude extends to our [sponsors](https://rockylinux.org/sponsors) and [partners](https://rockylinux.org/partners) for providing the necessary resources.

Special thanks to the following contributors for their efforts in this release:

* Alexia Steinberg
* Anthony Navarro
- Adam Augustine
- Al Bowles
- Alan Marshall
* Bob Robison
- Boris Reisig
- Brian Clemens
- Bryan (@codedude)
- Chris Stackpole
- Frank Schwichtenberg
- Krista Burdine
- Louis Abel
- Lukas Magauer
- Maxine Hayes
- Mustafa Gezen
- Neil Hanlon
- Pablo Greco
- Pratham Patel
- Sherif Nagy
- Skip Grube
- Steven Spencer
- Taylor Goodwill
- Trevor Cooper

We also appreciate the upstream development from Fedora Linux, the curation work in CentOS Stream, and the myriad of developers and projects that contribute to these and our distributions.
