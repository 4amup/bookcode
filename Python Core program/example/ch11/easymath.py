#!/usr/bin/env python
# -*-coding: utf-8-*-

from operator import add, sub
from random import randint, choice

ops = {'+': add, '-': sub}
MAXTRIES = 2

def doprob():
	op = choice('+-') # this is random.choice
	nums = [randint(1, 10) for i in range(2)] #通过range(2)两次调用了randint()函数生成10以内的随机数
	nums.sort(reverse = True)
	ans = ops[op](*nums) # *的作用是将列表解开成两个独立的参数，传入函数 *-新特性-*
	pr = '%d%s%d=' % (nums[0], op, nums[1])
	oops = 0 #初始化可猜次数
	while True:
		try:
			if int(raw_input(pr)) == ans:
				print 'correct'
				break
			if oops == MAXTRIES:
				print 'answer\n %s%d'%(pr,ans)
			else:
				print 'incorrect... try again'
				oops += 1
		except (KeyboardInterrupt, EOFError, ValueError):
			print 'invalid input... try again'

def main():
	while True:
		doprob()
		try:
			opt = raw_input('Again? [y]').lower()
			if opt and opt[0] == 'n':
				break
		except (KeyboardInterrupt, EOFError):
			break

if __name__ == '__main__':
	main()