# -*- coding: utf-8 -*-
def safe_float(obj):
	try:
		reval = float(obj)
	except ValueError:
		reval = 'could not convert non-number to float'
	except TypeError:
		reval = 'object type cannot be converted to float'
	return reval

print safe_float(7894)
print safe_float('fsdfds')
print safe_float(())