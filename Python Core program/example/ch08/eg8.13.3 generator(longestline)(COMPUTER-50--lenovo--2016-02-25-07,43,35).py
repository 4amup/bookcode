# -*- coding: utf-8 -*-

f = open('motd.txt')
longest = 0
while True:
	linelen = len(f.readline().strip())
	if not linelen: break
	if linelen > longest:
		longest = linelen
f.close()
print longest