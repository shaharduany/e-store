import { Router } from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const router = Router();
const clientId = process.env.GOOGLE_CLIENT; 
const clientSecret = process.env.GOOGLE_SECRET;

console.log(`clientid: ${clientId} \n clientSecret: ${clientSecret}`);
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

let auth = false;

router.get("/", async function (req, res) {
	let oauth2 = google.oauth2({ auth: oauth2Client, version: "v2" });
	if (auth) {
		let userInfo = await oauth2.userinfo.v2.me.get();
		console.log(userInfo);
		res.send(userInfo);
	} else {
		res.redirect(redirectUrl);
	}
});

router.get("/auth/google/callback", async function (req, res) {
	const code = req.query.code!;
	if (code) {
		const { tokens } = await oauth2Client.getToken(code.toString());
		oauth2Client.setCredentials(tokens);
		auth = true;
	}
	res.redirect("/");
});

router.get("/logout", (req, res) => {
	oauth2Client.revokeCredentials().then((r) => console.log("revoke ", r));
	auth = false;
	res.redirect("/");
});

export default router;
