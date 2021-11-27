const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const httpStatus = require('http-status');
const config = require('../config/config');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');

// setup google auth
const oauth2Client = new google.auth.OAuth2(
  config.ggClientId,
  config.ggClientSecret,
  config.ggRedirectUri
);

oauth2Client.setCredentials({ refresh_token: config.ggRefreshToken });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

/**
 * Set public for url
 * @param {string} fileId
 */
const setFilePublic = async (fileId) => {
  try {
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    return await drive.files.get({
      fileId,
      fields: 'webViewLink, webContentLink',
    });
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      httpStatus['500_MESSAGE']
    );
  }
};

/**
 * Upload a file to drive
 * @param {object} file
 */
const uploadFile = async (file) => {
  const filePath = file.path;
  try {
    const createFile = await drive.files.create({
      requestBody: { name: file.filename },
      media: {
        body: fs.createReadStream(
          path.join(__dirname, `/../${filePath}`),
          'utf8'
        ),
      },
    });

    // remove file
    fs.unlinkSync(filePath);

    const getUrl = await setFilePublic(createFile.data.id);

    return getUrl.data;
  } catch (error) {
    logger.error('Imgae upload not successfully: ', error);
    fs.unlinkSync(filePath);
  }
};

/**
 * Get all images from drive
 */
const getAllImages = async () => {
  const images = (
    await drive.files.list({
      includePermissionsForView: 'published',
      fields: 'files/id, files/name, files/webViewLink',
    })
  ).data;
  return images;
};

/**
 * Delete a file from drive
 * @param {string} imageId
 */
const deleteFile = async (imageId) => {
  await drive.files.delete({ fileId: imageId });
};

module.exports = { uploadFile, deleteFile, getAllImages };
