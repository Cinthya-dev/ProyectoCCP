

$(document).ready(function() {
    console.clear();

let width = window.innerWidth;
let height = window.innerHeight;
const body = document.body;

const elButton = document.querySelector(".treat-button");
const elWrapper = document.querySelector(".treat-wrapper");

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const treatmojis = ["🍬", "🍫", "🍭", "🍡", "🍩", "🍪", "🍒"];
const treats = [];
const radius = 15;

const Cd = 0.47; // Dimensionless
const rho = 1.22; // kg / m^3
const A = Math.PI * radius * radius / 10000; // m^2
const ag = 9.81; // m / s^2
const frameRate = 1 / 60;

function createTreat() /* create a treat */ {
  const vx = getRandomArbitrary(-10, 10); // x velocity
  const vy = getRandomArbitrary(-10, 1);  // y velocity
  
  const el = document.createElement("div");
  el.className = "treat";

  const inner = document.createElement("span");
  inner.className = "inner";
  inner.innerText = treatmojis[getRandomInt(0, treatmojis.length - 1)];
  el.appendChild(inner);
  
  elWrapper.appendChild(el);

  const rect = el.getBoundingClientRect();

  const lifetime = getRandomArbitrary(2000, 3000);

  el.style.setProperty("--lifetime", lifetime);

  const treat = {
    el,
    absolutePosition: { x: rect.left, y: rect.top },
    position: { x: rect.left, y: rect.top },
    velocity: { x: vx, y: vy },
    mass: 0.1, //kg
    radius: el.offsetWidth, // 1px = 1cm
    restitution: -.7,
    
    lifetime,
    direction: vx > 0 ? 1 : -1,

    animating: true,

    remove() {
      this.animating = false;
      this.el.parentNode.removeChild(this.el);
    },

    animate() {
      const treat = this;
      let Fx =
        -0.5 *
        Cd *
        A *
        rho *
        treat.velocity.x *
        treat.velocity.x *
        treat.velocity.x /
        Math.abs(treat.velocity.x);
      let Fy =
        -0.5 *
        Cd *
        A *
        rho *
        treat.velocity.y *
        treat.velocity.y *
        treat.velocity.y /
        Math.abs(treat.velocity.y);

      Fx = isNaN(Fx) ? 0 : Fx;
      Fy = isNaN(Fy) ? 0 : Fy;

      // Calculate acceleration ( F = ma )
      var ax = Fx / treat.mass;
      var ay = ag + Fy / treat.mass;
      // Integrate to get velocity
      treat.velocity.x += ax * frameRate;
      treat.velocity.y += ay * frameRate;

      // Integrate to get position
      treat.position.x += treat.velocity.x * frameRate * 100;
      treat.position.y += treat.velocity.y * frameRate * 100;
      
      treat.checkBounds();
      treat.update();
    },
    
    checkBounds() {

      if (treat.position.y > height - treat.radius) {
        treat.velocity.y *= treat.restitution;
        treat.position.y = height - treat.radius;
      }
      if (treat.position.x > width - treat.radius) {
        treat.velocity.x *= treat.restitution;
        treat.position.x = width - treat.radius;
        treat.direction = -1;
      }
      if (treat.position.x < treat.radius) {
        treat.velocity.x *= treat.restitution;
        treat.position.x = treat.radius;
        treat.direction = 1;
      }

    },

    update() {
      const relX = this.position.x - this.absolutePosition.x;
      const relY = this.position.y - this.absolutePosition.y;

      this.el.style.setProperty("--x", relX);
      this.el.style.setProperty("--y", relY);
      this.el.style.setProperty("--direction", this.direction);
    }
  };

  setTimeout(() => {
    treat.remove();
  }, lifetime);

  return treat;
}


function animationLoop() {
  var i = treats.length;
  while (i--) {
    treats[i].animate();

    if (!treats[i].animating) {
      treats.splice(i, 1);
    }
  }

  requestAnimationFrame(animationLoop);
}

animationLoop();

function addTreats() {
  //cancelAnimationFrame(frame);
  if (treats.length > 40) {
    return;
  }
  for (let i = 0; i < 10; i++) {
    treats.push(createTreat());
  }
}

elButton.addEventListener("click", addTreats);
elButton.click();

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
});

