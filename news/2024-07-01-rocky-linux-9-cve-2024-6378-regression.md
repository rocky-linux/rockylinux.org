---
title: "Rocky Linux 9 - CVE-2024-6387: regreSSHion"
date: "2024-07-01"
author: "Neil Hanlon"
---

_Updated at 2024-07-02 14:00 UTC to add clarifications and warnings about SIG/Security override packages_

## CVE-2024-6387: OpenSSH Vulnerability in Rocky Linux 9

A critical vulnerability, identified as [CVE-2024-6387](https://nvd.nist.gov/vuln/detail/CVE-2024-6387), affects OpenSSH server (sshd) on all Enterprise Linux 9 systems (including Rocky Linux 9). This issue involves a signal handler race condition that can lead to a potential remote code execution.

### Details

A client failing to authenticate within the LoginGraceTime (120 seconds by default) triggers sshd's SIGALRM handler, which calls non async-signal-safe functions like syslog(). This vulnerability does not affect versions shipped with Enterprise Linux 8, as the problematic code was introduced in later upstream releases.

### Risk Potential

While remote code execution is possible, it requires a complex and time-consuming race condition. Most attacks would more likely result in the sshd service crashing. High volumes of connections might be detectable via network monitoring.

### Mitigation

To address this issue, you can either update to `openssh-8.7p1-38.el9_4.security.0.5` from the SIG/Security repository or configure your ssh server to reduce the `LoginGraceTime` parameter.

#### Mitigation using SIG/Security OpenSSH Package

For the SIG/Security OpenSSH package, you may follow these instructions. Please make sure to read the [information](https://sig-security.rocky.page/packages/openssh/) about this package, including other changes besides this CVE fix, before using this package. Notably, SIG/Security openssh is built without Kerberos authentication support, so care should be taken to ensure this package fits your use case--if not, use the configuration mitigation procedure below. 

In addition, SIG/Security's repositories contain additional packages which override the base distribution's: glibc and microcode_ctl. While these packages' changes should be transparent to the system and have been tested, you should review the [information](https://sig-security.rocky.page/#packages) about these packages and their specific changes before installing them.

The instructions below will disable the `security-common` repository so that only `openssh` from sig-security will be used.

The release package can be installed on other Enterprise Linux distributions. See [sig-security wiki](https://sig-security.rocky.page/) for more information.

1. Install the SIG/Security release file
```
dnf install rocky-release-security
```
2. Disable SIG/Security security-common repo
```
dnf config-manager --disable security-common
```
3. Upgrade openssh
```
dnf --enablerepo=security-common update openssh\*
```
4. Confirm version `openssh-8.7p1-38.el9_4.security.0.5` is installed
```
rpm -q openssh
```

During the installation of openssh, the service will be automatically restarted.

#### Mitigation using `LoginGraceTime` configuration

If you cannot use the SIG/Security override package for any reason, you may apply a configuration mitigation. Note that setting `LoginGraceTime` to `0` mitigates remote code execution risks but makes the SSH service more susceptible to DoS attacks.

1. As root, open `/etc/ssh/sshd_config`.
2. Add or modify the `LoginGraceTime` parameter:
   ```
   LoginGraceTime 0
   ```
3. Save and close the file.
4. Restart the sshd service:
   ```
   systemctl restart sshd.service
   ```

## Get Involved

Want to stay in the loop on security vulnerabilities, community updates, and the latest information from Rocky SIGs? Join us at [chat.rockylinux.org](https://chat.rockylinux.org) and [forums.rockylinux.org](https://forums.rockylinux.org) -- or subscribe to our [rss feed](https://rockylinux.org/rss.xml) in your favorite feed reader.

