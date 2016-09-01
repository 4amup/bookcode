# -*- coding: utf-8 -*-
"""
Created on Fri Jan 29 13:48:47 2016

@author: lenovo
"""

#孩子们的成绩问题，分等级为A B C D...
score = int(raw_input('Enter a score of students:'))
if 90 <= score <= 100:
    print """This student's score is A!"""
elif 80 <= score < 89:
    print """This student's score is B!"""
elif 70 <= score < 79:
    print """This student's score is C!"""
elif 60 <= score < 69:
    print """This student's score is D!"""
else:
    print """This student's score is F!"""