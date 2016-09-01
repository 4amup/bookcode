# -*- coding: utf-8 -*-
"""
Spyder Editor

This temporary script file is located here:
C:\Users\lenovo\.spyder2\.temp.py
"""
albums = ['tales','robot', 'pyramid' ]  #pyramid n. 金字塔；角锥体vi. 渐增；上涨；成金字塔状vt. 使…渐增；使…上涨；使…成金字塔状
for i, album in enumerate(albums):
    print i, album
fn = ['ian', 'stuart', 'david']
ln = ['bairnson', 'elliott', 'paton']
for i, j in zip(fn, ln):
    print('%s %s' % (i, j)).title()