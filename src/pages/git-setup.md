---
layout: ../layouts/BaseLayout.astro
title: Git Installation and Setup Guide
description: A beginner-friendly guide to Git, GitHub, and your first commit.
activePage: git
---

# Git Installation and Setup Guide
In this document, you will learn how to push your code into GitHub for storing your code remotely and learn the basics of version control.

## Prerequisites
- You must have a laptop / PC.
- Git must be installed on your laptop / PC because it is a computer program that helps track your files.

## What is Version Control and why do we need it?
Version control is a system that keeps track of changes to your files over time. A simple way to think about it is like a save history for your project. If you change something and it breaks, you can go back to an earlier version instead of starting over. It is like having an undo button that can remember many past changes.

Git was created by Linus Torvalds.

We use version control because it helps you:

- save your work safely
- see what changed and when it changed
- undo mistakes without losing everything
- work with other people on the same project
- store your code on GitHub so it is backed up online

Git and GitHub are not the same thing. Git is the tool that tracks your changes on your computer. GitHub is a website that stores your Git projects online so you can share them and access them from anywhere.

Link to Installing Git:
https://git-scm.com/install/windows

## Before you make your first commit

Git needs to know who is making the commit. Set your name and email address first:
```
git config user.name "your-github-username"
git config user.email "your-github-email"
```

This step helps Git identify who committed the code. If you already set these values on your computer before, you may not need to do it again for every project.

![Right Click In Your directory](/assets/diagram-1.png)

In your folder that you saved your code, right click to open in terminal

Paste this command:
```
git init -b main
git add .
git commit -m "First Commit"
```

![Select Paste Anyway](/assets/diagram-2.png)

Select Paste anyway and press Enter so that the final command is also executed.

## What each command does?
`git init -b main` creates a new Git repository in this folder and names the first branch `main`. This tells Git, "start tracking this folder." The `-b main` part makes sure the project starts on the `main` branch instead of an older default like `master`.

`git add .` stages all the current files in the folder. "Staging" means you are telling Git which changes you want to include in your next save. The dot means "everything in this folder."

`git commit -m "First Commit"` saves a snapshot of the staged files. The message in quotes is a short note that explains what this save is for. You can later make more commits as you keep improving the project.

After this, your code is being tracked locally on your computer. The next step, if you want to put it on GitHub, is usually to connect this folder to a GitHub repository and push the commits there.

![Successful Git Commit](/assets/diagram-3.png)

If you see this, it means it has been committed into Git.

## Create your GitHub repository

![GitHub Homepage](/assets/diagram-4.png)

Go to [GitHub](https://github.com) while you are logged in. Then click the Plus button and choose New Repository.

![Name GitHub repository](/assets/diagram-5.png)

Name your project something easy to recognize, like `html-css` or another simple project name.

![Create repository button](/assets/diagram-6.png)

Scroll to the bottom and click Create repository.

## Connect the folder to GitHub

![GitHub repository settings](/assets/diagram-7.png)

Copy the HTTPS link from GitHub so you can paste it into your terminal in the next step.

![GitHub HTTPS Link](/assets/diagram-8.png)

Now go back to GitHub. Make sure HTTPS is selected, and that the link starts with `https://` instead of `git@github.com`.

![Copy and paste into terminal](/assets/diagram-9.png)

Click the copy button and paste it into your terminal.

![Result](/assets/diagram-10.png)

If this is what you see, then congrats, it means that you have successfully saved your folder into GitHub.

![GitHub Repository Page](/assets/diagram-11.png)

When you go back to GitHub and refresh the webpage, you should now see your code inside the repository.