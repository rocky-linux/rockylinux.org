---
title: Rocky Linux 10.0 Available Now
date: "2025-06-11"
author: "Rocky Linux Team"
---

## Rocky Linux 10.0 Available Now

By Neil Hanlon, Infrastructure Lead and Alexia Stein, Community Lead

We are pleased to announce the general availability of **Rocky Linux 10**. Updated installation media, containers, cloud images, and live images are available from the [Rocky Linux Downloads](https://rockylinux.org/download) webpage. Please consult the [release notes](https://docs.rockylinux.org/release_notes/10_0/) published in the [Rocky Linux Documentation](https://docs.rockylinux.org/) for important information, including known issues and detailed changes in this version.

### Important Notices

#### Supported Microarchitecture Levels

The most significant change in Rocky Linux 10 is the removal of support for x86-64-v2 architectures. AMD and Intel 64-bit architectures for x86-64-v3 are now required.

Rocky Linux 10 is supported on the following processor architectures:

* 64-bit AMD/Intel x86-64-v3 (x86_64)
* 64-bit RISC-V (riscv64)
* 64-bit ARMv8.0-A (aarch64)
* IBM POWER, little endian (ppc64le)
* IBM z (s390x)

All 32-bit packages have been removed from Rocky Linux 10. This means that 32-bit applications will no longer run on this version of Rocky Linux. Please use 64-bit libraries or containers with 32-bit dependencies instead.

#### Installer

Users will have administrative privileges by default, unless you deselect the option.

The Remote Desktop Protocol (RDP) is now the default for graphical remote access, replacing VNC.

#### DHCP Client and Server

The DHCP client in RL 10 is implemented as an internal subsystem of NetworkManager. The legacy dhcp-client package is no longer supported upstream and has been removed.

The ISC DHCP server is end-of-life upstream and is replaced by its successor, Kea DHCP, in RL 10.

#### Desktop Environment

In RL 10, Wayland replaces the X.Org Server. Xwayland will support most X11 clients that have not yet been ported to Wayland. Some desktop applications and components are also replaced in RL 10.

### Highlights

#### Notable New Features and Changes

* Dynamic programming languages, web, and database servers
  * PHP 8.3
  * Python 3.12
  * nginx 1.26
  * PostgreSQL 16.8
  * MySQL 8.4
  * Valkey 8.0
  * MariaDB 10.11
* Performance tools and debuggers
  * GDB 14.2
  * Valgrind 3.23.0
  * SystemTap 5.1
  * Dyninst 12.3.0
  * elfutils 0.192
  * libabigail 2.6
* Performance monitoring tools
  * Performance Co-pilot 6.3.0
  * Grafana 10.2.6
* Compiler toolsets
  * LLVM Toolset 19.1.7
  * Rust Toolset 1.84.1
  * Go Toolset 1.23

#### Support for RISC-V Architecture

Rocky Linux 10 introduces support for the RISC-V architecture, expanding the range of hardware platforms that can run Rocky Linux. This is a significant step towards making Rocky Linux more versatile and accessible to a broader audience.

More details about this milestone, including Rocky Linux 10's RISC-V support, [can be found here](https://rockylinux.org/news/rockylinux-support-for-riscv).

If you're interested in getting RISC-V hardware working with Rocky Linux, please join [~SIG/AltArch](https://chat.rockylinux.org/rocky-linux/channels/altarch) on the [Rocky Linux Mattermost](https://chat.rockylinux.org/).

### Testing

Every Rocky Linux release undergoes thorough testing for accuracy and stability, and Rocky Linux 10 is no exception. The Rocky Linux testing process encompasses both manual and automated checks across a diverse range of environments and configurations. We have validated this release for two weeks before approving it for availability. Testing artifacts, discussions, and the release checklist can be found in the [Rocky Release (v10) Playbook](https://chat.rockylinux.org/playbooks/runs/fir4c41m33rqukhzyqfx8jfu6w).

To participate in this testing process for future releases, join the [~Testing channel](https://chat.rockylinux.org/rocky-linux/channels/testing) on the [Rocky Linux Mattermost](https://chat.rockylinux.org/). We can't wait to meet you!

### Upgrade and Conversion Process

Rocky Linux does not support upgrades to any major release. To move from 8.x or 9.x to Rocky Linux 10, a fresh install of the operating system is recommended.

### Known Issues

**SELinux issue on hosts with passt installed** When using a workstation, server, or virtual host with a `passt` back end installed, the interface will fail to start if SELinux is enabled. See [this upstream issue](https://issues.redhat.com/browse/RHEL-80407) for more information.

### Release Engineering Update

With Rocky Linux 10, we're making a notable change: the builds will **not** come from our Peridot build system, but instead from **Koji**.

Here's why:

* **Peridot Two isn't ready (and we're okay with that).**
  We learned in the early days of Rocky Linux that dogfooding an unfinished system during a major release is risky and inefficient. This time, we're building smarter. Peridot Two will be a clean, modern reimplementation of Koji's XML-RPC interface on top of a gRPC backend—and when it's ready, it'll work out-of-the-box for existing Koji users.

* **IMA signing is a top priority.**
  One of the key features RHEL introduced—and we're now aiming to support—is **IMA (Integrity Measurement Architecture)**. This provides kernel-level file attestation using a dedicated signing CA, already baked into our Rocky Linux 9 kernels. Supporting this properly requires careful integration, which Keykeeper (Peridot's signing tool) doesn't currently support. So for now, Koji gives us the control we need to do this right.

* **Compatibility and transition readiness.**
  By building Rocky 10 in Koji now, we ensure a clean upgrade path to Peridot Two later, since it will support seamless import of builds and metadata from Koji instances.

All in all, this decision reflects our commitment to long-term maintainability, community transparency, and secure, production-grade infrastructure.

### Acknowledgements

We extend our deepest thanks to the Rocky Linux project volunteers and leaders for their commitment to making this release possible through compiling, testing, and documenting it. We extend our gratitude to our sponsors and partners for their continued support, which ensures we have the necessary resources for this task.

Special thanks to the following contributors for their efforts in this release:

- Ahmed Al-Battshi
- Alan Marshall
- Alexey Melezhik
- Alexia Stein
- Anna Zhyrnova
- Anna Zhyrnova
- Bob Robison
- Boris Reisig
- Brian Clemens
- Bryan (@codedude)
- Chris Short
- Chris Stackpole
- David Gomez
- Fredrik Nystrom
- Gabriel Graves
- Louis Abel
- Lukas Magauer
- Michael Kinder
- Michael Young
- Mustafa Gezen
- Nathan B
- Neil Hanlon
- Pablo Greco
- Sherif Nagy
- Skip Grube
- Steven Spencer
- Taylor Goodwill
- Trevor Cooper
- Wale Soyinka
- @roy.nielsen
- @stevo81989
- @wrsomsky

Finally, we appreciate our Enterprise Linux ecosystem—especially the upstream development work of Fedora Linux and the curation work in CentOS Stream—as well as the many additional developers and projects that contribute to all the Enterprise Linux distributions.
