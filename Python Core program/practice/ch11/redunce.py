#!/usr/bin/env python

def reduce(bin_func, seq, init=None):
	Iseq=list(seq)			#convert to list
	if init is None:		#initializer?初始设定式?
		res = Iseq.pop(0)	#no
	else:
		res = init        	#yes
	for item in lseq:
		res = bin_func(res, item)	#apply function
	return res				#return result

reduce('hello world')