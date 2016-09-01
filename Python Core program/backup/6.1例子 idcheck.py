# -*- coding: utf-8 -*-
"""
Created on Tue Feb 02 11:20:04 2016

@author: lenovo
"""

import string

#将模块中的函数变成常用的函数
alphas = string.letters + '_'
nums = string.digits
#print alphas, nums
#以上测试上面两个列表能否正常显示
print 'Welcome to the Identifier Checker v1.0'
print 'Testees must be a least 2 chars long.'
myInput = raw_input('Identifier to test?')

if len(myInput) > 1:
    
    if myInput[0] not in alphas:
        print """invalid: first symbol must be
            alphabetic"""
    else:
        for otherChar in myInput[1:]:
            
            if otherChar not in alphas + nums:
                print """invalid: remaining
                    symbols must be alphanumetic"""
                break
        else:
            print 'okay as an identifier'   #for-else解耦股后续会继续介绍