import { Request, Response } from "express";
import fs from "fs";
import { IUser } from "../types/user";

export class UserController {
  getUsers(req: Request, res: Response) {
    const users: IUser[] = JSON.parse(
      fs.readFileSync("./db/users.json", "utf-8")
    );
    res.status(200).send({ users });
    console.log(`Succesed{users}`);
  }

  getUserId(req: Request, res: Response) {
    const users: IUser[] = JSON.parse(
      fs.readFileSync("./db/users.json", "utf-8")
    );
    const { id } = req.params;
    const data = users.find((item) => item.id == parseInt(id));
    if (data) {
      res.status(200).send({ user: data });
    } else {
      res.status(404).send({ massage: "User not found !" });
    }
  }

  addUser(req: Request, res: Response) {
    const users: IUser[] = JSON.parse(
      fs.readFileSync("./db/users.json", "utf-8")
    );
    const id = Math.max(...users.map((item) => item.id)) + 1;
    const { name, email, password } = req.body;
    const newData: IUser = { id, name, email, password };

    users.push(newData)

    fs.writeFileSync("./db/users.json", JSON.stringify(users), "utf-8")

    console.log(id);
    console.log(req.body);
    res.status(200).send(newData);
  }
}
