# -*- coding: utf-8 -*-
class SortedKeyDict(dict):
	"""SortedKeyDict"""
	def keys(self):
		return sorted(super(SortedKeyDict, self).keys())

#super（type）就是“返回此类的父类”的意思

d = SortedKeyDict((('zheng-cai', 67), ('hui-jun', 68), ('xin-yi', 2)))
print 'By iterator:'.ljust(12), [key for key in d]
print 'By keys():'.ljust(12), d.keys()
