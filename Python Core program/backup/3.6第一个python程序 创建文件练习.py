# -*- coding: utf-8 -*-
"""
Created on Sun Jan 24 11:24:19 2016

@author: lenovo
"""

'makeTextFile.py--Create text file'

import os
ls = os.linesep     #this is a variable's atrribute, not a function!

# get filename
while True:
    fname = raw_input('Enter filename: ')
    if os.path.exists(fname):
        print "ERROR: '%s' already exists" %fname
    else:
        break

# get file content(text) lines
al = []
print "\nEnter lines ('.' by itself to quit).\n"

# loop untill user terminates input
while True:
    entry = raw_input('> ')
    if entry == '':
        break
    else:
        al.append(entry)
        
# write lines to file with proper line-ending
fobj = open(fname, 'w')
fobj.writelines(['%s%s' % (x, ls) for x in al])
fobj.close()
print 'DONE!'