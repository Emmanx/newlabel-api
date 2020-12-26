module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'https://newlabel.onrender.com'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '9eaa89a785891e1123e126c4d12dfc3b'),
    },
  },
});
