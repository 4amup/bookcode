valid = False
count = 3
while count > 0:
	Input = raw_input("enter password:")
	# check for valid passwd
	for eachPasswd in passwdList:
		if Input == eachPasswd:
			valid = True
			break
	if not valid:
		print "invalid Input"
		count -= 1
		continue
	else:
		break