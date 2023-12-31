export default class UserInfo {
  constructor(nameSelector, jobSelector, avatar) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatar);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._job.textContent = about;
  }
  setAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}
