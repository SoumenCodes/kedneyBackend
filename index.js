const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const users = [
  {
    name: "Person",
    age: 69,
    kedney: [
      {
        ishealthly: false,
      },
    ],
  },
];

app.get("/", (req, res) => {
  const numberOFKedney = users[0].kedney.length;

  let numberOFHKedney = 0;

  for (let i = 0; i < numberOFKedney; i++) {
    if (users[0].kedney[i].ishealthly) {
      numberOFHKedney = numberOFHKedney + 1;
    }
  }

  const numberOFUKedney = numberOFKedney - numberOFHKedney;

  return res.json({
    msg: "hello",
    numberOFKedney,
    numberOFHKedney,
    numberOFUKedney,
  });
});

app.post("/", (req, res) => {
  const ishealthlyK = req.body.ishealthly;
  console.log(ishealthlyK, "ishealthlyK");
  users[0].kedney.push({
    ishealthly: ishealthlyK,
  });
  return res.json({
    msg: "Done",
  });
});

app.put("/", (req, res) => {
  for (let i = 0; i < users[0].kedney.length; i++) {
    users[0].kedney[i].ishealthly = true;
  }
  res.json({
    all: users[0].kedney,
  });
});

function atlestOneHealthyKedny() {
  let isatlestOneHealthyKedny = false;
  for (let i = 0; i < users[0].kedney.length; i++) {
    if (!users[0].kedney[i].hkedney) {
      isatlestOneHealthyKedny = true;
    }
  }

  return isatlestOneHealthyKedny;
}
app.delete("/", (req, res) => {
  let hkedney = [];
  if (atlestOneHealthyKedny()) {
    for (let i = 0; i < users[0].kedney.length; i++) {
      if (users[0].kedney[i].ishealthly) {
        hkedney.push({
          ishealthly: true,
        });
      }
    }
    users[0].kedney = hkedney;
  } else {
    res.json({ msg: "No U kidney" });
  }
  res.json({ msg: "Done" });
});
app.listen("4000");
