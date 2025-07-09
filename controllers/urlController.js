const { nanoid } = require('nanoid');
const Url = require('../models/Url');
const validateUrl = require('../utils/validateUrl');

const shortenUrl = async (req, res) => {
  const { url } = req.body;
  if (!validateUrl(url)) return res.status(400).json({ error: 'Invalid URL' });

  try {
    let shortCode = nanoid(6);
    const baseUrl = process.env.BASE_URL;

    // Ensure uniqueness
    while (await Url.findOne({ shortCode })) {
      shortCode = nanoid(6);
    }

    const newUrl = new Url({ originalUrl: url, shortCode });
    await newUrl.save();

    return res.json({ shortUrl: `${baseUrl}/${shortCode}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const redirectUrl = async (req, res) => {
  const { code } = req.params;
  console.log(code)
  try {
    const urlEntry = await Url.findOne({ shortCode: code });

    if (!urlEntry) return res.status(404).json({ error: 'URL not found' });

    if (urlEntry.expiryDate && urlEntry.expiryDate < new Date()) {
      return res.status(410).json({ error: 'URL expired' });
    }

    urlEntry.clicks++;
    await urlEntry.save();
    return res.redirect(urlEntry.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { shortenUrl, redirectUrl };
