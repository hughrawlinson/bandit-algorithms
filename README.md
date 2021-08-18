# Bandit Algorithms
_for website optimization_

I recently read John Myles White's [Bandit Algorithms for website optimization].

I understood the python code, but I thought I'd learn more if I actually typed
it out and converted it to Typescript. I started trying to add fancy types, but
in the end I found that adding more complexity on top of the existing code was
not a great plan, at least in the learning phase - so now Bandits know about arms
as just indices, and the reward as a number, a weird hybird.

## Bandit Algorithms:

- [x] Epsilon Greedy
- [ ] Annealing Epsilon Greedy
- [x] Softmax
- [ ] Annealing Softmax
- [ ] UCB1

I generally hope to add the algorithms from the book, but I don't plan on going
beyond, and reading the theory. It's a 10 year old book at the time of writing,
so if you're looking for typescript implementations of modern bandit algorithms,
this is likely not the repo for you.

[Bandit Algorithms for website optimization]: https://www.johnmyleswhite.com/blog/bandit-algorithms-for-website-optimization]