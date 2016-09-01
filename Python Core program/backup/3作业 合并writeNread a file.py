# -*- coding: utf-8 -*-
"""
Created on Wed Jan 27 11:11:51 2016

@author: lenovo
"""

import os
ls = os.linesep     #this is a variable's atrribute, not a function!

# get filename being a function
def write():
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

# get filename being a function
def read():
    fname = raw_input('Enter filename: ')
    print
    
    #attempt to open file for reading
    try:
        fobj = open(fname, 'r')
    except IOError, e:
        print "*** file open error:", e
    else:
        #display contents to the screen
        for eachline in fobj:
            print eachline,
        fobj.close()
# main part
if __name__ == '__main__':
    print 'please select: write or read a file.'
    choice = raw_input('input(w/r):')
    if choice == 'w':
        write()
    elif choice == 'r':
        read()
    else:
        print 'please input the right order!'