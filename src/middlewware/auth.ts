import passport, { use } from "passport";
import passportGoogle from "passport-google-oauth20";
import dotenv from "dotenv";
import { GOOGLE_CLIENT, GOOGLE_SECRET } from "../lib/secrets";
import User from "../models/user";

dotenv.config();

const GoogleStrategy = passportGoogle.Strategy;

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT,
			clientSecret: GOOGLE_SECRET,
			callbackURL: "/auth/google/callback",
		},
		async (accessToken, refreshToken, profile, done) => {
			const [newUser, created] = await User.findOrCreate({
				where: {
					gooogleId: profile.id,
				},
				defaults: {
					email: profile.emails?.[0].value,
					Image: profile.photos?.[0].value,
					username: profile.displayName,
				},
			});
			return done(null, newUser);
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
