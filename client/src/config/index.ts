interface BaseConfig {
    baseApi: string
    mockBaseApi: string
  }
  
  interface EnvConfig {
    development: BaseConfig
    production: BaseConfig
  }
  
  class AllConfig {
    env!: keyof EnvConfig
    isMock = false
    baseApi!: string
    mockBaseApi!: string
  }
  
  class EnvConfigClass {
    static envConfigClass: EnvConfigClass = new EnvConfigClass()
    readonly curEnv = (import.meta.env.MODE === 'development' ? 'development' : 'production') || 'production'
    envConfig!: EnvConfig
    allConfig!: AllConfig
  
    constructor() {
      this.initEnvConfig()
      this.getAllConfig()
    }
  
    initEnvConfig() {
      this.envConfig = {
        development: {
          baseApi: import.meta.env.VITE_BASE_URL,
          mockBaseApi: '/mock-api',
        },
        production: {
          baseApi: '/dang', // TODO: change to your production base api
          mockBaseApi: '',
        },
      }
    }
  
    getAllConfig() {
      this.allConfig = {
        env: this.curEnv,
        isMock: false, // HACK: mock default is false
        ...this.envConfig[this.curEnv],
      }
    }
  }
  
  export default EnvConfigClass.envConfigClass.allConfig
  