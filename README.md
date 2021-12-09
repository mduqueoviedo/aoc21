# Advent of Code 2021

My humble submission to [Advent of Code 2021](https://adventofcode.com/2021).

### 🎄 🎅 🎄 🎅 🎄 **Merry Christmas and happy coding!!!** 🎄 🎅 🎄 🎅 🎄

If you stumble here, let me give you a piece of advice :)

Some people don't want to share they are participating in AOC, precisely because other fellow devs say stuff of the sort of _"If you are having trouble with this or that AOC challenge, you are not a good developer!"_.

**Please.** Do us all a favour and don't be that person.

PS: If I were to listen to that, I can tell you I am not a good developer either. Join my club!

### Not-directly-related learnings

- Do AoC in _a good_ group!! Why?
  - Support, inspiration, fresher approaches to problems...
  - Your struggle is oftenly not yours alone, get frustrated together! :D
  - Overcoming challenges feels better when you are part of something bigger 💪
- Messed around with my github settings, now two accounts live together on the same computer. It was much harder than it should, IMO.
- Keeping a diary, even if it's just for yourself, is a great mental exercise to wrap up your coding sessions.

## Day 1

#### Star 1

Warming up! Set up input reader, not everyday you read and process a file...

#### Star 2

Not a specially elegant solution here, just make sure we don't read out of bounds.
Instead of reading line by line, extract "read 2 future readings" logic into a function and iterate with it.

## Day 2

#### Star 1

Pretty straightforward, easy to understand challenge. Probably a lot of room for code-golfing here!!

#### Star 2

The main challenge here for me was _reading the challenge slowly_ and understand what changed with regards to the first star! :facepalm:

## Day 3

#### Star 1

Things start getting a bit more complex :)

Once the challenge is clear, using a transpose function is key. My solution is a bit rigged for binary strings, if I had to get the most frequent value of an alpha(numeric) string, those filters would need to be replaced by something else.

Also, another optimization (but binary based), is filtering just number of zeroes and comparing with total length.

_PS: I didn't remember parsing a binary to decimal was that easy_

#### Star 2

From previous years, when you see that the utils from the first part can help in the second, it's a good signal (or maybe they cloud your vision from a simpler solution???)

The `transpose()` function helped a lot again. I am not very happy with the duplicated loop, probably they can be combined in a single `while` and use a conditional to stop evaluating one
or the other.

Funnily enough, in my first attempt, I got a result very close to the actual solution (even with the test input) by looking into the whole input _all the time_ while discarding values!!!

But applying the `transpose` into the right place did the trick.

## Day 4

#### Star 1

A lot of looping today! Some interesting facts:

- Clean up the input to create clean boards in 2D arrays. Those double/triple spaces in the input were the first pebble in the road.
- Break up the problem as much as possible!! My solution has 4 great submodules that do all the hard work.
- I am pretty sure there's room for optimization, some short circuits in the loops would save a lot of iterations, but... :shrug:
- I am kind of proud / ashamed / amazed of that double nested `reduce()` and how well it worked at the first try.

#### Star 2

Again, I've been lucky and I could piggyback like 99% in the code of the first part. As the boards were in an array, I could just save the indexes of the winners in order so I could just retrieve the last winner.

_PS:_ I re-learnt that `array.at(-1)` allows to get last item of array, in comparison to `array[array.length - 1]`.

## Day 5

#### Star 1

The first challenge here was deciding what kind of structure to use. I doubted between 2D array or a dictionary structure (object of objects). I chose the latter because I thought the array would be using up a lot of empty array items.

So the idea was only filling up the items where the vents were happening, and that way I could just count those specific places. This way I am probably saving a lot of iterations when counting the dangerous spaces.

Marking up the horizontal/vertical spaces has been a bit lazy, but it was the most straightforward solution I could think of on a sunny Sunday ☀️

#### Star 2

The first part was hinting that considering the diagonal lines would be the second part. And that it was.

I decided to copy-paste the first part and add the diagonal case. The code is actually much shorter, with those binaries we can decide if the increment is negative or positive.

Probably I could use this approach for the straight lines as well and reduce a lot of code, if I get some free time I might try to apply that improvement, but at least the result is right on the first attempt.

## Day 6

#### Star 1

First part is about understanding the problem, I was afraid of breaking the memory limit, but the straightforward solution worked...

#### Star 2

And now I broke the memory! Today is one of those days where the obvious path blurs your vision from something more memory efficient.

I confess that I had to look for hints that would point me to the right way. 🚨🚨

And it was not that complicated!!! Just add up the fishes on the same state and play with them (careful when rotating their values and generating new spawn).

**So I learned something today!** Avoid very long self growing data structures and group your data somehow else! And recursivity must be coming soon...

## Day 7

#### Star 1

After a tough one yesterday, this looked pretty straightforward. Check out min and max values and calculate cost.

Based on yesterday second part, here we could optimize the same way, group the equal numbers, as the cost will be the same and multiply by that one.

#### Star 2

In the second star, the formula for the cost is the sum of the n terms of an [Arithmetic Progression](https://en.wikipedia.org/wiki/Arithmetic_progression) so not a lot of complications here.

And we could still optimize by grouping the numbers with the same value (and we could even apply some simmetry rules and reduce that by half!)...

## Day 8

#### Star 1

Some mapping and splitting does the trick to get the unique numbers. But it was clear star 2 would be more difficult!

#### Star 2

~~I don't have the solution yet but this is like playing master mind. Find possible candidates for each segment and apply some comparisons. Some cases will help finding others, so let's see with some iterations it's enough or we need to apply priorities later. Just some rambling here for now I am afraid.~~

I was doing right! I was just afraid of writing too much code (lazyness) Although I am sure that as usual, I could reduce many lines from my solution.

Boy, this one was tough! The main complexity though, was use pen and paper and understand how I would solve it _myself_. Then I tried to understand the whole thing and realised you don't even need all digits (I didn't use length-5 ones) to find out the values.

There is no black magic in my code, apart from a couple of global variables that help me to use functions to play around with candidates and final values. Rest is filtering, sorting, searching in strings, etc.

## Day 9

#### Star 1

Playing with 2D arrays is always a bit of an exercise of patience.

I am starting to think I have a very naïve approach to these AoC challenges, but it's working so far!

In this first part I am just going through the values one by one and scanning their surroundings. Always be very careful, because storing 2D arrays results in arr[y][x] when seeing it in a matrix, opposite with the general convention of arr[x][y].

I added a small helper to prevent this issue but I had to make some fixes yet because still managed to swap them _sigh_

#### Star 2

Second part is about being even more patient and not afraid of writing too much code. I used the function from the first part to identify surrounding basins, and made sure not to store them entirely but just their lengths. The result is a bit long, but easy to understand. As usual, the auxiliary functions are longer than the actual running code. But I am not unhappy with it.
