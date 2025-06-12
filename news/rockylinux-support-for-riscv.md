---
title: RockyLinux Official Support for RISC-V in RL10!
date: '2025-05-21'
description: 'Info about official support for RISC-V Architectures'
posttype: 'news'
author: Alexia Stein, Community Lead
---

## 🏗️ Rocky Linux 10 Will Support RISC-V!

We're excited to announce that **Rocky Linux 10 will officially support RISC-V!**

Thanks to the incredible work of the Fedora RISC-V Community and Rocky's [AltArch SIG](https://chat.rockylinux.org), this release will include a **riscv64gc** build, targeting the same platforms supported by Fedora—such as the **StarFive VisionFive 2 (VF2)**, **QEMU**, and the **SiFive HiFive Premier P550**.

> Learn more about Fedora’s RISC-V journey:  
> [fedoramagazine.org/risc-v-and-fedora-all-aboard](https://fedoramagazine.org/risc-v-and-fedora-all-aboard/)

### 🔧 Highlights:

- ✅ Works out-of-the-box on the VisionFive 2 and in QEMU, using the standard EL10 kernel.
- 🧩 Supports the P550 and similar platforms via vendor kernels, though some features may be limited.
- 🧬 Built on an upstream-first approach—actively collaborating with the Fedora community to advance RISC-V support across the ecosystem.
- 🆕 New hardware targets and extensions (like RVA23) can be enabled by the AltArch SIG—jump in and get involved!

Special thanks to **RISC-V International**, **RISE**, **Rivos, Inc.**, and the **Fedora community** for their ongoing technical and hardware support.

---

## ❓ Frequently Asked: Rocky Linux RISC-V

### Is this a Primary architecture?

The RISC-V builds for Rocky Linux 10 will be considered an Alternative Architecture--though unlike ppc64le and s390x, build failures for riscv64 will **not** be considered fatal and will not block the release of the other architectures. In short, package updates for Rocky Linux will not be bottlenecked on waiting for RISC-V versions to build, or on fixing failures unique to the archicture.

### 🔍 What hardware is supported?

| Hardware                     | Status                       | Notes                                               |
|------------------------------|------------------------------|-----------------------------------------------------|
| **StarFive VisionFive 2**    | ✅ Supported                 | Recommended board; standard kernel support          |
| **QEMU**                     | ✅ Supported                 | Ideal for testing and evaluation                    |
| **SiFive HiFive P550**       | ⚠️ Limited support           | Vendor kernel;  some feature limitations             |
| **Milk-V / Banana Pi**       | 🚧 Not yet supported         | Under consideration as mainline support matures     |

### 🌟 What makes this different?

- This has been a **community-driven initiative** since early 2024, collaborating with upstream Fedora RISC-V efforts. 
- The compiler stack was **bootstrapped from Fedora RISC-V**, with necessary backports to EL10 to enable the port--with many already contributed upstreamed.
- Expect **rapid iteration and growth**, with your help and feedback!

---

## 🧭 Getting Started with RISC-V on Rocky

- 📥 **Download** the Rocky Linux 10 RISC-V image (coming soon).
- 📘 **Read the install guide** (also coming soon).
- 💬 **Join the conversation** in our Mattermost `SIG/Altarch` channel:  
  [chat.rockylinux.org](https://chat.rockylinux.org)

Stay updated via [Bluesky](https://bsky.app/profile/rockylinux.bsky.social), [LinkedIn](https://www.linkedin.com/company/rockylinux), or subscribe to our **RSS feed**.

---

## 🌍 The Road Ahead

From x86_64 to Arm, PowerPC to S390X—and now RISC-V—**Rocky Linux 10** represents our biggest step yet toward a truly open, cross-architecture ecosystem.

Whether you're deploying rock-solid production systems or tinkering with open hardware, **Rocky Linux 10 has a place for you.**

Let’s build it together.

*By Neil Hanlon (Infrastructure Lead) & Alexia Stein (Community Lead)*
