---
title: Rocky Linux 9.7 Available Now
date: "2025-12-01"
author: "Rocky Linux Team"
---

We are pleased to announce the general availability of Rocky Linux 9.7. Updated installation media, container images, cloud images, and live images are available from the [Rocky Linux Downloads](https://rockylinux.org/download) webpage. Please consult the [release notes](https://docs.rockylinux.org/release_notes/9_7/) published in the [Rocky Linux Documentation](https://docs.rockylinux.org/) for important information, such as known issues and detailed changes in this version.

## Highlights

### Notable New Features and Changes

- **Security**
  - System-wide cryptographic policies (crypto-policies): post-quantum cryptography (PQC) and contains many improvements for application PQC support.
- **Dynamic programming languages, web, and database servers**
  - Node.js 24
  - Valkey 8
- **System toolchain components**
  - Glibc 2.34
  - Annobin 12.98
- **Performance tools and debuggers**
  - GDB 16.3
  - Valgrind 3.25.1
  - SystemTap 5.3
  - Dyninst 13.0.0
  - elfutils 0.193
  - libabigail 2.8
- **Compiler toolsets**
  - GCC Toolset 15, including:
    - GCC 15.1
    - Binutils 2.44
  - LLVM Toolset 20.1.8
  - Rust Toolset 1.88.0
  - Go Toolset 1.24
  - .NET 10.0

### RL Web Console (Cockpit)

Cockpit is a web-based interface for managing and monitoring your local system.

This new release brings an improved UI style based on PatternFly 6.

### Image Builder

Image Builder is now able to create WSL2 and Vagrant (libvirt) images.

For a more complete explanation of updates and changes, please see the [Rocky Linux 9.7 Release Notes](https://docs.rockylinux.org/release_notes/9_7/).

## Testing

Every Rocky Linux release undergoes thorough testing for accuracy and stability, and Rocky Linux 9.7 is no exception. The Rocky Linux testing process includes manual and automated checks across a wide range of environments and configurations. We have validated this release for a week before approving it for availability. Testing artifacts, discussions, and the release checklist are available in the [Rocky Release (v9.7) Playbook](https://chat.rockylinux.org/rocky-linux/channels/rocky-release-v97).

To participate in this testing process for future releases, join the [~Testing channel](https://chat.rockylinux.org/rocky-linux/channels/testing) on the [Rocky Linux Mattermost](https://chat.rockylinux.org/). We can’t wait to meet you!

## Upgrade and Conversion Process

You may upgrade from Rocky Linux 9.x to Rocky Linux 9.7 on the CLI by running `sudo dnf -y upgrade`, or via desktop tools like GNOME Software or KDE Discover.

Users from other Enterprise Linux 9-based distributions may convert their installations to Rocky Linux 9.7 using the [migrate2rocky](https://docs.rockylinux.org/guides/migrate2rocky/) utilities.

Rocky Linux 9 does not offer an official upgrade path from any version of Rocky Linux 8. We recommend users of Rocky Linux 8 who wish to upgrade to Rocky Linux 9 do so via a fresh install.

## Acknowledgements

We extend our deepest thanks to the Rocky Linux project volunteers and leaders for their commitment to making this release possible through compiling, testing, and documenting this release. Our gratitude extends to our sponsors and partners for continuing to ensure we have the necessary resources for this task.

Special recognition to these contributors for their work on this release:

- Alan Marshall
- Alexey Melezhik
- Alexia Stein
- Bob Robinson
- Bryan (@codedude)
- Chris Stackpole
- Gabriel Graves
- Louis Abel
- Lukas Magauer
- Michael Kinder
- Michael Young
- Mustafa Gezen
- Neil Hanlon
- Sam Thornton
- Sherif Nagy
- Skip Grube
- Steven Spencer
- Taylor Goodwill
- Trevor Cooper

Finally, we appreciate our Enterprise Linux ecosystem—especially the upstream development work of Fedora Linux, and the curation work in CentOS Stream—and the many, many additional developers and projects that contribute to all the Enterprise Linux distributions.
