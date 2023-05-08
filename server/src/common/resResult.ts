enum Code {
  SUCCESS = 200,
  FAIL = 500,
}

class ResResult {
  static success(data: any, msg = '') {
    return {
      code: Code.SUCCESS,
      data,
      msg,
    };
  }

  static fail(data: any, msg = '') {
    return {
      code: Code.FAIL,
      data,
      msg,
    };
  }
}

const { success, fail } = ResResult;

export { success, fail };
