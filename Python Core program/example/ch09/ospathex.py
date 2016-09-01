#!/usr/bin/env python
# -*- coding: utf-8 -*- 

import os
for tmpdir in ('/tmp', r'c:\temp'):
	if os.path.isdir(tmpdir): #指定目录是否存在且为一个目录
		break
else:
	print 'no temp directory availiable'
	tmpdir = ''

if tmpdir:
	os.chdir(tmpdir) #改变当前工作目录，类似terminal的cd命令
	cwd = os.getcwd() #返回当前工作的目录
	print '*** current temporary directory' #单词directory 目录的意思
	print cwd

	print '*** creating example directory...'
	os.mkdir('example')
	os.chdir('example')
	cwd = os.getcwd()
	print '*** new working directory:'
	print cwd
	print '*** original directory listing:'
	print os.listdir(cwd)
	print '*** creating test file...'
	fobj = open('test', 'w')
	fobj.write('foo\n')
	fobj.write('bar\n')
	fobj.close()
	print '*** updated directory listing:'
	print os.listdir(cwd)

	print "*** renaming 'test' to 'filetest.txt'"
	os.rename('test', 'filename.txt')
	print '*** updated directory listing:'
	print os.listdir(cwd)

	path = os.path.join(cwd, os.listdir(cwd)[0])
	print '*** full file pathname'
	print path
	print '*** (pathname, basename) =='
	print os.path.split(path)
	print '*** (filename, extension) =='
	print os.path.splitext(os.path.basename(path))

	print '*** displaying file contents:'
	fobj = open(path)
	for eachLine in fobj:
		print eachLine,
	fobj.close()

	print '*** deleting test file'
	os.remove(path)
	print '*** updated directory listing:'
	print os.listdir(cwd)
	os.chdir(os.pardir)
	print '*** deleting test directory'
	os.rmdir('example')
	print '*** DONE'