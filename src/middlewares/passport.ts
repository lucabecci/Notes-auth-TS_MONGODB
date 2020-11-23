import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";

import config from "../config/config";
import User from "../models/User";
class Passport {
  _opts: StrategyOptions;
  _strategy: Strategy;
  constructor() {
    this._opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.JWT_KEY,
    };
    this._strategy = new Strategy(this._opts, async (payload, done) => {
      try {
        const user = await User.findById(payload.id);
        if (user) {
          return done(null, user.id);
        }
        return done(null, false);
      } catch (e) {
        console.log(e);
      }
    });
  }
}

const passportStrategy = new Passport();

export default passportStrategy._strategy;
