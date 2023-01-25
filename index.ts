import cloudbase from "@cloudbase/js-sdk";

/** 参考链接
 *  https://docs.cloudbase.net/api-reference/webv3/authentication
 *  sdk 版本 2.5.6-beta.1
 *
 *  */
const app = cloudbase.init({
  env: "xxxx-yyy",
  clientId: "xxxxx",
});

const auth = app.auth({ persistence: "local" });

const phoneNumber = "+86 13800000000";
// getVerfication 虽然报错 Property 'getVerification' does not exist on type 'App'，但是可以获取到验证码
const verification = await auth.getVerification({
  phone_number: phoneNumber,
});

const verificationCode = "000000";
// verify 虽然报错 Property 'verify' does not exist on type 'App'， 但是可以获取到 verification_token
const verificationTokenRes = await auth.verify({
  verification_id: verification.verification_id,
  verification_code: verificationCode,
});

//signIn也是这样
if (verification.is_user) {
  await auth.signIn({
    username: phoneNumber,
    verification_token: verificationTokenRes.verification_token,
  });
} else {
  //signUp也是这样
  await auth.signUp({
    phone_number: phoneNumber,
    verification_code: verificationCode,
    verification_token: verificationTokenRes.verification_token,
    // 可选，设置昵称
    name: "手机用户",
    // 可选，设置密码
    password: "password",
    // 可选，设置登录用户名
    username: "username",
  });
}
