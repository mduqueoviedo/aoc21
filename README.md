# aoc21

My humble trying of Advent of Code 2021.

https://adventofcode.com/2021

Merry Christmas and happy coding!!!

If you stumble here, let me give you a piece of advice :)

Some people don't want to share they are participating in AOC, precisely because other fellow devs say stuff of the sort of _"If you are having trouble with this or that AOC challenge, you are not a good developer!"_.

**Please.** Do us all a favour and don't be that person.

PS: If I were to listen to that, I can tell you I am not a good developer either. Join my club!

### Day 1

#### Star 1

Warming up! Set up input reader, not everyday you read and process a file...

#### Star 2

Not a specially elegant solution here, just make sure we don't read out of bounds.
Instead of reading line by line, extract "read 2 future readings" logic into a function and iterate with it.

### Day 2

#### Star 1

Pretty straightforward, easy to understand challenge. Probably a lot of room for code-golfing here!!

#### Star 2

The main challenge here for me was _reading the challenge slowly_ and understand what changed with regards to the first star! :facepalm:

### Day 3

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

### Day 4

#### Star 1

A lot of looping today! Some interesting facts:

- Clean up the input to create clean boards in 2D arrays. Those double/triple spaces in the input were the first pebble in the road.
- Break up the problem as much as possible!! My solution has 4 great submodules that do all the hard work.
- I am pretty sure there's room for optimization, some short circuits in the loops would save a lot of iterations, but... :shrug:
- I am kind of proud / ashamed / amazed of that double nested `reduce()` and how well it worked at the first try.

#### Star 2

Again, I've been lucky and I could piggyback like 99% in the code of the first part. As the boards were in an array, I could just save the indexes of the winners in order so I could just retrieve the last winner.

_PS:_ I re-learnt that `array.at(-1)` allows to get last item of array, in comparison to `array[array.length - 1]`.
