---
title: Rocky Linux 10.1 Available Now
date: "2025-11-25"
author: "Brian Clemens"
---

We are pleased to announce the general availability of **Rocky Linux 10.1**. Updated installation media, container, cloud, development board, and live images are available from the [Rocky Linux Downloads](https://rockylinux.org/download) webpage. Please consult the [release notes](https://docs.rockylinux.org/release_notes/10_1/) published within [Rocky Linux Documentation](https://docs.rockylinux.org/) for important information, such as known issues and a more detailed explanation of changes in this version.

## Notable New Features and Changes

### Soft Reboots

Systemd soft-reboot enables userspace-only reboots, permitting rapid patching in many scenarios. Documentation is available in the [systemd-soft-reboot.service manual page](https://www.freedesktop.org/software/systemd/man/257/systemd-soft-reboot.service.html). Please review the documentation and note the limitations before using soft reboots in production environments.

### Post-Quantum Cryptography

Furthering the post-quantum cryptography progress made in Enterprise Linux 10.0, Rocky Linux 10.1 now prioritizes post-quantum over classical algorithms in OpenSSL and enables post-quantum algorithms in more libraries and policies including GnuTLS.

### XFS Enhancements

You can now scrub mounted XFS filesystems with `xfs_scrub` and shrink XFS filesystems with `xfs_growfs` in some scenarios.

### Upgraded Software

Dynamic programming languages, web, and database servers:

- .NET 10
- Node.js 24
- OpenJDK 25
- Valkey 8

Compiler toolsets:

- GCC 15
- Go Toolset 1.24
- LLVM Toolset 20
- Rust Toolset 1.88

## Special Interest Group Notes and Changes

### SIG/AltArch

- Rocky Linux 10.1 VisionFive2 images will not be published until issues in the riscv64 6.12.0-124.8.1 kernel build have been fixed.

## Testing

Like every Rocky Linux release, Rocky Linux 10.1 has undergone thorough testing for accuracy and stability. The Rocky Linux testing process encompasses both manual and automated checks across a diverse range of environments and configurations. We have validated this release for two weeks before approving it for general availability. Testing artifacts, discussions, and the release checklist can be found in the [Rocky Release (v10.1) Playbook](https://chat.rockylinux.org/playbooks/runs/j4m7i7k6z3yutnh4zb6zt9r53y).

To participate in this testing process for future releases, join the [~Testing channel](https://chat.rockylinux.org/rocky-linux/channels/testing) on the [Rocky Linux Mattermost](https://chat.rockylinux.org/). We can’t wait to meet you!

## Upgrade and Conversion Process

You may upgrade from Rocky Linux 10.0 to Rocky Linux 10.1 on the CLI by running `sudo dnf -y upgrade` or via desktop tools like GNOME Software or KDE Discover.

Rocky Linux does not support upgrades between major releases. To move from 8.x or 9.x to Rocky Linux 10.1, a fresh install of the operating system is recommended.

Users from other Enterprise Linux 10 based distributions may convert their installations to Rocky Linux 10 using the [migrate2rocky](https://docs.rockylinux.org/guides/migrate2rocky/) utilities.

## Known Issues

- **RISC-V Kernel 6.12.0-124.8.1** - We observed issues with the kernel 6.12.0-124.8.1 on some RISC-V systems during our testing. RISC-V is currently a Rocky Linux secondary architecture, thus the issues are not considered release-blocking. RISC-V users are advised not to upgrade the kernel yet except for development and testing purposes. Users may upgrade with `dnf upgrade --exclude='kernel*' --exclude='kmod*'` to temporarily avoid upgrading the kernel.

See the [Rocky Linux 10.1 Release Notes](https://docs.rockylinux.org/release_notes/10_1/) for a more complete list and explanation of known issues.

## Acknowledgements

We extend deepest thanks to the Rocky Linux project volunteers and leaders for their commitment to making this release possible through compiling, testing, and documenting this release. Our gratitude extends to our sponsors and partners for continuing to ensure we have the necessary resources for this task.

Special recognition to these contributors for their work on this release:

- Alan Marshall (@alangm)
- Alexey Melezhik (@melezhik)
- Alexia Stein (@alexia)
- Bob Robison (@grayeul)
- Boris Reisig (@boris)
- Brian Clemens (@brian)
- Bryan (@codedude)
- Chris Short (@chrisshort)
- Chris Stackpole (@stack)
- David Gomez (@dgomez)
- Fredrik Nystrom (@nscfreny)
- Joey Brinkman (@j0ey)
- Gabriel Graves (@nebraskacoder)
- Louis Abel (@label)
- Lukas Magauer (lumarel)
- Michael Young (@elguero)
- Mustafa Gezen (@mustafa)
- Nathan B (@kemotaha)
- Neil Hanlon (@neil)
- Ondřej Nedomlel (@p4nda)
- Pablo Greco (@pgreco)
- Robert Wolfe (@zenaku)
- Sam Thornton (@sthornton)
- Seongeun Hwang (@hw5e)
- Sherif Nagy (@sherif)
- Skip Grube (@skip77)
- Stephen Simpson (@ssimpson)
- Steven Spencer (@sspencerwire)
- Taylor Goodwill (@tgo)
- Trevor Cooper (@tcooper)
- Wale Soyinka (@wale)

Finally, we appreciate our Enterprise Linux ecosystem—especially the upstream development work of Fedora Linux, the curation work in CentOS Stream, and the many projects and their developers that together comprise Enterprise Linux.
