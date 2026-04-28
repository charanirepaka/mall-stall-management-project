import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "mall-stall-management.firebaseapp.com",
  databaseURL: "https://mall-stall-management-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "mall-stall-management",
  storageBucket: "mall-stall-management.firebasestorage.app",
  messagingSenderId: "282719424547",
  appId: "1:282719424547:web:849149af07256ea94be196"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.addStall = function () {
  const name = document.getElementById("name").value;
  const owner = document.getElementById("owner").value;
  const message = document.getElementById("message");

  if (name === "" || owner === "") {
    message.style.color = "red";
    message.innerText = "Enter all fields!";
    return;
  }

  push(ref(db, "stalls"), { name, owner });

  message.style.color = "green";
  message.innerText = "✅ Data added successfully!";

  document.getElementById("name").value = "";
  document.getElementById("owner").value = "";
};

onValue(ref(db, "stalls"), (snapshot) => {
  const list = document.getElementById("list");
  list.innerHTML = "";

  snapshot.forEach((child) => {
    const data = child.val();

    const li = document.createElement("li");
    li.innerText = data.name + " - " + data.owner;

    list.appendChild(li);
  });
});
