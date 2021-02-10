---
id: introduction
title: Introduction
slug: /
---

<!-- This is to display "Introduction" in the Table of Contents,
but without duplicating the "Intoduction" header.
-->
<div style={{ visibility: "hidden", height: "0px" }}> 

## Introduction

</div>

### What is vMod?

**vMod** is the open source library that powers the [**vanillamod.com**](https://www.vanillamod.com/) website. **vMod** translates JavaScript into Minecraft commands (like `/gamemode creative`). The result is the practicality of a real programming language, while leveraging the features and compatibility of Minecraft’s built in features. **vMod** only works for Minecraft Java Edition.

### What is vanillamod.com?

[**vanillamod.com**](https://www.vanillamod.com/) is the website we (TechLX) built to help teach programming and game design. On the website, you can save mods to your account and learn with free and paid courses. But, it's also powerful enough for true map-making, with new features added frequently.

## What can I do with vMod?

Stuff - (Create games for vanilla MC, Learn JS, Learn game development)

Check out what others have made on the [Examples page](examples.md).

## Why should I use vMod?

Stuff - (As a Student, Educator, Game Developer / Map Maker.) (Learn JS, online courses and documentation, Convenience and power of real code syntax; no installs or configuraton, just add the MC world to your saves; helpful editor checks for command errors; performance optimization and analyzer)

The [Editor page](editor.md) has a more detailed explanation of many helpful features. 

## How does vMod work?

When you download your mod, vMod first translates each of line of code you write into a special coding language used by Minecraft. Then, that translated code is turned into the file you download and use in your world. Because of this translation, anything you make with vMod works seamlessly in Minecraft. Your friends can play with your vMod creations together in multiplayer or in a downloaded world, all without any installation or configuration.

Still curious?

### How vMod works, in three ways

More detailed explanations, broken down for different kinds of experience.

#### I play Minecraft, but I'm new to programming

When vMod translates your code, the special coding language used by Minecraft is actually long lists of [Minecraft commands](https://minecraft.gamepedia.com/Commands). You may have used Minecraft commands before, like `/gamemode creative` or `/summon creeper`. These long lists of Minecraft commands are called [`mcfunction`](https://minecraft.gamepedia.com/Function_(Java_Edition))s, and a group of `mcfunction`s make up something called a [datapack](https://minecraft.gamepedia.com/Data_Pack). The file you download from vMod and add to your world is a datapack, and Minecraft uses that datapack to makes your creation work. Because the datapack is inside your world, you can just send your world to your friends and they can [download it like any adventure map](https://minecraft.gamepedia.com/Tutorials/Map_downloads#Download_a_world).

#### I know programming, but I'm new to Minecraft

blah

#### I play Minecraft and know programming

Stuff - (vMod looks over code, turns it into MC commands, combines into a Minecraft datapack that can be easily added to your world.)

A more detailed and technical explanation be found on the [Transpiler page](transpiler.md).

## What is this documentation for?

This documentation describes the features of the **vMod** library and the code editor on [**vanillamod.com**](https://www.vanillamod.com/). It is primarily a reference for writing JavaScript using the **vMod** library.

:::tip Want to start making things ASAP?
The best tutorial is the "Intro to Modding (with Minecraft)" eLearning course on [**vanillamod.com**](https://www.vanillamod.com/).  
Sign in, go to the courses page, then click "Enroll".

If you're already familiar with Minecraft and programming, try the [Quick Start guide](quick-start.md) on the next page.
:::