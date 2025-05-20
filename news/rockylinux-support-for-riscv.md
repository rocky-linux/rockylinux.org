---
title: RockyLinux Official Support for RISC-V in RL10!
date: '2025-05-20'
description: 'Info about official support for RISC-V Architectures'
posttype: 'news'
author: Alexia Stein, Community Lead
---

## 🏗️ Rocky Linux 10 Will Support RISC-V!

We're excited to announce that **Rocky Linux 10 will include official support for RISC-V!**

Thanks to the incredible work of the [AltArch SIG](https://chat.rockylinux.org), this release will include a **riscv64gc** build, targeting the same platforms supported by Fedora—such as the **StarFive VisionFive 2 (VF2)**, **QEMU**, and the **SiFive HiFive Premier P550**.

> Learn more about Fedora’s RISC-V journey:  
> [fedoramagazine.org/risc-v-and-fedora-all-aboard](https://fedoramagazine.org/risc-v-and-fedora-all-aboard/)

### 🔧 Highlights:

- ✅ **Out-of-the-box support** for VF2 and QEMU, running a mainline kernel.
- 🧩 **Vendor kernel support** for the P550 (some feature limitations).
- 🧬 **Upstream-first philosophy**—working closely with Fedora to upstream kernel and packaging improvements.
- 🆕 **Newer kernel version** than baseline Rocky 10, ensuring modern hardware compatibility.

Special thanks to **RISC-V International**, **RISE**, **Rivos, Inc.**, and the **Fedora community** for their ongoing technical and hardware support.

---

## ❓ Frequently Asked: Rocky Linux RISC-V

### 🔍 What hardware is supported?

| Hardware                     | Status                       | Notes                                               |
|-----------------------------|------------------------------|-----------------------------------------------------|
| **StarFive VisionFive 2**   | ✅ Supported                 | Recommended board; mainline kernel support          |
| **QEMU**                    | ✅ Supported                 | Ideal for testing and automation                    |
| **SiFive HiFive P550**      | ⚠️ Limited support          | Vendor kernel; some feature limitations             |
| **Milk-V / Banana Pi**      | 🚧 Not yet supported        | Under consideration as mainline support matures     |

### 🌟 What makes this different?

- This is a **community-driven architecture**, with deep collaboration from upstream Fedora RISC-V efforts.
- The toolchain was **bootstrapped from Fedora**, with CentOS Stream 10 patches to enable the port.
- Expect **rapid iteration and growth**, with your help and feedback!

---

## 🧭 Getting Started with RISC-V on Rocky

- 📥 **Download** the Rocky Linux 10 RISC-V image (coming soon).
- 📘 **Read the install guide** (also coming soon).
- 💬 **Join the conversation** in our Mattermost `SIG/Altarch` channel:  
  [chat.rockylinux.org](https://chat.rockylinux.org)

Stay updated via [Bluesky](https://bsky.app/profile/rockylinux.bsky.social), [LinkedIn](https://www.linkedin.com/company/rocky-linux), or subscribe to our **RSS feed**.

---

## 🌍 The Road Ahead

From x86_64 to Arm, PowerPC to S390X—and now RISC-V—**Rocky Linux 10** represents our biggest step yet toward a truly open, cross-architecture ecosystem.

Whether you're deploying rock-solid production systems or tinkering with open hardware, **Rocky Linux 10 has a place for you.**

Let’s build it together.


*By Neil Hanlon (Infrastructure Lead) & Alexia Stein (Community Lead)*

