import { Router, RequestHandler, NextFunction } from "express";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const router = Router();
const clientId = process.env.GOOGLE_CLIENT; 
const clientSecret = process.env.GOOGLE_SECRET;

const oauth2Client = new google.auth.OAuth2({
	redirectUri: "http://localhost:4000/auth/google/callback",
    clientId,
    clientSecret
});


const redirectUrl = oauth2Client.generateAuthUrl({
	access_type: "offline",
	prompt: "consent",
	scope: ["email", "profile"],
});


router.get("/api/login", async function (req, res) {
	let oauth2 = google.oauth2({ auth: oauth2Client, version: "v2" });
	if (req.session) {
		let userInfo = await oauth2.userinfo.v2.me.get();
		console.log(userInfo.headers);
		console.log(userInfo.config.headers);
		res.send(userInfo.config);
	} else {
		res.redirect(redirectUrl);
	}
});
 
router.get("/auth/google/callback", async function (req, res) {
	const code = req.query.code!;
	if (code) {
		const { tokens } = await oauth2Client.getToken(code.toString());
		console.log(`access token: ${tokens.access_token}`);
		oauth2Client.setCredentials(tokens);
	}
	res.redirect("/api/login");
});

router.get("/logout", (req, res) => {
	oauth2Client.revokeCredentials().then((r) => console.log("revoke ", r));
	res.redirect("/");
});

export default router;
