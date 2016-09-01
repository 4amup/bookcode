#!/usr/bin/env python
# -*- coding: utf-8 -*-
def tupleVarArgs(arg1, arg2='defaultB', *theRest):	#元组做参数必须加*号
	'display regular args and non-keyword variable args'
	print 'formal arg1:', arg1
	print 'formal arg2:', arg1

	for eachXtrArg in theRest:
		print 'another arg:', eachXtrArg

def dictVarArgs(arg1, arg2='defaultB', **theRest):
	'display 2 regular args and keyword variable args'
	print 'formal arg1:', arg1
	print 'formal arg2:', arg2
	for eachXtrArg in theRest.keys():
		print 'Xtra arg %s: %s' % (eachXtrArg, str(theRest[eachXtrArg]))

def newfoo(arg1, arg2, *nkw, **kw):
	'display regular args and all variable args'
	print 'arg1 is:', arg1
	print 'args is:', arg2
	for eachNKW in nkw:
		print 'additional non-keyword arg:', eachNKW
	for eachKW in kw.keys():
		print "additional non-keyword arg'%s': %s" % (eachKW, kw[eachKW]) 

#newfoo(2, 4, *(6, 8), **{'foo': 10, 'bar': 12})
atuple = (6, 7, 8)
adict = {'z':9}
newfoo(1, 2, 3, x=4, y=5, *atuple, **adict)