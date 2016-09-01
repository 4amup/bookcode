# -*- coding: utf-8 -*-
def safe_float(obj):
	try:
		reval = float(obj)
	except (ValueError, TypeError), diag:
		reval = str(diag)
	return reval