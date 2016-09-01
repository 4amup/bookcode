#!/usr/bin/env python
# -*- coding: utf-8 -*-
def dictVarArgs(arg1, arg2='defaultB', **theRest):	#元组做参数必须加*号
	'display 2 regular args and keyword variable args'
	print 'formal arg1:', arg1
	print 'formal arg2:', arg2

	for eachXtrArg in theRest.keys():
		print 'Xtra arg %s: %s' % (eachXtrArg, str(theRest[eachXtrArg])

