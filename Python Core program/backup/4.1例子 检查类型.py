# -*- coding: utf-8 -*-
"""
Created on Wed Jan 27 14:55:33 2016

@author: lenovo
"""
#check type
def DisplayNumType(num):
    print num, 'is',
    if isinstance(num, (int, long, float, complex)):
        print 'a number of type', type(num).__name__    #这种自生成函数还是不太熟悉，以后要注意多学习
    else:
        print 'not a number at all!'
while True:
    num = input('input:')
    if num == '':
        break
    else:
        DisplayNumType(num)