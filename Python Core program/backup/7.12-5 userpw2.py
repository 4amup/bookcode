# -*- coding: utf-8 -*-
"""
Created on Tue Feb 23 15:49:07 2016

@author: lenovo
"""
import time
db = {}

def login():
    prompt = 'login desirred:'
    name = raw_input(prompt)
    if db.has_key(name):
        choice = raw_input("are you a new user?(y/n):")
        if choice == 'y':
        	newuser()
        elif choice == 'n'
        	olduser()
        else:
        	print "invalid option, try again"
    else:
    	olduser()
def newuser():
    prompt = 'login desirred:'
    while True:
        name = raw_input(prompt)
        pwd = raw_input('passwd:')
    	db[name] = pwd, time.ctime()
    
def olduser():
    name = raw_input('login:')
    pwd = raw_input('passwd:')
    passwd = db.get(name)
    if passwd == pwd:
        print 'welcome back', name
    else:
        print 'login incorrect'
        
def manage():
    prompt = """
    (D)elete a User
    (V)iew all User
    Enter choice:"""
    while True:
        while True:
            try:
                choice = raw_input(prompt).strip()[0].lower()
                except (EOFError, KeyboardInterrupt, IndexError):
                    choice = 'q'	            
                    print '\nYou picked: [%s]' % choice
                if choice not in 'devq':
                    print 'invalid option, try again'
                else:
                    break
	       
        if choice == 'q':
       	break
        if choice == 'd':
        	delete()
        if choice == 'v':
        	view()
          
def delete():
	pass

def view():
	pass

def showmenu():
    prompt = """
    (U)ser Login
    (M)anage User's Login and passwd
    (Q)uit
    Enter choice:"""
    done = False
    while not done:
        chosen = False
        while not chosen:
            try:
                choice = raw_input(prompt).strip()[0].lower()
            except(EOFError, KeyboardInterrupt):
                choice = 'q'
            print('\nYou picked: [%s]' % choice)
            if choice not in 'umq':
                print 'invalid option, try again'
            else:
                chosen = True
                
        if choice == 'q':done = True
        if choice == 'u':newuser()
        if choice == 'm':manage()

if __name__ == '__main__':
	showmenu()