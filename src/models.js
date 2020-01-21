"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
        addAsync({ type, payload: value }, { getState, pick, save }) {
            return __awaiter(this, void 0, void 0, function* () {
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
            });
        },
        saveAsync(action, { getState, pick, save }) {
            return __awaiter(this, void 0, void 0, function* () {
                return fetch("/mock")
                    .then(response => response.json())
                    .then(data => {
                    save({ num: data.saveNum });
                    save({ desc: { num: data.saveNum } });
                })
                    .catch(e => {
                    console.error("fetch error:", e);
                });
            });
        }
    }
};
exports.numberModel = numberModel;
const userModel = {
    namespace: "user",
    state: {
        name: "zhangsan",
        num: 0
    },
    actionCreators: {
        saveOther(action, { getState, pick, save }) {
            return __awaiter(this, void 0, void 0, function* () {
                return fetch("/mock")
                    .then(response => response.json())
                    .then(data => {
                    save({ num: data.saveNum + pick("num", "number") }, "number");
                })
                    .catch(e => {
                    console.error("fetch error:", e);
                });
            });
        }
    }
};
exports.userModel = userModel;
