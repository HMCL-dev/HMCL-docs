---
title: Known Issues of Multiplayer on macOS 15+
date: 2025-10-07T18:44:00+08:00
last_modified_at: 2026-06-18T12:07:00+08:00
authors:
  - SinetianLiu
---
## Cause

In newer versions of macOS, the "Local Network" permission was introduced. To request this permission, the process must run as a native macOS app. As a result, the Minecraft process launched by a bare Java installation **cannot request this permission**, and therefore cannot connect to the local network, which in turn makes normal multiplayer impossible.

## Current Status

Cannot be resolved. Please try other multiplayer methods.
