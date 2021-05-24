---
id: features
title: Features
slug: /features
---

VanillaMod's features are made to help you:

* Create stuff faster (start working right away, no files to setup)
* Learn by doing (elearning courses for making cool stuff)
* Share creations easily (code works with world, no install/config)
* Write real code (learn programming, standardized syntax, code reuse)

Here's how VanillaMod helps you do all of that.

<!-- Consider trying to categorize these at some point? -->
## Features for Everyone

* **Fast Setup** - You can start working on a new project on VanillaMod in ten seconds. Starting a new Minecraft datapack usually means setting up the whole directory structure first, or using a template and deleting the stuff you don't want. VanillaMod does all of that for you.

  <!-- How to use it: Log into [vanillamod.com](https://www.vanillamod.com) and hit the Create Mod button at the top of the page. -->

* **Works With Vanilla Minecraft** - Mods made using VanillaMod work in Vanila Minecraft, without any complicated setup or installation. Simply download the zip file and place it inside your world folder. (We're even planning to make that easier!). Your friends can join your Realm or multiplayer server and play with your Mod without installing anything at all, because Mods live inside Vanilla Minecraft worlds.

* **Auto Saving** - VanillaMod automatically saves your work as you go, like you're typing in a Google doc. This means you don't have to worry about losing progress, and you can access your creations from any computer.

  <!-- How to use it: You already are. Code you write on [vanillamod.com](https://www.vanillamod.com) saves automatically. -->

* **Detailed Error Messages** - When VanillaMod encounters an issue with your code, it will usually be able to give you a detailed description of what went wrong along with suggestions to fix common causes of the issue.

* **Reference Documentation** - VanillaMod has detailed documentation with explanations and examples to help you understand every "ingredient" you can use in your code. 

* (Planned) **Code Suggestions** - autocomplete, code hints, and more

* (Planned) **Interactive Documentation** - drag examples from documentation into your code

* (Planned) **Visual Command Generators** - GUIs (mcstacker-esque) for making items, entities, and etc


## Features for Students (and Teachers!)

* **Interactive eLearning Courses** - Learn from our list of online courses, made by TechLX or our community.

* **Friendly Error Messages** - VanillaMod error messages are written to be understandable to novice programmers.

* **Growing List Of Examples** - Not sure how to do something? Search for mods made by other users.

* (Planned) **Live Collaboration** - Students will be able to work on Mods together, using Google Docs-like collaboration.

* (Planned) **Edit History** - Easily revert mistakes and check to see who made what what changes.


## Features for Map Makers

* **Full Runtime Logic** - The real and natural JavaScript syntax VanillaMod uses isn't just for show. A datapack made with VanillaMod runs like JavaScript. This is one of the most significant features that makes VanillaMod different from other powerful `mcfunction` compilers out there, like Trident, mcbuild, and Sandstone. When you write a for loop in JavaScript, VanillaMod does not pre-compile that loop. **VanillaMod implements runtime iteration** on your datapack, among other things. If the loop condition compares the loop variable to another variable, you can change that variable in game, and it will affect how many times the loop iterates. 

* **Compiler Optimization** - VanillaMod analyzes your code as it transpiles, looking for areas to improve performance by reducing the number of commands used. VanillaMod's default runtime functionality has also been extensively benchmarked, so you don't have to worry about making sure you're taking the most performant approach. With that said, VanillaMod's compiletime optimization is respectable but not perfect, so this feature still has an impressive potential for improvement.

* **Automatic Version Updates** - Whenever Minecraft releases an update that the changes command syntax or breaks datapacks from previous versions in any way, VanillaMod will give you the option to automatically update your code so that it works in the newest version.

* (Planned) **Performace Benchmarking** - Use a built in benchmarking tool to compare the performance of two functions or get a performance heuristic for a lone function.

* (Planned) **Import Code** - Use the JS `import` keyword to import code from other user's mods.
