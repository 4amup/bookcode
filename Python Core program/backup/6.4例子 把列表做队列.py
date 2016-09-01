# -*- coding: utf-8 -*-
"""
Created on Thu Feb 04 08:12:43 2016

@author: lenovo
"""

queue = []

def enQ():
    queue.append(raw_input('Enter New string:').strip())
def deQ():
    if len(queue) == 0:
        print 'Cannot pop from an empty queue!'
    else:
        print 'Remove [',`queue.pop(0)`,']'      #``反引号代替repr（）函数，作用是将对象变为字符串形式，反义词是eval（）
def viewQ():
    print queue     #calls str() internally(内部的)

CMDs = {'e':enQ, 'd':deQ, 'v':viewQ}

def showmenu():
    pr = """
    (E)nqueue
    (D)equeue
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
            if choice not in 'devq':
                print 'Inviad option, try again'
            else:
                break
        
        if choice == 'q':
            break
        CMDs[choice]()
        
if __name__ == '__main__':
    showmenu()