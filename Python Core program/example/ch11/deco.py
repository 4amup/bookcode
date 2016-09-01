#!/usr/bin/env python
# -*- coding: utf-8 -*-

from time import ctime, sleep

def tsfunc(func):
	def wrappedFunc():	#该内部函数功能是增加了时间戳和调用目标函数
		print '[%s] %s() called'%(ctime(), func.__name__)
		return func()
	return wrappedFunc	#闭包

@tsfunc
def foo():
	pass
foo()
sleep(4)

for i in range(2):
	sleep(1)
	foo()