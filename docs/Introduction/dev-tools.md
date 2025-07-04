---
id: dev-tools
title: Developer Tools
sidebar_position: 2
description: Developer Tools
---

# Developer tools used in this course

This document is a summary of the developer tools used in this course.

## Dev tools summary

Some of the dev tools will be graphical user interface (GUI) apps that run on the _base_ (device/host) operating system (including web browsers). Some will be command line interface (CLI) apps.

The following table shows the tasks to be done, and the apps that enable you to do the tasks, on macOS or Windows.

| Task                                       | macOS                                                                         | Windows                                                                        |
| ------------------------------------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| File system GUI                            | Finder                                                                        | File Explorer                                                                  |
| File system CLI                            | Terminal                                                                      | Command Prompt (CMD)                                                           |
| Editor                                     | Visual Studio Code                                                            | Visual Studio Code                                                             |
| Node.js, Git                               | Install these on macOS                                                        | Install these on Windows                                                       |
| Web browser(s)including dev tools,debugger | Chrome, Firefox, Opera, Safari                                                | Chrome, Firefox, Opera, Edge                                                   |
| HTTP inspector                             | Visual Studio Code Extension:[Thunder Client](https://www.thunderclient.com/) | Visual Studio Code Extension: [Thunder Client](https://www.thunderclient.com/) |
| Data generator                             | [mockaroo.com](https://mockaroo.com) online                                   | [mockaroo.com](https://mockaroo.com) online                                    |

## Dev tools usage notes

As you can see from the summary, you will be using GUI versions of the following apps. Each is an app that is designed for the base operating system.

- File system
- Code editor
- Browsers

### Using terminal windows

Do not hesitate to use multiple terminal windows. During development, your professor typically uses a minimum of three, but often about five are opened. Each is opened at a different folder, and therefore is used for different purposes:

- One or more is focused on the parent folder of the current app
  - Used to create new apps and to run general commands
- Another is focused on the current app itself
  - It's used to create new files and to run app-specific commands (e.g. `npm start`)

### Creating folders on macOS

In your Documents folder, create a folder to hold your apps, maybe named `dev`. (Then inside that folder, each app will be in its own folder.)

### Creating folders on Windows

Using File Explorer, create a new folder (maybe named `dev`) in the root of drive C:. In other words, `c:\dev`. Inside that folder, we will be creating separate multiple apps (web APIs, React / Next.js apps, etc.).

### Deleting old or unneeded app/project folders

As you know, when you delete a folder (using Finder or File Explorer), the folder is just "marked" as deleted, and is then managed by the operating system's Trash folder (Unix) or Recycle Bin folder (Windows). Later, you can "empty" the Trash folder, which actually and permanently deletes the contents.

Why does this matter to us? Well, a typical Node.js + Express.js, or React / Next.js app has thousands of files and is hundreds of megabytes in size. If you create and then discard five (for example) apps per week, then a month later, you have a huge amount of wasted storage space, which takes a long time to actually delete (it can be minutes).

Therefore, if you want to immediately and permanently delete an old/dead/unneeded app folder:

- On macOS Finder, use Option+Command+delete (instead of delete on its own)
- On Windows File Explorer, use Shift+delete (instead of delete on its own)
