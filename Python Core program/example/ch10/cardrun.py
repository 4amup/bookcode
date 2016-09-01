#! /usr/bin/env python
# -*- coding: utf-8 -*-
def safe_float(obj):
	'safe version of float()'
	try:
		retval = float(obj)
	except (ValueError, TypeError), diag:
		retval = str(diag)
	return retval
	
def main():
	'handle all the date processing'
	log = open('cardlog.txt', 'w')
	try:
		try:
			ccfile = open('carddate.txt', 'r')
			txns = ccfile.readlines()
		except IOError, e:
			log.write('no txns this month\n')
	finally:
		ccfile.close()

	total = 0.00
	log.write('account log:\n')

	for eachTxn in txns:
		result = safe_float(eachTxn)
		if isinstance(result, float):
			total += result
			log.write('data...processing\n')
		else:
			log.write('ignored: %s' % result)
	print '$%.2f (new balance)' % (total)
	log.close()

main()