const flowerButton = document.querySelector(".flower-button");
const flowerWrapper = document.querySelector(".flower-wrapper");


const flowerMojis = ["💐","🌷", "🌹", "🌺", "🌸", "🌼", "🌻"];
const flowers = [];

function createFlowers() /* create a treat */ {
  const vx = getRandomArbitrary(-10, 10); // x velocity
  const vy = getRandomArbitrary(-10, 1);  // y velocity
  
  const fl = document.createElement("div");
  fl.className = "flower";

  const inner = document.createElement("span");
  inner.className = "inner";
  inner.innerText = flowerMojis[getRandomInt(0, flowerMojis.length - 1)];
  fl.appendChild(inner);
  
  flowerWrapper.appendChild(fl);

  const rect = fl.getBoundingClientRect();

  const lifetime = getRandomArbitrary(2000, 3000);

  fl.style.setProperty("--lifetime", lifetime);

  const flower = {
    fl,
    absolutePosition: { x: rect.left, y: rect.top },
    position: { x: rect.left, y: rect.top },
    velocity: { x: vx, y: vy },
    mass: 0.1, //kg
    radius: fl.offsetWidth, // 1px = 1cm
    restitution: -.7,
    
    lifetime,
    direction: vx > 0 ? 1 : -1,

    animating: true,

    remove() {
      this.animating = false;
      this.fl.parentNode.removeChild(this.fl);
    },

    animate() {
      const flower = this;
      let Fx =
        -0.5 *
        Cd *
        A *
        rho *
        flower.velocity.x *
        flower.velocity.x *
        flower.velocity.x /
        Math.abs(flower.velocity.x);
      let Fy =
        -0.5 *
        Cd *
        A *
        rho *
        flower.velocity.y *
        flower.velocity.y *
        flower.velocity.y /
        Math.abs(flower.velocity.y);

      Fx = isNaN(Fx) ? 0 : Fx;
      Fy = isNaN(Fy) ? 0 : Fy;

      // Calculate acceleration ( F = ma )
      var ax = Fx / flower.mass;
      var ay = ag + Fy / flower.mass;
      // Integrate to get velocity
      flower.velocity.x += ax * frameRate;
      flower.velocity.y += ay * frameRate;

      // Integrate to get position
      flower.position.x += flower.velocity.x * frameRate * 100;
      flower.position.y += flower.velocity.y * frameRate * 100;
      
      flower.checkBounds();
      flower.update();
    },
    
    checkBounds() {

      if (flower.position.y > height - flower.radius) {
        flower.velocity.y *= flower.restitution;
        flower.position.y = height - flower.radius;
      }
      if (flower.position.x > width - flower.radius) {
        flower.velocity.x *= flower.restitution;
        flower.position.x = width - flower.radius;
        flower.direction = -1;
      }
      if (flower.position.x < flower.radius) {
        flower.velocity.x *= flower.restitution;
        flower.position.x = flower.radius;
        flower.direction = 1;
      }

    },

    update() {
      const relX = this.position.x - this.absolutePosition.x;
      const relY = this.position.y - this.absolutePosition.y;

      this.fl.style.setProperty("--x", relX);
      this.fl.style.setProperty("--y", relY);
      this.fl.style.setProperty("--direction", this.direction);
    }
  };

  setTimeout(() => {
    flower.remove();
  }, lifetime);

  return flower;
}


function animationFlowerLoop() {
  var i = flowers.length;
  while (i--) {
    flowers[i].animate();

    if (!flowers[i].animating) {
      flowers.splice(i, 1);
    }
  }

  requestAnimationFrame(animationFlowerLoop);
}

animationFlowerLoop();

function addFlowers() {
  //cancelAnimationFrame(frame);
  if (flowers.length > 40) {
    return;
  }
  for (let i = 0; i < 10; i++) {
    flowers.push(createFlowers());
  }
}

function addEmoji() {
  //cancelAnimationFrame(frame);
  if (flowers.length > 40) {
    return;
  }
  for (let i = 0; i < 10; i++) {
    flowers.push(createFlowers());
  }
}

flowerButton.addEventListener("click", addFlowers);
flowerButton.click();

});
