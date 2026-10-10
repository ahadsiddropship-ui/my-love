/* ====== EDIT ME: make it yours ====== */
var CONFIG = {
  name: "Juvii",              // her name or nickname
  from: "Chidhkhaoo",                          // sign off, e.g. your name
  sub: "I made this for no reason, except you.",
  loves: [
    "The way you fix my mood without even trying",
    "Your hair, even though you don't love it as much as I do",
    "The way you tell me all about your stuff",
    "How amazing you stay, even through headaches and fevers",
    "That you listen to my stuff, even when you have no idea what I'm talking about",
    "How you act annoyed, and still tolerate me and love me anyway"
  ],
  story: [
    { when: "The beginning", what: "The day we met on the 20th floor", note: "You came to meet your friend, who is my friend too. I didn't know it yet, but my life was about to get better." },
    { when: "20 November", what: "The night you said I love you too", note: "We were already in love before that. But hearing it from you that night made it feel even more real." },
    { when: "Eid", what: "Our first kiss, in the dark", note: "We were laughing so much, and then it happened, in complete darkness. I still smile thinking about it." },
    { when: "Now", what: "Right here, still choosing you", note: "Even though we go through hardships, I will still and forever choose you." }
  ],
  letter: [
    "Hey Juvii,",
    "I made this little corner of the internet because you deserve something made just for you. You fix my mood without even trying, and you stay amazing even on the days you feel your worst.",
    "From the 20th floor to that night in November, I've loved every part of us. Even when things get hard, I will still and forever choose you.",
  ],
  question: "Will you keep loving me?",
  nohints: ["Httt", "Nhi Hoga", "Soo Jao", "Pura din kr skte h", "Yes daba do na bacha"],
  winText: "I will always love you too, baby. You are the best!",
  /* answer: index of the right option, or "all" if every answer is right */
  quiz: [
    { q: "What's the best part of my day?", options: ["Sleeping in", "Food", "Talking to you", "Being on my phone"], answer: 2 },
    { q: "Where did we first meet?", options: ["At a coffee shop", "On the 20th floor of my building", "At a wedding", "In a library"], answer: 1 },
    { q: "What do I think of your smile?", options: ["It's okay", "It fixes my whole day", "No comment", "It's a secret"], answer: "all" },
    { q: "How much do I love you?", options: ["A lot", "So much", "More than pizza", "All of these"], answer: 3 },
    { q: "When do you think you made me the happiest?", options: ["On 20 November", "Our first kiss", "When you hugged me tight", "From the first day till now"], answer: 3 }
  ],
  secret: [
    "Shh... look here, my Juvii, my love.",
    "I want you to know you mean so, so much to me. You are my first and last thought of every day.",
    "I still can't believe it's going to be 2.5+ years since we fell for each other. Thank you for loving this idiot. Thank you so much. I appreciate you so much."
  ],
  quizRight: "You are a genius, darling!",
  quizWrong: "You can't be wrong. Maybe the quiz is broken!",
  quizPerfect: "Perfect score. Obviously.",
  quizOther: "Close enough, I'll give you a kiss anyway.",
  matchWin: "You matched them all! Prize: I'll be more patient and calm, along with lots and lots of kisses.",
  icons: ["\uD83C\uDF53","\uD83C\uDF38","\uD83D\uDC3B","\u2B50","\uD83C\uDFA7","\uD83C\uDF66"],
  footer: "First the words... now even code falls short of expressing how much I love you."
};
/* ==================================== */

