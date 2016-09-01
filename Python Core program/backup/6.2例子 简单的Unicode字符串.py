# -*- coding: utf-8 -*-
"""
Created on Wed Feb 03 09:11:54 2016

@author: lenovo
"""

"""
An example of reading and writing Unicode string:
Writes a Unicode string to a file in utf-8 and reads it back in.
"""
CODEC = 'utf-8'
FILE = 'unicode.txt'

hello_out = u'Hello world\n'
bytes_out = hello_out.encode(CODEC)
f = open(FILE, 'w')
f.write(bytes_out)
f.close()

f = open(FILE, 'r')
bytes_in = f.read()
f.close()
hello_in = bytes_in.decode(CODEC)
print hello_in