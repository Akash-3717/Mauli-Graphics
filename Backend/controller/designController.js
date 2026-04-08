const Design = require('../model/desing');

const normalizeImagePath = (filePath = '') => filePath.replace(/\\/g, '/');

const buildImageUrl = (req, filePath = '') => {
	if (!filePath) return '';
	if (/^https?:\/\//i.test(filePath)) return filePath;
	
	// Use X-Forwarded-Proto for proper HTTPS detection behind proxies
	const protocol = req.get('X-Forwarded-Proto') || req.protocol || 'https';
	const host = req.get('X-Forwarded-Host') || req.get('host');
	
	const normalizedPath = normalizeImagePath(filePath).replace(/^\//, '');
	return `${protocol}://${host}/${normalizedPath}`;
};

exports.addDesign = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: 'Image is required. Send multipart/form-data with file key "image".' });
		}

		const newDesign = new Design({
			title: req.body.title,
			description: req.body.description,
			category: req.body.category,
			image: normalizeImagePath(req.file.path),
		});

		const savedDesign = await newDesign.save();
		return res.status(201).json({
			...savedDesign.toObject(),
			imageUrl: buildImageUrl(req, savedDesign.image),
		});
	} catch (err) {
		return res.status(400).json({ message: err.message });
	}
};

exports.getAllDesigns = async (req, res) => {
	try {
		const designs = await Design.find();
		const mapped = designs.map((design) => ({
			...design.toObject(),
			image: normalizeImagePath(design.image),
			imageUrl: buildImageUrl(req, design.image),
		}));

		return res.status(200).json(mapped);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.deleteDesign = async (req, res) => {
	try {
		const deletedDesign = await Design.findByIdAndDelete(req.params.id);

		if (!deletedDesign) {
			return res.status(404).json({ message: 'Design not found' });
		}

		return res.status(200).json({
			message: 'Design deleted successfully',
			design: deletedDesign,
		});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};
