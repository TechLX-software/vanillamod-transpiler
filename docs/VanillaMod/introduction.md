---
id: introduction
title: Introduction
slug: /
---

## What is VanillaMod?

VanillaMod is a project for writing and learning code to make awesome stuff in Minecraft. With VanillaMod, you **write code in JavaScript** and VanillaMod translates that code to work with Minecraft (in Vanilla!). The result is the power of a real programming language and the compatibility of Minecraft’s built in features. 

The best place to use VanillaMod is on [**vanillamod.com**](https://www.vanillamod.com/), where you can create "Mods" and save them to an account. The website also has several free interactive online courses for learning programming, making maps, and designing games. We plan to add some paid online courses, but VanillaMod accounts and making Mods will **always be free**.
## What can I do with VanillaMod?

With VanillaMod, you can create Minecraft adventure maps, have fun building with friends, prototype a 3D space, and show off your creative side. 

While you do that, you'll also be learning awesome skills like programming, creativity, teamwork, problem solving, and design thinking. 

Check out what others have made on the [Examples page](examples).

:::tip Want to start making things ASAP?
The best tutorial is the "Intro to Modding (with Minecraft)" eLearning course on [**vanillamod.com**](https://www.vanillamod.com/).  
Sign in, go to the courses page, then click "Enroll".

If you're already familiar with Minecraft and programming, try the [Quick Start guide](quick-start).
:::

## Why should I use VanillaMod?

You should use VanillaMod because it will help you spend more time making and playing your creations. VanillaMod is still evolvingg, but it's already being used by teachers, students, and map makers because there's nothing else that works the same way.

### For Students and Educators

VanillaMod was created as an educational tool, and it shines because of its friendliness for beginners. When students get to express themselves and make things they're excited about, learning is self-motivating. The [**vanillamod.com**](https://www.vanillamod.com/) has several interactive eLearning courses to introduce students to VanillaMod or teach programming concepts and other skills. TechLX also offers classroom-tested curriculum and extensive lesson plans, please [get in touch with us](https://www.techlx.com/contact/) if you're interested!

The [Features page](features) also has a specific [list of features](features#features-for-students-and-teachers) for students and educators. 

### For Game Devs and Map Makers

Power users will appreciate the experience of developing in a real programming language using natural syntax. Error messages will feel familiar and reusing code is accomplished by reading a few function names instead of learning a new set of scoreboard values and tags from someone else's datapack (and that's if they wrote documentation).

The [Features page](features) also has a specific [list of features](features#features-for-map-makers) for experienced game developers and map makers. 

## How does VanillaMod work?

When you download your Mod, VanillaMod first translates each of line of code you write into a special coding language used by Minecraft. Then, that translated code is turned into the file you download and use in your world. Because of this translation, anything you make with vMod works seamlessly in Minecraft. Your friends can play with your VanillaMod creations together in multiplayer or in a downloaded world, all without any installation or configuration.

Still curious?

### How VanillaMod works, in three ways

More detailed explanations, broken down for different kinds of experience.

<details>
<summary><b>
I play Minecraft, but I'm new to programming
</b></summary>

When VanillaMod translates your code, the special coding language used by Minecraft is actually long lists of [Minecraft commands](https://minecraft.gamepedia.com/Commands). You may have used Minecraft commands before, like `/gamemode creative` or `/summon creeper`. These long lists of Minecraft commands are called [`mcfunction`](https://minecraft.gamepedia.com/Function_(Java_Edition))s, and a group of `mcfunction`s make up something called a [datapack](https://minecraft.gamepedia.com/Data_Pack). The file you download from VanillaMod and add to your world is a datapack, and Minecraft uses that datapack to makes your creation work. Because the datapack is inside your world, you can just send your world to your friends and they can [download it like any adventure map](https://minecraft.gamepedia.com/Tutorials/Map_downloads#Download_a_world).

</details>

<br/>

<details>
<summary><b>
I know programming, but I'm new to Minecraft
</b></summary>

VanillaMod follows a process similar to a [source-to-source compiler or "transpiler"](https://en.wikipedia.org/wiki/Source-to-source_compiler). It transpiles source code from one language (JS) into the source code of another language (the Minecraft scripting language). However, the Minecraft scripting language does not natively have features like variables, iterative loops, and memory management, so VanillaMod also does some of the work of a full compiler by implementing them. 

Each step of the VanillaMod transpiling process is described in detail on the [Transpiler page](transpiler).

</details>

<br/>

<details>
<summary><b>
I play Minecraft and know programming
</b></summary>

VanillaMod follows a process similar to a [source-to-source compiler or "transpiler"](https://en.wikipedia.org/wiki/Source-to-source_compiler). It transpiles source code from one language (JS) into the source code of another language (commands in `.mcfunction` files inside a datapack). However, Minecraft commands don't have features like variables, iterative loops, and memory management, so VanillaMod also does some of the work of a full compiler by implementing them using entities and scoreboards. 

Each step of the VanillaMod transpiling process is described in detail on the [Transpiler page](transpiler).

</details>

## What is this documentation for?

This primary purpose of this documentation is to be a reference for people writing JavaScript for Mods on the [**vanillamod.com**](https://www.vanillamod.com/) site. This documentation is hosted on a [separate site](https://meta.vanillamod.com/docs/), and it is [open source on Github](https://github.com/bakerfugu/vanillamod-transpiler) along with the transpiler library and code editor.