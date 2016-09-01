#/usr/bin/env python
#-*-coding: utf-8-*-
def foo():
	return True

def bar():
	'bar() does not do much'
	return True

foo.__doc__ = 'foo() does not do much'
foo.tester = '''
if foo():
	print 'PASSED'
else:
	print 'FAILED'
'''

for eachAttr in dir():
	obj = eval(eachAttr)	#将字符串转换为python代码
	if isinstance(obj, type(foo)):
		if hasattr(obj, '__doc__'):
			print '\nFunction "%s" has a doc string:\n\t%s' \
			% (eachAttr, obj.__doc__)
		if hasattr(obj, 'tester'):
			print 'Function "%s" has tester... executing' \
			% eachAttr
			exec obj.tester
		else:
			print 'Function "%s" has not tester... skipping' \
			% eachAttr
	else:
		print '"%s" is not a Function' % eachAttr