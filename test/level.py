import math

p = 1.1/2

def f(xp):
	return math.pow(xp, p) / 3

def f_(level):
	return math.exp(math.log(3 * level) / p)

for i in range(1, 100):
	print("level :", i, " xp :", math.floor(f_(i)))