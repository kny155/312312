import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { TOKEN_SECRET } from '../../config.json';

import { User } from '../model';

export default passport => {
	const jwtOptions = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
		secretOrKey: TOKEN_SECRET,
	};
	passport.use(
		'jwt',
		new JwtStrategy(jwtOptions, (payload, done) => {
			User.findById(payload.id)
				.then(user => {
					return done(null, user);
				})
				.catch(error => {
					return done(error, false);
				});
		}),
	);
};
