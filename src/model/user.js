export default class User {
    constructor(name, email, password) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.passwordConfirm = null;
      this.role = null;
      this.telemovel = null;
      this.endereco = null;
    }
  }