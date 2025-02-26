// src/utils/fireworks.js
export function initFireworks() {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
  
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none"; // 클릭 막지 않음
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const particles = [];
  
    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.opacity = 1;
      }
  
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.02;
      }
  
      draw() {
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
  
    function createFirework(x, y) {
      const colors = ["red", "yellow", "blue", "green", "purple", "orange"];
      for (let i = 0; i < 30; i++) {
        particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
      }
    }
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].opacity <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
  
      requestAnimationFrame(animate);
    }
  
    document.addEventListener("click", (event) => {
      createFirework(event.clientX, event.clientY);
    });
  
    animate();
  }
  