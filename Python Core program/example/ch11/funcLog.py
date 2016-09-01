#!/usr/bin/env python
# -*- coding: utf-8 -*-
from time import time
#获得关于何时函数条用应该被写入日志的用户请求
def logged(when):				
	def log(f, *args, **kargs):
		print'''Called:
function: %s
args: %r
kargs: %r''' % (f, args, kargs)

	def pre_logged(f):
		def wrapper(*args, **kargs):	#wrapper 闭包
			log(f, *args, **kargs)
			return f(*args, **kargs)
		return wrapper

	def post_logged(f):
		def wrapper(*args, **kargs):
			now = time()
			try:
				return f(*args, **kargs)
			finally:
				log(f, *args, **kargs)
				print "time delta: %s" % (time()-now)
		return wrapper
	try:
		return{"pre": pre_logged, "post": post_logged}[when]	
		#上一句是一个字典后面跟了一个索引
	except KeyError, e:
		raise ValueError(e), 'must be "pre" or "post"'

@logged("post")
def hello(name):
	print "Hello,", name

hello("World!")