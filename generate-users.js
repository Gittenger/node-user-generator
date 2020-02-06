const fs = require("fs");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");

//get names and mail clients
const names = JSON.parse(fs.readFileSync(`${__dirname}/names.json`, "utf-8"));
const mailers = JSON.parse(
  fs.readFileSync(`${__dirname}/mailers.json`, "utf-8")
);

//get random array index from retrieved data
const getIndex = type =>
  type == "first"
    ? Math.floor(Math.random() * names.first.length)
    : type == "last"
    ? Math.floor(Math.random() * names.last.length)
    : Math.floor(Math.random() * mailers.options.length);

//pass in first name, get email string with firstName@mailClient.com
const generateEmail = firstName =>
  `${firstName.toLowerCase()}@${mailers.options[getIndex("mail")]}.com`;

const encrypt = password => bcrypt.hashSync(password, 12);

//generate "n" users
//all pw's will be "pass1234" for ease, and encrypted for realistic back-end testing
const generateUsers = n => {
  let result = [];
  const password = "pass1234";

  for (let i = 0; i < n; i++) {
    let temp = {};
    temp.id = uuid();
    temp.first = names.first[getIndex("first")];
    temp.last = names.last[getIndex("last")];
    temp.email = generateEmail(temp.first);
    temp.password = encrypt(password);

    result.push(temp);
  }
  return result;
};

const users = JSON.stringify({
  data: generateUsers(20)
});

fs.writeFileSync(`${__dirname}/users.json`, users);
