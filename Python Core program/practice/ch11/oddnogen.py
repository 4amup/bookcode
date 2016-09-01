#!/usr/bin/env python

from random import randint as ri
print [n for n in [ri(1, 99)for i in range(9)] if n%2]