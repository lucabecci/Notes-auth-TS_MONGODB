export interface IChecks {
  checkCamps: (title: string, description: string, category: string) => boolean;
  checkID: (id: string) => boolean;
  checkRegister: (
    name: string,
    username: string,
    email: string,
    password: string
  ) => boolean;
  checkLogin: (email: string, password: string) => boolean;
  checkPassword: (password: string) => boolean;
}

class Checks {
  public checkCamps(
    title: string,
    description: string,
    category: string
  ): boolean {
    if (title == null || description == null || category == null) {
      return true;
    } else {
      return false;
    }
  }

  public checkID(id: string): boolean {
    if (id == null || id.length < 24) {
      return true;
    } else {
      return false;
    }
  }

  public checkRegister(
    name: string,
    username: string,
    email: string,
    password: string
  ): boolean {
    if (name == null || username == null || email == null || password == null) {
      return true;
    } else {
      return false;
    }
  }

  public checkLogin(email: string, password: string): boolean {
    if (email == null || password == null) {
      return true;
    } else {
      return false;
    }
  }

  public checkPassword(password: string): boolean {
    if (password.length < 6) {
      return true;
    } else {
      return false;
    }
  }
}

export default Checks;
