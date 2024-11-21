---
title: Rocky Linux 9.5 Available Now
date: "2024-11-19"
author: "Rocky Linux Team"
---

![Rocky Linux 9.5 Available Now](/images/news/rocky-linux-9-5-ga-release-header.png)

We are pleased to announce the general availability of Rocky Linux 9.5. Updated installation media, container, cloud, and live images are available from the [Rocky Linux Downloads](https://rockylinux.org/download) webpage. Please consult the [release notes](https://docs.rockylinux.org/release_notes/9_5/) published within [Rocky Linux Documentation](https://docs.rockylinux.org/) for important information, such as known issues and detailed changes in this version.

## Highlights

### Notable New Features and Changes

- **Podman** - Rocky Linux 9.5 ships with the latest and greatest [Podman version 5.0](https://blog.podman.io/2024/03/podman-5-0-has-been-released/). Podman 5.0 introduces exciting new features like fast Podman machine boot times, Podman Farm for multi-platform image building, greater compatibility for volumes in `podman kube play`, Quadlet enhancements, and a more performant default networking stack.
- **Cockpit** - Cockpit, the web console for easy remote server management, now provides file management capabilities via the Cockpit Files plugin. This feature requires installing the `cockpit-files` package.
- **Dynamic programming lanuages, web, and database servers**
  - Apache HTTP Server 2.4.62
  - Node.js 22
- **System toolchain**
  - GCC 11.5
  - Annobin 12.70
- **Performance tools and debuggers**
  - GDB 14.2
  - Valgrind 3.23.0
  - SystemTap 5.1
  - elfutils 0.191
  - libabigail 2.5
- **Performance monitoring tools**
  - Performance Co-pilot 6.2.2
  - Grafana 10.2.6
- **Compiler toolsets**
  - GCC Toolset 14
  - LLVM Toolset 18.1.8
  - Rust Toolset 1.79.0
  - Go Toolset 1.22

### Special Interest Group Notes and Changes

- **SIG/Cloud:** Images are now built with OpenSUSE's appliance builder [KIWI](https://github.com/OSInside/kiwi/) and [Empanadas](https://git.resf.org/sig_core/toolkit), the Rocky Linux Release Engineering toolkit.

For a more complete explanation of updates and changes, please see the [Rocky Linux 9.5 Release Notes](https://docs.rockylinux.org/release_notes/9_5/).

## Testing

Every Rocky Linux release undergoes thorough testing for accuracy and stability, and Rocky Linux 9.5 is no exception. The Rocky Linux testing process incorporates manual and automated checks across a wide variety of environments and setups. We have validated this release for a week before approving it for availability. Testing artifacts, discussions, and the release checklist can be found in the [Rocky Release (v9.5) Playbook](https://chat.rockylinux.org/playbooks/runs/cit8u75x17nkzyuog955fn3swa).

To participate in this testing process for future releases, join the [~Testing channel](https://chat.rockylinux.org/rocky-linux/channels/testing) on the [Rocky Linux Mattermost](https://chat.rockylinux.org/). We can’t wait to meet you!

## Upgrade and Conversion Process

You may upgrade from Rocky Linux 9.x to Rocky Linux 9.5 on the CLI by running `sudo dnf -y upgrade`, or via desktop tools like GNOME Software or KDE Discover.

Users from other Enterprise Linux 9 based distributions may convert their installations to Rocky Linux 9.5 using the [migrate2rocky](https://docs.rockylinux.org/guides/migrate2rocky/) utilities.

Rocky Linux 9 does not offer an official upgrade path from any version of Rocky Linux 8. We recommend users of Rocky Linux 8 who wish to upgrade to Rocky Linux 9 do so via a fresh install.

## Known Issues

- **Anaconda** - Currently the help buttons when clicked in Anaconda may show blank pages in specific environments (eg. QEMU w/ virtio-vga).

For a more complete list and explanation of known issues, please see the [Rocky Linux 9.5 Release Notes](https://docs.rockylinux.org/release_notes/9_5/).

## Acknowledgements

We extend deepest thanks to the Rocky Linux project volunteers and leaders for their commitment to making this release possible through compiling, testing, and documenting this release. Our gratitude extends to our sponsors and partners for continuing to ensure we have the necessary resources for this task.

Special recognition to these contributors for their work on this release:

- Alexia Stein
- Al Bowles
- Alan Marshall
- Boris Reisig
- Brian Clemens
- Chris Stackpole
- @grayeul
- @Gwendolyn
- Krista Burdine
- Louis Abel
- Lukas Magauer
- Mustafa Gezen
- Neil Hanlon
- Pablo Greco
- Sherif Nagy
- Skip Grube
- Steven Spencer
- Taylor Goodwill
- Trevor Cooper

Finally, we appreciate our Enterprise Linux ecosystem—especially the upstream development work of Fedora Linux, and the curation work in CentOS Stream—and the many, many additional developers and projects that contribute to all the Enterprise Linux distributions.
