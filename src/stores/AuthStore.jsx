import { makeAutoObservable } from 'mobx';

class AuthStore {
  currentState = 'Sign Up';
  isAuthenticated = false;
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  async authenticate(email, password) {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        this.setAuthenticated(true);
        this.setUser(data.user);
      } else {
        this.setAuthenticated(false);
        this.setUser(null);
      }
    } catch (error) {
      console.error(error);
      this.setAuthenticated(false);
      this.setUser(null);
    }
  }

  setCurrentState(state) {
    this.currentState = state;
  }

  setAuthenticated(val) {
    this.isAuthenticated = val;
  }

  setUser(user) {
    this.user = user;
  }

  logout() {
    this.setAuthenticated(false);
    this.setUser(null);
  }
}

const authStore = new AuthStore();
export default authStore;