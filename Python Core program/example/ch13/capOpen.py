#!/usr/bin/env python

class CapOpen(object):
	"""docstring for CapOpen"""
	def __init__(self, fn, mode='r', buf=-1):
		self.file = open(fn, mode, buf)

	def __str__(self):
		return str(self.file)

	def __repr__(self):
		return 'self.file'

	def write(self, line):
		self.file.write(line.upper())

	def __getattr__(self, attr):
		return getattr(self.file, attr)

f = CapOpen('capOpen.txt', 'w')
f.write('delegation example\n')
f.write('faye is good\n')
f.write('at delegating\n')
f.close()
print f

w = open('capOpen.txt', 'r')
for eachLine in w:
	print eachLine
