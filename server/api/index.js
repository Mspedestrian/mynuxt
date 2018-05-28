import { Router } from 'express'

import users from './users'
import message from './message'
import socket from './socket'
import user from './user'

const router = Router()

// Add USERS Routes
router.use(users)
router.use(message)
router.use(user)

export default router
