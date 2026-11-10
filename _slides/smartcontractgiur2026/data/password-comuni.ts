// Very common passwords, used by <PasswordCheck /> and <DictionaryAttack />.
// A short sample of the well-known global lists plus a few typically Italian ones. It is not a ranking:
// the UI calls them only "password molto diffuse". <DictionaryAttack /> tries them in this order,
// so 'sunshine' (its default target) is found at try 20.

export const passwordComuni: string[] = [
  '123456', 'password', '123456789', '12345678', '12345', 'qwerty', '1234567', '111111',
  '1234567890', '123123', 'abc123', '1234', 'password1', 'iloveyou', '1q2w3e4r', '000000',
  'qwerty123', 'zaq12wsx', 'dragon', 'sunshine', 'princess', 'letmein', '654321', 'monkey',
  '1qaz2wsx', '123321', 'qwertyuiop', 'superman', 'asdfghjkl', 'admin', 'welcome', 'football',
  'baseball', 'master', 'shadow', 'michael', '666666', '121212', 'trustno1', 'starwars',
  'passw0rd', 'qazwsx', '987654321', '112233', 'hello', 'freedom', 'whatever', 'charlie',
  // typically Italian
  'juventus', 'napoli', 'milan', 'inter', 'roma', 'lazio', 'forzajuve', 'forzanapoli',
  'ciao', 'ciaociao', 'amore', 'amoremio', 'francesca', 'andrea', 'giuseppe', 'alessandro',
]
