# -*- coding: utf-8 -*-
"""
Created on Tue Feb 02 13:59:17 2016

@author: lenovo
"""

from string import Template
s = Template('There are ${howmany} ${lang} Quotation Symbols')

print s.substitute(lang = 'Python', howmany = 3)
print s.safe_substitute(lang = 'Python')
print s.substitute(lang = 'Python')