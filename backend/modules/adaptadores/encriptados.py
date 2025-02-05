from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

class PasswordAdapter:
    def __init__(self):
        self._hasher = PasswordHasher()

    def encrypt(self, password):
        return self._hasher.hash(password)

    def verify(self, password_ingresada, password_encriptada):
        try:
            return self._hasher.verify(password_encriptada, password_ingresada)
        except VerifyMismatchError:
            return False

