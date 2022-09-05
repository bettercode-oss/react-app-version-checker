const STORAGE_KEY = 'bettercode.version.checker:app-version'
const DEFAULT_VERSION = 1

class AppVersionStorage {
  static getAppVersion() {
    const version = this.getCookieValue(STORAGE_KEY)
    if (version) {
      return Number.parseInt(version)
    } else {
      this.setDefaultAppVersion()
      return Number.parseInt(this.getCookieValue(STORAGE_KEY))
    }
  }

  static getCookieValue(key) {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${key}=`))
      ?.split('=')[1]
  }

  static setCookieValue(key, value) {
    document.cookie = `${key}=${value}; path=/`
  }

  static setAppVersion(version) {
    this.setCookieValue(STORAGE_KEY, version)
  }

  static setDefaultAppVersion() {
    this.setCookieValue(STORAGE_KEY, DEFAULT_VERSION)
  }

  static equalVersion(version) {
    const versionInStorage = this.getAppVersion()
    return versionInStorage === version
  }
}

export default AppVersionStorage
