import random
import hashlib

ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

class Hash():
  
  def __init__(self, password):
    self.salt = Hash.makeSalt()
    self.hash = self.getHash(password)
  
  def __init__(self, password, salt):
    self.salt = salt
    self.hash = self.getHash(password)

  def getHash(self, password):
    return hashlib.sha256((password + self.salt).encode()).hexdigest()

  def get(self):
    return self.hash, self.salt

  def randomString(n):
    chars = []
    for _ in range(n):
      chars.append(random.choice(ALPHABET))
    return "".join(chars)

  def makeToken():
    return Hash.randomString(25)

  def makeSalt():
    return Hash.randomString(10)

