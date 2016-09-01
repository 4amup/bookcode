# -*- coding: utf-8 -*-
def isprime():
	num = int(raw_input("enter a num:"))
	for x in range(2, num):
		if num % x == 0:
			return True
			break
	else:
		return False
print isprime()