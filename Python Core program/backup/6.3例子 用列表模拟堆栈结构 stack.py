# -*- coding: utf-8 -*-
"""
Created on Wed Feb 03 15:45:04 2016

@author: lenovo
"""

stack = []

def pushit():
    stack.append(raw_input('Enter New string:').strip())
def popit():
    if len(stack) == 0:
        print 'Cannot pop from an empty stack!'
    else:
        print 'Remove [',`stack.pop()`,']'      #``反引号代替repr（）函数，作用是将对象变为字符串形式，反义词是eval（）
def viewstack():
    print stack     #calls str() internally(内部的)

CMDs = {'u':pushit, 'o':popit, 'v':viewstack}

def showmenu():
    pr = """
    p(U)sh
    p(O)p
    (V)iew
    (Q)uit
    
    Enter choice: """
    
    while True:
        while True:
            try:
                choice = raw_input(pr).strip()[0].lower()
            except (EOFError, KeyboardInterrupt, IndexError):
                choice = 'q'
            
            print '\nYou picked: [%s]' % choice
            if choice not in 'uovq':
                print 'Inviad option, try again'
            else:
                break
        
        if choice == 'q':
            break
        CMDs[choice]()
        
if __name__ == '__main__':
    showmenu()