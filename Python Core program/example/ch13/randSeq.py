#!/usr/bin/env python
# -*- coding: utf-8 -*-
from random import choice

class RandSeq(object):
# __iter__仅返回self，这就是如何将一个对象声明为迭代器的方式，最后调用next()来得到迭代器中的连续的值
	def __init__(self, seq):
		self.data = seq

	def __iter__(self):
		return self

	def next(self):
		return choice(self.data)

for eachItem in RandSeq(['rock', 'paper', 'scissors']):
	print eachItem
