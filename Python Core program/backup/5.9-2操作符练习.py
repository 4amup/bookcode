# -*- coding: utf-8 -*-
"""
Created on Fri Jan 29 13:35:37 2016

@author: lenovo
"""

'写一段代码显示两个数的乘积，函数实现后并调用'
# 功能函数
def multiplication(x, y):
    result = x * y
    return result
    
# 调用上述函数
if __name__ == "__main__":
    x = input('input a num:')
    y = input('input a num:')
    print 'x*y=', multiplication(x, y)