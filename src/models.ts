const numberModel = {
  namespace: "number",
  state: {
    num: 0,
    desc: {
      num: 0
    }
  },

  actionCreators: {
    add({ type, payload }, { getState, pick, save }) {
      const num = pick("num");
      save({ num: num + payload });
      return false;
    },
    async addAsync({ type, payload: value }, { getState, pick, save }) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 500);
      })
        .then(response => {
          const prevNum = pick("num");
          const otherName = pick("name", "user");
          console.log(prevNum, otherName);
          save({ num: value + prevNum });
        })
        .catch(e => {
          console.error("fetch error:", e);
        });
    },
    async saveAsync(action, { getState, pick, save }) {
      return fetch("/mock")
        .then(response => response.json())
        .then(data => {
          save({ num: data.saveNum });
          save({ desc: { num: data.saveNum } });
        })
        .catch(e => {
          console.error("fetch error:", e);
        });
    }
  }
};

const userModel = {
  namespace: "user",
  state: {
    name: "zhangsan",
    num: 0
  },

  actionCreators: {
    async saveOther(action, { getState, pick, save }) {
      return fetch("/mock")
        .then(response => response.json())
        .then(data => {
          save({ num: data.saveNum + pick("num", "number") }, "number");
        })
        .catch(e => {
          console.error("fetch error:", e);
        });
    }
  }
};

export { numberModel, userModel };
