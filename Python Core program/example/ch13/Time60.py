#!/usr/bin/env python
# -*- coding: utf-8 -*-
class Time60(object):
	"""docstring for Time60"""
	def __init__(self, hr, min):
		self.hr = hr
		self.min = min
	
	def __str__(self):
		return '%d:%d' % (self.hr, self.min)
# ----test module----
# mon = Time60(10, 30)
# tue = Time60(11, 15)
# print mon, tue
	__repr__ = __str__
# 不是很懂这个地方，以上

	def __add__(self, other):
		return self.__class__(self.hr + other.hr, \
			self.min + other.min)
# 以上代码思路，首先计算出个别的总数，然后调用类构造器（__class__）返回一个新的对象。这里的__add__重载了个加号
# ----test module 2----
# mon = Time60(10, 30)
# tue = Time60(11, 15)
# print mon + tuen

	def __iadd__(self, other):
		self.hr += other.hr
		self.min += other.mim
		return self
