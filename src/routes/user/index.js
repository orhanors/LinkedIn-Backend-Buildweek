const router = require("express").Router();
const {
	signup,
	login,
	profileGetAll,
	profileGetSingle,
	profileEdit,
	profileDelete,
	profileUploadImage,
} = require("../../controller/userController");
const {
	userSignupSchema,
	validateBody,
	userLoginSchema,
	userEditSchema,
} = require("../../middlewares/validator");

const passport = require("../../middlewares/passport");

const cloudinaryMulter = require("../../middlewares/cloudinary");

// AUTH
router.post("/auth/signup", validateBody(userSignupSchema), signup);
router.post(
	"/auth/login",
	validateBody(userLoginSchema),
	passport.authenticate("local", { session: false }),
	login
);

//PROFILE
router.get("/", profileGetAll);
router.get("/:userId", profileGetSingle);
router.put("/:userId", validateBody(userEditSchema), profileEdit);
router.post(
	"/:userId/picture",
	cloudinaryMulter.single("profile"),
	profileUploadImage
);
router.delete("/:userId", profileDelete);

//TEST ROUTE
router.get(
	"/secret",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		try {
			res.send("OK");
		} catch (error) {
			next(error);
		}
	}
);
module.exports = router;
