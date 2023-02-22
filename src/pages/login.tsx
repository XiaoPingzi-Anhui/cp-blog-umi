import React, { useState } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
// @ts-ignore
import { history } from "umi";

export default function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  async function submit() {
    try {
      const res = await fetch("/api/users", {
        method: "GET",
        // body: JSON.stringify({ email, password, name: "cp", avatarUrl: "" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("res:", res);
      console.log("res.json():", await res.json());
      const data = await res.json();
      setUserName(data?.[0]?.name || "weichaodao ");
      /* if (res.status !== 200) {
        console.error(await res.text());
        return;
      }
      const data = await res.json();
      alert(`欢迎回来，${data.name}`);
      history.push("/posts/create"); */
    } catch (err) {
      console.error(err);
      setUserName("chucuola");
    }
  }

  return (
    <div className="w-full flex justify-center">
      <div className="container lg:px-64 px-8 pt-16">
        <p className="text-3xl font-extrabold">用户登入</p>
        <div>{userName}</div>
        <div className="mt-8">
          <p>邮箱</p>
          <TextInput value={email} onChange={setEmail} />
          <p className="mt-4">密码</p>
          <TextInput value={password} onChange={setPassword} />
          <Button onClick={submit}>登入</Button>
        </div>
      </div>
    </div>
  );
}