(function(){
  var $ = function(id){return document.getElementById(id)};
  var t = $("title");
  ("Hi, " + CONFIG.name).split("").forEach(function(c, n){
    var s = document.createElement("span"); s.textContent = c === " " ? "\u00a0" : c; s.style.animationDelay = (n * 0.06) + "s"; t.appendChild(s);
  });
  $("sub").textContent = CONFIG.sub;
  CONFIG.loves.forEach(function(x){var d=document.createElement("div");d.className="sticker";d.textContent=x;$("loves").appendChild(d)});
  CONFIG.story.forEach(function(m){
    var d=document.createElement("div");d.className="moment";
    var b=document.createElement("b");b.textContent=m.what;
    var s=document.createElement("small");s.textContent=m.when;
    var p=document.createElement("div");p.textContent=m.note;
    d.appendChild(b);d.appendChild(s);d.appendChild(p);$("story").appendChild(d);
  });
  CONFIG.letter.forEach(function(x){var p=document.createElement("p");p.textContent=x;$("letter").appendChild(p)});
  var sg=document.createElement("p");sg.textContent="Love, "+CONFIG.from;$("letter").appendChild(sg);
  $("q").textContent = CONFIG.question;
  $("foot").textContent = CONFIG.footer;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var EMO = ["\u2764\ufe0f","\ud83d\udc96","\ud83c\udf53","\u2728","\ud83c\udf38","\ud83d\udc95"];
  function burst(x, y, n){
    if (reduce) return;
    for (var i=0;i<n;i++){
      var e=document.createElement("div");e.className="fly";
      e.textContent=EMO[Math.floor(Math.random()*EMO.length)];
      e.style.left=(x-14)+"px";e.style.top=(y-14)+"px";
      e.style.setProperty("--dx",(Math.random()*240-120)+"px");
      e.style.setProperty("--r",(Math.random()*120-60)+"deg");
      document.body.appendChild(e);
      setTimeout(function(el){el.remove()},1900,e);
    }
  }
  $("bigheart").addEventListener("click",function(ev){
    var r=this.getBoundingClientRect();
    burst(r.left+r.width/2, r.top+r.height/2, 10);
  });

  /* secret page + magnifying glass */
  var desk = $("desk"), paper = $("paper"), glass = $("glass"), lens = $("lens");
  function fillSecret(el){ CONFIG.secret.forEach(function(t){ var p = document.createElement("p"); p.textContent = t; el.appendChild(p); }); }
  var base = document.createElement("div"); base.className = "txt"; fillSecret(base); paper.appendChild(base);
  var pc = document.createElement("div"); pc.className = "pcopy"; pc.setAttribute("aria-hidden", "true"); fillSecret(pc); lens.appendChild(pc);
  var gx = 0, gy = 0, moved = false, S = 1.6, drag = false, ox = 0, oy = 0;
  function drawLens(){
    var r = lens.clientWidth / 2;
    var x = gx - (paper.offsetLeft + paper.clientLeft), y = gy - (paper.offsetTop + paper.clientTop);
    pc.style.transform = "translate(" + (r - x * S) + "px," + (r - y * S) + "px) scale(" + S + ")";
  }
  function place(x, y){
    gx = Math.max(0, Math.min(desk.clientWidth, x)); gy = Math.max(0, Math.min(desk.clientHeight, y));
    glass.style.left = gx + "px"; glass.style.top = gy + "px"; drawLens();
  }
  function layoutSecret(){
    pc.style.width = paper.clientWidth + "px"; pc.style.height = paper.clientHeight + "px";
    desk.style.height = (paper.offsetTop + paper.offsetHeight + 160) + "px";
    if (moved) place(gx, gy); else place(desk.clientWidth - 90, paper.offsetTop + paper.offsetHeight + 85);
  }
  glass.addEventListener("pointerdown", function(e){
    drag = true; var r = desk.getBoundingClientRect();
    ox = e.clientX - r.left - gx; oy = e.clientY - r.top - gy;
    glass.setPointerCapture(e.pointerId); glass.classList.add("held"); e.preventDefault();
  });
  glass.addEventListener("pointermove", function(e){
    if (!drag) return;
    var r = desk.getBoundingClientRect(); moved = true;
    place(e.clientX - r.left - ox, e.clientY - r.top - oy);
    $("shint").textContent = "Look closely...";
  });
  function drop(){ drag = false; glass.classList.remove("held"); }
  glass.addEventListener("pointerup", drop);
  glass.addEventListener("pointercancel", drop);
  glass.addEventListener("keydown", function(e){
    var d = {ArrowLeft:[-24,0],ArrowRight:[24,0],ArrowUp:[0,-24],ArrowDown:[0,24]}[e.key];
    if (!d) return; e.preventDefault(); moved = true; place(gx + d[0], gy + d[1]);
  });
  window.addEventListener("resize", layoutSecret);
  layoutSecret();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutSecret);

  /* pop cards in as she scrolls */
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    var cards = document.querySelectorAll(".sticker,.moment,.letter,.panel");
    var io = new IntersectionObserver(function(es){
      var n = 0;
      es.forEach(function(e){
        if (!e.isIntersecting) return;
        var el = e.target; io.unobserve(el);
        el.style.transitionDelay = (n++ * 90) + "ms";
        el.classList.add("in"); el.classList.remove("pre");
        setTimeout(function(){ el.classList.remove("in"); el.style.transitionDelay = ""; }, 1100);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    cards.forEach(function(c){ c.classList.add("pre"); io.observe(c); });
  }

  /* drifting background hearts */
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    var bgEmo = ["\u2764\ufe0f","\uD83D\uDC96","\uD83C\uDF38","\u2728","\uD83C\uDF53"];
    for (var k = 0; k < 14; k++){
      var h = document.createElement("i");
      h.textContent = bgEmo[k % bgEmo.length];
      h.style.left = (Math.random() * 96) + "%";
      h.style.fontSize = (16 + Math.random() * 22) + "px";
      h.style.animationDuration = (14 + Math.random() * 12) + "s";
      h.style.animationDelay = (-Math.random() * 20) + "s";
      h.style.setProperty("--sx", (Math.random() * 120 - 60) + "px");
      h.style.setProperty("--sr", (Math.random() * 120 - 60) + "deg");
      $("bg").appendChild(h);
    }
  }

  /* quiz */
  var Q = CONFIG.quiz, qi = 0, score = 0;
  function renderQuiz(){
    var box = $("quiz"); box.textContent = "";
    if (qi >= Q.length){
      var h = document.createElement("p"); h.className = "hand"; h.style.fontSize = "1.9rem"; h.style.margin = "0";
      h.textContent = "You got " + score + " of " + Q.length + ". " + (score === Q.length ? CONFIG.quizPerfect : CONFIG.quizOther);
      var again = document.createElement("button"); again.className = "btn small"; again.textContent = "Play again";
      again.onclick = function(){ qi = 0; score = 0; renderQuiz(); };
      box.appendChild(h); box.appendChild(again);
      if (score === Q.length) burst(innerWidth / 2, innerHeight / 2, 14);
      return;
    }
    var q = Q[qi], answered = false;
    var t = document.createElement("b"); t.textContent = (qi + 1) + "/" + Q.length + "  " + q.q; box.appendChild(t);
    var fb = document.createElement("p"); fb.className = "fb hand";
    q.options.forEach(function(o, i){
      var b = document.createElement("button"); b.className = "opt"; b.textContent = o;
      b.onclick = function(){
        if (answered) return; answered = true;
        var ok = q.answer === "all" || q.answer === i;
        b.className = "opt " + (ok ? "good" : "bad");
        if (ok){ score++; var r = b.getBoundingClientRect(); burst(r.left + r.width / 2, r.top, 6); }
        fb.textContent = ok ? CONFIG.quizRight : CONFIG.quizWrong;
        var nx = document.createElement("button"); nx.className = "btn small";
        nx.textContent = qi === Q.length - 1 ? "See my score" : "Next question";
        nx.onclick = function(){ qi++; renderQuiz(); };
        box.appendChild(nx);
      };
      box.appendChild(b);
    });
    box.appendChild(fb);
  }
  renderQuiz();

  /* memory match */
  var first = null, lock = false, found = 0, moves = 0;
  function setupMatch(){
    var deck = CONFIG.icons.concat(CONFIG.icons);
    for (var i = deck.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)); var tmp = deck[i]; deck[i] = deck[j]; deck[j] = tmp; }
    first = null; lock = false; found = 0; moves = 0;
    $("mstat").textContent = "Flip two cards to find a pair.";
    var board = $("board"); board.textContent = "";
    deck.forEach(function(ic){
      var c = document.createElement("button"); c.className = "card"; c.textContent = "?"; c.setAttribute("aria-label", "Hidden card");
      c.onclick = function(){
        if (lock || c.classList.contains("up") || c.classList.contains("done")) return;
        c.classList.add("up"); c.textContent = ic;
        if (!first){ first = { el: c, ic: ic }; return; }
        moves++;
        if (first.ic === ic){
          first.el.className = "card done"; c.className = "card done"; first = null; found++;
          if (found === CONFIG.icons.length){ $("mstat").textContent = CONFIG.matchWin + " (" + moves + " tries)"; burst(innerWidth / 2, innerHeight / 2, 14); }
          else $("mstat").textContent = "Pair found! " + moves + " tries so far.";
        } else {
          lock = true; var a = first.el; first = null;
          setTimeout(function(){ a.className = "card"; a.textContent = "?"; c.className = "card"; c.textContent = "?"; lock = false; }, 800);
        }
      };
      board.appendChild(c);
    });
  }
  $("mreset").onclick = setupMatch;
  setupMatch();

  /* the shy "No" button */
  var no=$("no"), arena=$("arena"), hi=0;
  function dodge(ev){
    if (ev && ev.preventDefault) ev.preventDefault();
    var w=arena.clientWidth-100, h=arena.clientHeight-50;
    no.style.left=Math.max(0,Math.random()*w)+"px";
    no.style.top=Math.max(0,Math.random()*h)+"px";
    $("hint").textContent=CONFIG.nohints[hi++%CONFIG.nohints.length];
  }
  no.addEventListener("mouseenter",dodge);
  no.addEventListener("touchstart",dodge,{passive:false});
  no.addEventListener("click",dodge);

  $("yes").addEventListener("click",function(){
    arena.style.display="none";$("hint").style.display="none";
    var w=$("win");w.textContent=CONFIG.winText;w.style.display="block";
    for (var i=0;i<6;i++) setTimeout(function(){burst(Math.random()*innerWidth, innerHeight*0.8, 8)}, i*220);
  });
})();