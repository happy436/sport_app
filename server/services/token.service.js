import jwt from "jsonwebtoken";
import config from "config";
import Token from "../models/Token.js";

class TokenService {
	generate(payload) {
		const accessToken = jwt.sign(payload, config.get("accessSecret"), {
			expiresIn: "1h",
		});

		const refreshToken = jwt.sign(payload, config.get("refreshSecret"));

		return {
			accessToken,
			refreshToken, 
			expiresIn: 3600,
		};
	}

	async save(userId, refreshToken) {
		const data = await Token.findOne({ user: userId });
		if (data) {
			data.refreshToken = refreshToken;
			return data.save();
		}

		const token = await Token.create({ user: userId, refreshToken });
		return token;
	}

	validateRefresh(refreshToken) {
		try {
			return jwt.verify(refreshToken, config.get("refreshSecret"));
		} catch (error) {
			return null;
		}
	}

	validateAccess(accessToken) {
		try {
			return jwt.verify(accessToken, config.get("accessSecret"));
		} catch (error) {
			return null;
		}
	}

	async findToken(refreshToken) {
		try {
			return await Token.findOne({ refreshToken });
		} catch (error) {
			return null;
		}
	}
}

const tokenService = new TokenService();
export default tokenService;
