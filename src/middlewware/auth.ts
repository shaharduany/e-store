import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import dotenv from "dotenv";
import { googleClient, googleSecret } from "../lib/secrets";
import { Router } from "express";
import User from "../models/user";
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
						role: choosenRole[0].getDataValue("id")
					},
				});
				return done(null, newUser);
			} catch (err) {
				console.log(err);	
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id: number | undefined, done) => {
	const user = await User.findByPk(id);
	done(null, user);
});

const router = Router();

router.get(
	"/api/auth/login/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		failureRedirect: "/wrong",
		successRedirect: "/",
	})
);

router.get("/api/auth/logout", (req, res, next) => {
	req.logout({ keepSessionInfo: false}, () => console.log("logged out"));
})

export default router;
