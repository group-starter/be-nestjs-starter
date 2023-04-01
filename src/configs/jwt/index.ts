import * as jwt from 'jsonwebtoken'

const privateKey = process.env.PRIVATE_KEY || 'private.key'
const expiresIn = process.env.EXPIRES_IN || '7d'

class JWTService {
  signPromise(payload): Promise<string> {
    return new Promise(function (resolve, reject) {
      jwt.sign(payload, privateKey, { expiresIn }, (err, token) => {
        if (err) {
          reject(err)
        }
        resolve(token)
      })
    })
  }

  verifyPromise(token): Promise<{ _id: string }> {
    return new Promise(function (resolve, reject) {
      jwt.verify(token, privateKey, (err, decode) => {
        if (err) {
          reject(err)
        }
        resolve(decode)
      })
    })
  }
}

const JWTServiceInstance = new JWTService()

export { JWTServiceInstance }
