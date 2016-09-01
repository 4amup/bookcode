#!/usr/bin/env python
#-*coding: utf-8*-
f=open('xcount.py')
exec f

print f.tell()
#这个结果是84，告诉我们现在其实就是在文件的末尾EOF

from os.path import getsize

print getsize('xcount.py')
#这个结果告诉我们文件是84长度的
f.seek(0)
#让执行重新回到文件开头，seek(0)
exec f