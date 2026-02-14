const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes'); // Adjust the path as necessary
const chatRoutes = require('./chatRoutes');
const messageRoutes = require('./messageRoute');
const settingsRoutes = require('./settingsRoute');
const authRoutes = require('./authRoutes');
const departmentRoutes = require('./departmentRoutes');
const uploadRoutes = require('./uploadRoutes');

// Mount the specific routers to this parent router
router.use('/auth', authRoutes);
router.use('/department', departmentRoutes);
router.use('/user', userRoutes);
router.use('/chat', chatRoutes);
router.use('/message', messageRoutes);
router.use('/settings', settingsRoutes);
router.use('/upload', uploadRoutes);

// You can add more routes or routers here as needed
const allRoutes = router;
module.exports = allRoutes;