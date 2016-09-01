# -*- coding: utf-8 -*-
"""
Created on Tue Feb 16 09:18:40 2016

@author: lenovo
"""

def findchar(string, char):
    if char in string:
        for i in range(len(string)):
            if string[i] == char:
                return i
    else:
        return -1

def rfindchar(string, char):
    if char in string:
        for i in range(len(string)-1, 0, -1):
            if string[i] == char:
                return i
    else:
        return -1

def subchr(string, origchar, newchar):
    if origchar in string:
        for i in range(len(string)):
            if string[i] == origchar:
                return string.replace(origchar, newchar)
    else:
        return string
print subchr('wearehg', 'e', 'x')