const form = document.querySelector("#loginForm");

form.addEventListener("submit", (e) => {
  const inPutId = document.getElementById("id");
  const inPutPass = document.getElementById("pass");

  const idValue = inPutId.value.trim();
  const passValue = inPutPass.value.trim();

  if (idValue === "" && passValue === "") {
    e.preventDefault();
    alert("아이디와 비밀번호를 입력해주세요");
    inPutId.focus();
  } else if (idValue === "") {
    e.preventDefault();
    alert("아이디를 입력해주세요");
    inPutId.focus();
  } else if (passValue === "") {
    e.preventDefault();
    alert("비밀번호를 입력해주세요");
    inPutPass.focus();
  } else if (passValue.length < 6) {
    e.preventDeault;
    alert("비밀번호를 6자 이상 입력해주세요");
    inPutPass.focus();
  }
});
