import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import dotenv from "dotenv";
import { googleClient, googleSecret } from "../lib/secrets";
import { Router } from "express";
import User, { UserI } from "../models/user";
import { getAdminRole, getCostumerRole } from "../models/role";

dotenv.config();

const GoogleStrategy = passportGoogle.Strategy;

passport.use(
	new GoogleStrategy(
		{
			clientID: googleClient,
			clientSecret: googleSecret,
			callbackURL: "/auth/google/callback",
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const costRole = await getCostumerRole();
				const adminRole = await getAdminRole();
				let choosenRole = costRole;
				if(profile.emails?.[0].value === "shahar.duany@gmail.com"){
					choosenRole = adminRole;
				}

				const [newUser, created] = await User.findOrCreate({
					where: {
						googleId: profile.id,
					},
					defaults: {
						email: profile.emails?.[0].value,
						image: profile.photos?.[0].value,
						username: profile.displayName,
						role: choosenRole.getDataValue("id")
					},
				});
				return done(null, newUser);
			} catch (err) {
				console.log(err);	
			}
		}
	)
);

interface UserPass {
	email: string;
	id: number;
	username: string;
}

passport.serializeUser((user, done) => {
	const userValues = {
		id: user.getDataValue("id"),
		email: user.getDataValue("email"),
		username: user.getDataValue("username"),
	};

	return done(null, userValues);
});

passport.deserializeUser(async (userVal: UserPass,  done) => {
	console.log(`deserialize id: ${userVal.id} email: ${userVal.email}`);
	const user = await User.findByPk(userVal.id);
	if(!user){
		console.log("!user in deserialize");
		return done(null, false);
	}
	return done(null, user);
});

const router = Router();

router.get(
	"/api/auth/login/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		failureRedirect: "http://localhost:3000/",
		successRedirect: "http://localhost:3000/",
	}),
	(req, res) => {
		req.session.save();
	}
);

router.get("/api/auth/logout", (req, res, next) => {
	req.logout({ keepSessionInfo: false}, () => console.log("logged out"));
	res.status(201).json({
		message: "user logged out"
	});
})

export default router;
