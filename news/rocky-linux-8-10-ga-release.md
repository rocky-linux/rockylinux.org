---
title: Rocky Linux 8.10 Available Now
date: "2024-05-30"
author: "Neil Hanlon"
---

We are excited to announce the general availability of Rocky Linux 8.10. This release is now available for the x86_64 and aarch64 architectures. Please consult the release notes on the [Rocky Linux Documentation](https://docs.rockylinux.org/release_notes/8_10) for important information, including known issues and detailed changes in this version.

## Highlights

### Notable New Features and Changes

- Since Rocky Linux 8.9, Azure images are be published under the new publisher name: `resf`, moving away from the earlier, less intuitive name.

* In addition to the Azure Marketplace, Rocky Linux is available for free on the Azure Community Gallery, providing incredibly easy access to run Rocky on Microsoft Azure. Instructions on how to utilize the Community Gallery images can be found on this [news post](https://rockylinux.org/news/rocky-on-azure-community-gallery/).

For a thorough list of updates and changes, refer to the [Rocky Linux 8.10 Release Notes](https://docs.rockylinux.org/release_notes/8_10).

### Special Interest Group Notes

- AWS images should now be able to boot in IPv6-only subnets, closing a [longstanding bug](https://bugs.rockylinux.org/view.php?id=279) that the Cloud SIG has worked with upstream to resolve
- While images for Rocky 9.4 were built with kiwi, Rocky Linux 8 images were built using the tooling that was used for past releases to ensure a smooth release artifact experience for the final minor release of 8.

### Release Engineering Notes

- This is the final minor release for the Rocky Linux 8.10--there will not be a Rocky Linux 8.11 in November. Instead, Rocky Linux 8 will receive security updates only for the next 5 years, in line with upstream’s lifecycle. For more information, please see our [version guide](https://wiki.rockylinux.org/rocky/version/).

### Testing

Each Rocky Linux release undergoes extensive testing for accuracy and stability, incorporating both manual and automated checks across various environments and setups.

Rocky Linux 8.10 has been rigorously tested for a week before getting the final nod. Testing artifacts, discussions, and the release checklist are available [here](https://chat.rockylinux.org/rocky-linux/channels/rocky-release-v810).

We welcome those interested in the release process to connect with the team at [chat.rockylinux.org](https://chat.rockylinux.org/rocky-linux/channels/testing).

## Upgrades and Conversions

Existing Rocky Linux 8 users can update to version 8.10 using `dnf update` through the terminal or via desktop tools like GNOME Software, KDE Discover, etc.

Users from other Enterprise Linux 8 based distributions can transition to Rocky Linux 8.10 using the [migrate2rocky](https://github.com/rocky-linux/rocky-tools/blob/main/migrate2rocky/migrate2rocky.sh) script.

## Acknowledgements

Our heartfelt thanks go to the Rocky Linux project volunteers and leaders for their dedication to compiling, testing, and documenting this release. Our gratitude extends to our [sponsors](https://rockylinux.org/sponsors) and [partners](https://rockylinux.org/partners) for providing the necessary resources.

Special thanks to the following contributors for their efforts in this release:

- Alexia Steinberg
- Anthony Navarro

* Adam Augustine
* Al Bowles
* Alan Marshall

- Bob Robison

* Boris Reisig
* Brian Clemens
* Bryan (@codedude)
* Chris Stackpole
* Frank Schwichtenberg
* Krista Burdine
* Louis Abel
* Lukas Magauer
* Maxine Hayes
* Mustafa Gezen
* Neil Hanlon
* Pablo Greco
* Pratham Patel
* Sherif Nagy
* Skip Grube
* Steven Spencer
* Taylor Goodwill
* Trevor Cooper

We also appreciate the upstream development from Fedora Linux, the continued work on CentOS Stream, and the myriad of developers and projects that contribute to these distributions.
