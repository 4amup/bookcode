# -*- coding: utf-8 -*-
"""
Created on Thu Feb 04 18:52:41 2016

@author: lenovo
"""
eng = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
num = int(input('Enter a num(0~1000):'))
lst = []
temp = num
while temp != 0:
    lst.append(temp % 10)
    temp /= 10
    
lst.reverse()#reverse和sort方法在列表中是没有返回值的，直接原地执行操作，并没有返回值
#print lst #test
for i in lst:
    output = eng[i]
    print output+'-',