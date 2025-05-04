const validateRequest =
	(schema, source = "body") =>
	(req, res, next) => {
		try {
			const { error } = schema.validate(req[source], {
				abortEarly: false,
			});
			if (error) {
				return res.status(400).json({
					status: "error",
					message: "Validation failed",
					errors: error.details.map((detail) => ({
						field: detail.path.join("."),
						message: detail.message,
					})),
				});
			}
			next();
		} catch (err) {
			next(err);
		}
	};

module.exports = validateRequest;
