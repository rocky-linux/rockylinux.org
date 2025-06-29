---
title: Rocky Linux 9.6 Available Now
date: "2025-06-04"
author: "Rocky Linux Team"
---

We are pleased to announce the general availability of Rocky Linux 9.6. Updated installation media, container, cloud, and live images are available from the [Rocky Linux Downloads](https://rockylinux.org/download) webpage. Please consult the [release notes](https://docs.rockylinux.org/release_notes/9_6/) published within [Rocky Linux Documentation](https://docs.rockylinux.org/) for important information, such as known issues and detailed changes in this version.

## Highlights

### Notable New Features and Changes

- **Dynamic programming languages, web, and database servers**
  - PHP 8.3
  - nginx 1.26
  - MySQL 8.4
- **Performance tools and debuggers**
  - Valgrind 3.24.0
  - SystemTap 5.2
  - elfutils 0.192
  - libabigail 2.6
- **Performance monitoring tools**
  - Performance Co-pilot 6.3.2
  - Grafana 10.2.6
- **Compiler toolsets**
  - LLVM Toolset 19.17
  - Rust Toolset 1.84.1
  - Go Toolset 1.23

### Special Interest Group Notes and Changes

#### SIG/Cloud

- With the release of Rocky Linux 9.6, the process of building and delivering our images continues to improve. [KIWI](https://github.com/OSInside/kiwi/), a modern image-building tool that allows for a more consistent and maintainable workflow, created most of the images for this release.
- A new image type is available in this release--Windows Subsystem for Linux (or WSL)-compatible container archives can be downloaded and run on a Windows 10 or Windows 11 system with ease.
- Utilities for Oracle Cloud images have been updated to the most recent versions

For a more complete explanation of updates and changes, please see the [Rocky Linux 9.6 Release Notes](https://docs.rockylinux.org/release_notes/9_6/).

## Testing

Every Rocky Linux release undergoes thorough testing for accuracy and stability, and Rocky Linux 9.6 is no exception. The Rocky Linux testing process incorporates manual and automated checks across a wide variety of environments and setups. We have validated this release for a week before approving it for availability. Testing artifacts, discussions, and the release checklist can be found in the [Rocky Release (v9.6) Playbook](https://chat.rockylinux.org/playbooks/runs/gquiu1j3gidqpph68jifnmffcc).

To participate in this testing process for future releases, join the [~Testing channel](https://chat.rockylinux.org/rocky-linux/channels/testing) on the [Rocky Linux Mattermost](https://chat.rockylinux.org/). We can’t wait to meet you!

## Upgrade and Conversion Process

You may upgrade from Rocky Linux 9.x to Rocky Linux 9.6 on the CLI by running `sudo dnf -y upgrade`, or via desktop tools like GNOME Software or KDE Discover.

Users from other Enterprise Linux 9 based distributions may convert their installations to Rocky Linux 9.6 using the [migrate2rocky](https://docs.rockylinux.org/guides/migrate2rocky/) utilities.

Rocky Linux 9 does not offer an official upgrade path from any version of Rocky Linux 8. We recommend users of Rocky Linux 8 who wish to upgrade to Rocky Linux 9 do so via a fresh install.

## Known Issues

- **Current ZFS module will not load** - The currently released `zfs` module from OpenZFS **will not load** on Rocky Linux 9.6. For those using `zfs` on 9.5 and planning to upgrade to 9.6, you should hold off for now. If you are planning a fresh install of 9.6 and use `zfs` then again, you should wait for the release of the updated module. You can follow the issue [here](https://github.com/openzfs/zfs/issues/17332) and [here](https://github.com/openzfs/zfs/issues/17364).
- **SELinux issue on hosts with `passt` installed** - When using a workstation, server, or virtual host with a `passt` back end installed, the interface will fail to start if SELinux is enabled. See [this upstream issue](https://issues.redhat.com/browse/RHEL-80407) for more information.

For a more complete list and explanation of known issues, please see the [Rocky Linux 9.6 Release Notes](https://docs.rockylinux.org/release_notes/9_6/).

## Acknowledgements

We extend deepest thanks to the Rocky Linux project volunteers and leaders for their commitment to making this release possible through compiling, testing, and documenting this release. Our gratitude extends to our sponsors and partners for continuing to ensure we have the necessary resources for this task.

Special recognition to these contributors for their work on this release:

- Alan Marshall
- Alexey Melezhik
- Alexia Stein
- Anna Zhyrnova
- Brian Clemens
- Bryan (@codedude)
- Chris Stackpole
- Fredrik Nystrom
- Gabriel Graves
- Bob Robison
- Louis Abel
- Lukas Magauer
- Michael Kinder
- Michael Young
- Mustafa Gezen
- Neil Hanlon
- Pablo Greco
- Sherif Nagy
- Skip Grube
- Steven Spencer
- Taylor Goodwill
- Trevor Cooper

Finally, we appreciate our Enterprise Linux ecosystem—especially the upstream development work of Fedora Linux, and the curation work in CentOS Stream—and the many, many additional developers and projects that contribute to all the Enterprise Linux distributions.
