#!/usr/bin/env python
# -*- coding: utf-8 -*-
def foo():
	print "\ncalling foo()..."
	bar = 200
	print "in foo(), bar is", bar

bar = 100
print "in __main__, bar is", bar
foo()
print "\nin __main__, bar is (still)", bar