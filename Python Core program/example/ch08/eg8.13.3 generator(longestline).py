# -*- coding: utf-8 -*-

f = open('motd.txt')
longest = max(len(x.strip())for x in f)
f.close()
print longest