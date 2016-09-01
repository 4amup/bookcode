# -*- coding: utf-8 -*-
"""
Created on Thu Feb 04 09:51:08 2016

@author: lenovo
"""
import copy
person = ['name', ['saving', 100.00]]
hubby = person
wifey = copy.deepcopy(person)
print [id(x) for x in person, hubby, wifey]
hubby[0] = 'joe'
wifey[0] = 'jane'
print hubby, wifey
hubby[1][1] = 50.00
print hubby, wifey  