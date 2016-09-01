# -*- coding: utf-8 -*-
"""
Created on Thu Feb 04 15:15:11 2016

@author: lenovo
"""
#enter a number
#出现bug的原因是列表的可变性，index随时变化，并么有对应的那个被移除。
num_str = raw_input('Enter a number: ')
#工厂函数定义为整形数
num_num = int(num_str)
#定义了一个列表，利用range内建函数，1~num_num都在列表里面
fac_list = range(1, num_num + 1)
print "BEFORE:", `fac_list`
i = 0
while i < len(fac_list):
    if num_num % fac_list[i] == 0:
        del fac_list[i]
    else:
        i = i + 1
print "AFTER:", `fac_list`