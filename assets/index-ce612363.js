(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) s(e);
  new MutationObserver((e) => {
    for (const n of e)
      if (n.type === "childList")
        for (const o of n.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && s(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function l(e) {
    const n = {};
    return (
      e.integrity && (n.integrity = e.integrity),
      e.referrerpolicy && (n.referrerPolicy = e.referrerpolicy),
      e.crossorigin === "use-credentials"
        ? (n.credentials = "include")
        : e.crossorigin === "anonymous"
        ? (n.credentials = "omit")
        : (n.credentials = "same-origin"),
      n
    );
  }
  function s(e) {
    if (e.ep) return;
    e.ep = !0;
    const n = l(e);
    fetch(e.href, n);
  }
})();
class h {
  constructor(t) {
    (this.text = t), (this.isCompleted = !1);
  }
}
class p {
  constructor(t, l) {
    (this.text = t),
      (this.importance = l),
      this.alert(this.text, this.importance);
  }
  alert(t, l) {
    const s = document.createElement("div"),
      e = document.createElement("p");
    switch (
      ((e.className = "message"),
      (e.innerText = t),
      s.appendChild(e),
      (s.className = "alert"),
      l)
    ) {
      case "error":
        s.style.backgroundColor = "#e25858";
        break;
      case "sucsses":
        s.style.backgroundColor = "#228636";
        break;
    }
    document.body.appendChild(s),
      setTimeout(() => {
        s.classList.add("active");
      }),
      setTimeout(() => {
        s.classList.toggle("active");
      }, 3e3),
      setTimeout(() => {
        s.remove();
      }, 5e3);
  }
}
class u {
  constructor(t) {
    (this.todos = []),
      (this.completed = []),
      (this.selectedHtmlElement = t || document.querySelector("#app")),
      this.render(this.todos);
  }
  render(t) {
    (this.selectedHtmlElement.innerHTML = ""),
      this.layout(),
      this.addListWithToDo(t),
      this.getStatistics(t);
  }
  addToDoToList(t) {
    t == "" || t == null
      ? new p("The field cannot be empty", "error")
      : (this.todos.push(new h(t)), new p("Your adding new todo", "sucsses")),
      this.render(this.todos);
  }
  getStatistics(t) {
    this.completed = t.filter((a) => {
      if (a.isCompleted) return a;
    });
    const l = document.createElement("div");
    l.classList = "statistics_wrapper";
    const s = document.createElement("div");
    s.classList = "header_items";
    const e = document.createElement("p");
    e.classList = "header_text_todo";
    const n = document.createElement("span");
    (n.innerText = t.length),
      (e.innerText = "Created tasks"),
      s.appendChild(e),
      s.appendChild(n);
    const o = document.createElement("div");
    o.classList = "header_items";
    const c = document.createElement("p");
    c.classList = "header_text_completed";
    const i = document.createElement("span");
    (i.innerText = `${this.completed.length} to ${t.length}`),
      (c.innerText = "Completed"),
      o.appendChild(c),
      o.appendChild(i),
      l.appendChild(s),
      l.appendChild(o),
      this.selectedHtmlElement
        .querySelector(".main")
        .insertAdjacentElement("afterbegin", l);
  }
  addListWithToDo(t) {
    console.log("todoArray: ", t);
    const l = document.createElement("ul");
    (l.className = "todo_list"),
      t.forEach((s, e) => {
        console.log("todoIndex: ", e);
        const n = document.createElement("li"),
          o = document.createElement("input"),
          c = document.createElement("label"),
          i = document.createElement("span");
        (i.className = "check__box"),
          (o.type = "checkbox"),
          (o.className = "check__input"),
          (n.innerText = s.text),
          (o.checked = s.isCompleted),
          c.appendChild(o),
          c.appendChild(i),
          n.insertAdjacentElement("afterbegin", c),
          (n.className = "todo_item"),
          localStorage.setItem(`${s.text}`, "Uncompleted"),
          s.isCompleted &&
            (n.classList.add("completed"),
            localStorage.setItem(`${s.text}`, "Completed"));
        const a = document.createElement("div");
        (a.classList = "trash"),
          a.addEventListener("click", () => {
            l.removeChild(n),
              (this.todos = this.todos
                .slice(0, e)
                .concat(this.todos.slice(e + 1, this.todos.length))),
              this.render(this.todos);
          }); //! Error
        const m = (d) => {
          s.isCompleted
            ? ((s.isCompleted = !1),
              d.target.classList.remove("completed"),
              (o.checked = !1))
            : (d.target.classList.add("completed"),
              (s.isCompleted = !0),
              (o.checked = !0));
        };
        n.addEventListener("click", (d) => m(d)),
          i.addEventListener("click", (d) => m(d)),
          n.appendChild(a),
          l.appendChild(n);
      }),
      this.selectedHtmlElement.querySelector(".main").appendChild(l);
  }
  layout() {
    const t = document.createElement("header");
    t.className = "header";
    const l = document.createElement("img");
    (l.src = "../img/logo.svg"), (l.alt = "logo"), t.appendChild(l);
    const s = document.createElement("div");
    (s.className = "input_wrapper"), t.appendChild(s);
    const e = document.createElement("input");
    (e.className = "input"),
      (e.type = "text"),
      (e.placeholder = "Add a new task");
    const n = document.createElement("button");
    (n.className = "button"), (n.innerText = "Create");
    const o = document.createElement("img");
    (o.src = "../img/plus.svg"),
      (o.alt = "plus"),
      n.appendChild(o),
      s.appendChild(e),
      s.appendChild(n),
      n.addEventListener("click", () => {
        this.addToDoToList(e.value), (e.value = "");
      }),
      e.addEventListener("keypress", (i) => {
        i.key === "Enter" && (this.addToDoToList(e.value), (e.value = ""));
      });
    const c = document.createElement("main");
    (c.className = "main"),
      this.selectedHtmlElement.appendChild(t),
      this.selectedHtmlElement.appendChild(c);
  }
}
new u();
